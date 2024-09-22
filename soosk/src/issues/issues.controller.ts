import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { IssuesService, UpdateIssueFields } from "./issues.service";
import {
  IssueStatus,
  IssueType,
  SortBy,
  SortType,
  VoteType,
} from "./issues.types";
import { IFile, IRequest } from "src/types";
import { getUserId, stringParamToNumberArray } from "src/utils";
import { FilesService } from "src/files/files.service";
import { File, Issue } from "@prisma/client";
import { omit } from "lodash";
import { AuthService } from "src/auth/auth.service";
import { JwtStrategy, extractFromCookie } from "src/auth/jwt.strategy";

type IssueIdParam = { issueId: string };
interface CreateIssueRequest {
  title: string;
  description: string;
  type: IssueType;
  labelIds?: string[];
  fileIds?: string[];
}

interface VoteIssueRequest {
  type: VoteType;
}

interface CreateCommentRequest {
  text: string;
}

type UpdateIssueRequest = UpdateIssueFields;

interface AddLabelsToIssue {
  labelIds: string[];
}

type FilesResponse = Omit<File, "issueId" | "userId">;

@Controller("issues")
export class IssuesController {
  constructor(
    private issuesService: IssuesService,
    private filesService: FilesService,
    private authService: AuthService,
  ) {}

  @Get()
  async getIssues(
    @Req() req: IRequest,
    @Query("type") type?: IssueType,
    @Query("status") status?: IssueStatus,
    @Query("sortBy") sortBy?: SortBy,
    @Query("sortType") sortType?: SortType,
    @Query("offset") offset?: number,
    @Query("labelIds") labelIds?: string,
    @Query("query") query?: string,
  ) {
    // const userId = getUserId(req);
    const userId = await this.authService.getUserIdFromReq(req);
    const issues = await this.issuesService.getIssues(
      userId,
      type,
      status,
      sortBy,
      sortType,
      Number(offset ?? 0),
      labelIds ? stringParamToNumberArray(labelIds) : undefined,
      query,
    );

    if (!userId) return issues;

    const votesMap = await this.issuesService.getVotes(
      issues.map((issue) => issue.id!),
      userId,
    );
    return issues.map((issue) => {
      return {
        ...omit(issue, "userIds", "_count"),
        commentsCount: issue._count.comments,
        vote: votesMap.get(issue.id!),
      };
    });
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  async createIssue(@Body() reqBody: CreateIssueRequest, @Req() req: IRequest) {
    const { title, description, type, labelIds, fileIds } = reqBody;
    const issue = await this.issuesService.addIssue(
      getUserId(req)!,
      title,
      description,
      type,
      labelIds?.map((id) => Number(id)),
      fileIds?.map((id) => Number(id)),
    );

    return {
      id: issue.id,
    };
  }

  @Delete(":issueId")
  @UseGuards(AuthGuard("jwt"))
  async deleteIssue(@Param("issueId") issueId: string, @Req() req: IRequest) {
    const userId = getUserId(req);
    return this.issuesService
      .deleteIssue(Number(issueId), userId!)
      .then(() => undefined);
  }

  @Get("/:issueId")
  async getIssue(@Param("issueId") issueId: string, @Req() req: IRequest) {
    const userId = await this.authService.getUserIdFromReq(req);
    return this.issuesService
      .getIssue(Number(issueId), userId)
      .catch((error: Error) => {
        if (error.message === "NotFound") {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      });
  }

  @Post(":issueId/votes")
  @UseGuards(AuthGuard("jwt"))
  vote(
    @Param("issueId") issueId: string,
    @Body() reqBody: VoteIssueRequest,
    @Req() req: IRequest,
  ) {
    return this.issuesService
      .vote(getUserId(req)!, Number(issueId), reqBody.type)
      .catch((error: Error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      });
  }

  @Patch(":issueId/votes")
  @UseGuards(AuthGuard("jwt"))
  updateVote(
    @Param("issueId") issueId: string,
    @Body() reqBody: VoteIssueRequest,
    @Req() req: IRequest,
  ) {
    return this.issuesService
      .updateVote(getUserId(req)!, Number(issueId), reqBody.type)
      .catch((error: Error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      });
  }

  @Delete(":issueId/votes")
  @UseGuards(AuthGuard("jwt"))
  deleteVote(@Param("issueId") issueId: string, @Req() req: IRequest) {
    return this.issuesService
      .deleteVote(getUserId(req)!, Number(issueId))
      .catch((error: Error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      });
  }

  @Get(":issueId/comments")
  getComments(
    @Param("issueId") issueId: string,
    @Query("offset") offset?: string,
  ) {
    return this.issuesService.getComments(Number(issueId), Number(offset ?? 0));
  }

  @Post(":issueId/comments")
  @UseGuards(AuthGuard("jwt"))
  createComment(
    @Param("issueId") issueId: string,
    @Body() reqBody: CreateCommentRequest,
    @Req() req: IRequest,
  ) {
    return this.issuesService
      .addComment(getUserId(req)!, Number(issueId), reqBody.text)
      .then((comment) => comment.id);
  }

  @Post(":issueId/labels")
  @UseGuards(AuthGuard("jwt"))
  addLabels(
    @Param("issueId") issueId: string,
    @Body() reqBody: AddLabelsToIssue,
    @Req() req: IRequest,
  ) {
    return this.issuesService
      .addLabels(
        getUserId(req)!,
        Number(issueId),
        reqBody.labelIds.map((l) => Number(l)),
      )
      .then();
  }

  @Get(":issueId/files")
  getFiles(@Param("issueId") issueId: string): Promise<FilesResponse[]> {
    return this.filesService.getFiles(Number(issueId)).then((files) =>
      files.map((file: IFile) => {
        return {
          ...omit(file, ["uploaderId"]),
          path: this.filesService.getPath(file.id),
        } as FilesResponse;
      }),
    );
  }

  @Patch(":issueId")
  @UseGuards(AuthGuard("jwt"))
  updateIssue(
    @Param("issueId") issueId: string,
    @Body() reqBody: UpdateIssueRequest,
    @Req() req: IRequest,
  ) {
    const userId = getUserId(req);
    return this.issuesService
      .updateIssue(Number(issueId), reqBody, userId!)
      .then(() => undefined);
  }
}
