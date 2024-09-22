import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import * as path from "path";
import { createReadStream } from "fs";
import { IFile } from "src/types";

@Injectable()
export class FilesService {
  domain = "http://localhost:3000";
  filesDir = process.env.UploadsDir!;
  constructor(private prisma: PrismaClient) {}

  async addFile(file: Express.Multer.File, userId: number) {
    console.log("user", userId);
    const fileInfo = await this.prisma.file.create({
      data: {
        name: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: "",
        user: { connect: { id: userId } },
      },
    });

    try {
      await writeFile(
        path.resolve(this.filesDir, fileInfo.id.toString()),
        file.buffer,
      );
      return { id: fileInfo.id };
    } catch (error) {
      console.log("error", error);
      // Delete from database
    }
  }

  getFile(fileId: number) {
    return this.prisma.file.findFirst({ where: { id: fileId } });
  }

  getFiles(issueId: number): Promise<IFile[]> {
    return this.prisma.issueFile
      .findMany({
        where: { issueId },
        include: { file: true },
      })
      .then((result) => result.map((r) => r.file));
  }

  getPath(fileId: number) {
    return this.domain + "/files/" + fileId;
  }

  getFileStream(fileId: number) {
    const filePath = path.resolve(this.filesDir, fileId.toString());
    return createReadStream(filePath);
  }
}
