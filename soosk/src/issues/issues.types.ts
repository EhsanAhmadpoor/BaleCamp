import { Prisma } from "@prisma/client";

export enum SortBy {
  Date = "Date",
  Votes = "Votes",
  Comments = "Comments",
}

export enum SortType {
  ASC = "ASC",
  DESC = "DESC",
}

export type FullIssueFindManyArgs = Prisma.IssueFindManyArgs;
export { IssueStatus, IssueType, VoteType } from "@prisma/client";
