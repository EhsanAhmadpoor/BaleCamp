import { Injectable } from "@nestjs/common";
import { Issue, Prisma, User, UserRole, Vote, VoteType } from "@prisma/client";
import { FilesService } from "src/files/files.service";
import { PrismaService } from "src/prisma/prisma.service";
import {
  FullIssueFindManyArgs,
  IssueStatus,
  IssueType,
  SortBy,
  SortType,
} from "./issues.types";
import { UsersService } from "src/users/users.service";
import { omit, pick } from "lodash";
import { AllowedRoles } from "src/utils/auth";

function convertSortType(sortType: SortType): Prisma.SortOrder {
  switch (sortType) {
    case SortType.ASC:
      return "asc";
    case SortType.DESC:
      return "desc";
  }
}

function getOrderBy(
  sortBy: SortBy,
  sortType: SortType,
): FullIssueFindManyArgs["orderBy"] {
  const sortTypeRaw = convertSortType(sortType);
  switch (sortBy) {
    case SortBy.Votes:
      return [{ votesDiff: sortTypeRaw }, { date: "desc" }];
    case SortBy.Comments:
      return [{ comments: { _count: sortTypeRaw } }, { date: "desc" }];
    case SortBy.Date:
    default:
      return { date: sortTypeRaw };
  }
}

export type UpdateIssueFields = Partial<
  Pick<
    Issue,
    "published" | "reviewed" | "status" | "title" | "type" | "description"
  >
>;

export type IssueWithVote = Issue & { vote: Vote | null };
const GetIssuesLimit = 20;
@Injectable()
export class IssuesService {
  constructor(
    private prisma: PrismaService,
    private filesService: FilesService,
    private users: UsersService,
  ) {}

  async addIssue(
    userId: number,
    title: string,
    description: string,
    type: IssueType,
    labelIds?: number[],
    fileIds?: number[],
  ) {
    if (labelIds) {
      const labels = await this.prisma.label.findMany({
        where: { OR: labelIds.map((id) => ({ id })) },
      });

      if (labelIds.length !== labels.length) {
        throw Error("Labels not found!");
      }
    }

    if (fileIds) {
      const files = await this.prisma.file.findMany({
        where: { OR: fileIds.map((id) => ({ id })) },
      });

      if (fileIds.length !== files.length) {
        throw Error("Files not found!");
      }
    }

    console.log("user id", userId);
    return this.prisma.issue.create({
      data: {
        title,
        description,
        type,
        published: false,
        reviewed: false,
        status: IssueStatus.Pending,
        labels: labelIds && { connect: labelIds.map((id) => ({ id })) },
        user: { connect: { id: userId } },
        date: new Date(),

        files: fileIds && {
          create: fileIds.map((fileId) => ({ fileId })),
        },
      },
    });
  }

  async getIssue(issueId: number, userId?: number) {
    const issue = await this.prisma.issue.findUnique({
      include: {
        labels: { select: { id: true } },
      },
      where: { id: issueId },
    });

    if (!issue) throw Error("NotFound");

    const voteTnx = this.prisma.vote.findFirst({
      where: { issueId, userId },
    });

    const commentsTnx = this.prisma.comment.count({ where: { issueId } });

    const [vote, comments] = await this.prisma.$transaction([
      voteTnx,
      commentsTnx,
    ]);

    return {
      ...issue,
      comments,
      vote,
    };
  }

  async vote(userId: number, issueId: number, type: VoteType) {
    const vote = await this.prisma.vote.findFirst({
      where: { issueId, userId },
    });

    if (vote) {
      if (vote.type == type) throw new Error("Already voted");
      else throw new Error("Can not create vote");
    } else {
      const issue = await this.getIssue(issueId);
      function updateDiff() {
        const votes = pickVotes(issue);
        if (type === VoteType.Up) {
          votes.upVotes += 1;
        } else {
          votes.downVotes -= 1;
        }
        votes.votesDiff = diffVote(votes);
        return votes;
      }

      const createVote = this.prisma.vote.create({
        data: {
          issue: {
            connect: {
              id: issueId,
            },
          },
          type,
          date: new Date(),
          user: { connect: { id: userId } },
        },
      });

      const updateIssue = this.prisma.issue.update({
        where: { id: issueId },
        data: { ...updateDiff() },
      });

      return this.prisma
        .$transaction([createVote, updateIssue])
        .then(([vote]) => vote);
    }
  }

  async updateVote(userId: number, issueId: number, type: VoteType) {
    const vote = await this.prisma.vote.findFirst({
      where: { issueId, userId },
    });

    if (vote) {
      if (vote.type == type) throw new Error("Already voted");
      else {
        function updateDiff() {
          const votes = pickVotes(issue);
          if (type === VoteType.Up) {
            votes.upVotes += 1;
            votes.downVotes -= 1;
          } else {
            votes.downVotes += 1;
            votes.upVotes -= 1;
          }
          votes.votesDiff = diffVote(votes);
          return votes;
        }
        const issue = await this.getIssue(issueId);
        return this.prisma.vote.update({
          where: { id: vote.id },
          data: {
            type,
            issue: { update: { ...updateDiff() } },
          },
        });
      }
    }

    throw new Error("Vote not found!");
  }

