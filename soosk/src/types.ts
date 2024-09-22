import { Prisma, File } from "@prisma/client";
import { Request as ERequest } from "express";

export { Response } from "express";

export type Id = string;
export type SortOrder = Prisma.SortOrder;
export type IRequest = ERequest & { userId?: string };
export type IFile = File;