  async deleteVote(userId: number, issueId: number) {
    const vote = await this.prisma.vote.findFirst({
      where: { issueId, userId },
    });

    if (vote) {
      const type = vote.type;
      const issue = await this.getIssue(issueId);

      function updateDiff() {
        const votes = pickVotes(issue);
        if (type === VoteType.Up) {
          votes.upVotes -= 1;
        } else {
          votes.downVotes -= 1;
        }
        votes.votesDiff! = diffVote(votes as Issue);
        return votes;
      }
      const deleteVote = this.prisma.vote.delete({
        where: { id: vote.id },
      });
      const updateVoteDiff = this.prisma.issue.update({
        where: { id: issueId },
        data: { ...updateDiff() },
      });

      return this.prisma
        .$transaction([deleteVote, updateVoteDiff])
        .then(([vote]) => vote);
    }

    throw new Error("Vote not found!");
  }

  async getIssues(
    userId?: number,
    type?: IssueType,
    status?: IssueStatus,
    sortBy: SortBy = SortBy.Date,
    sortType: SortType = SortType.DESC,
    offset = 0,
    lableIds?: number[],
    query?: string,
  ) {
    let user: User | null = null;
    if (userId) {
      user = await this.users.findUnique(userId);
    }

    const whereIssue: Prisma.IssueWhereInput = {
      OR: query
        ? [{ title: { contains: query } }, { description: { contains: query } }]
        : [],
      type,
      status,
      labels:
        lableIds && lableIds.length > 0
          ? { some: { id: { in: lableIds } } }
          : undefined,
    };

    if (!user) {
      whereIssue.published = true;
    } else if (user.role === UserRole.Normal) {
      whereIssue.OR?.push({ userId: user.id }, { published: true });
    }

    if (whereIssue.OR?.length === 0) {
      whereIssue.OR = undefined;
    }
    console.log("where", whereIssue);

    return this.prisma.issue.findMany({
      where: whereIssue,
      select: {
        id: true,
        title: true,
        labels: { select: { id: true } },
        date: true,
        status: true,
        type: true,
        userId: true,
        description: true,
        upVotes: true,
        downVotes: true,
        published: true,
        // votesDiff: true,
        _count: {
          select: { comments: true },
        },
      },
      skip: offset,
      take: GetIssuesLimit,
      orderBy: getOrderBy(sortBy, sortType),
    });
  }

  getComments(issueId: number, offset = 0) {
    return this.prisma.comment.findMany({
      where: { issueId },
      skip: offset,
      take: GetIssuesLimit,
    });
  }

  addComment(userId: number, issueId: number, text: string) {
    return this.prisma.comment.create({
      data: {
        text,
        date: new Date(),
        issue: { connect: { id: issueId } },
        user: { connect: { id: userId } },
      },
    });
  }

  addLabels(userId: number, issueId: number, labelIds: number[]) {
    return this.prisma.issue.update({
      where: { id: issueId },
      data: { labels: { connect: labelIds.map((id) => ({ id })) } },
    });
  }

  async getVotes(issueIds: number[], userId: number) {
    const votesArray = await this.prisma.vote.findMany({
      where: { OR: issueIds.map((id) => ({ issueId: id })), userId },
    });
    const issuesVotesMap = new Map<number, Vote>();

    votesArray.forEach((vote) => {
      // const votes = issuesVotesMap.get(vote.issueId);

      issuesVotesMap.set(vote.issueId, vote);
    });
    return issuesVotesMap;
  }

  async updateIssue(
    id: number,
    partialIssue: UpdateIssueFields,
    currentId: number,
  ) {
    const current = await this.users.findUnique(currentId);

    const issue = await this.prisma.issue.findUnique({
      where: { id },
    });

    if (!issue) return;
    if (
      issue.userId !== currentId &&
      current &&
      !AllowedRoles.includes(current.role)
    ) {
      return;
    }

    return this.prisma.issue.update({ where: { id }, data: partialIssue });
  }

  async deleteIssue(issueId: number, userId: number) {
    // if(!issue) throw new
    const isAdmin = await this.users.isAdmin(userId);
    if (!isAdmin) return;

    // const issue = await this.prisma.issue.findUnique({
    //   where: { id: issueId },
    // });

    return this.prisma.issue.delete({ where: { id: issueId } });
  }
}

function diffVote(votes: Votes) {
  return votes.upVotes - votes.downVotes;
}

type Votes = Pick<Issue, "upVotes" | "downVotes" | "votesDiff">;
function pickVotes(issue: Issue): Votes {
  return pick(issue, ["upVotes", "downVotes", "voteDiff"]) as Votes;
}
