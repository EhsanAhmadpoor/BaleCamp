import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { IRequest, Response } from "src/types";
import { getUserId } from "src/utils";
import { FilesService } from "./files.service";

@Controller("files")
export class FilesController {
  constructor(private filesService: FilesService) {}

  // TODO: parsing formdata - busboy
  @Post("upload")
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: IRequest) {
    return this.filesService.addFile(file, getUserId(req)!);
  }

  @Get("/:fileId")
  async getFile(@Param("fileId") fileId: string, @Res() res: Response) {
    if (fileId == null || Number.isNaN(Number(fileId)))
      throw new HttpException("Bad Id", HttpStatus.BAD_REQUEST);

    const file = await this.filesService.getFile(Number(fileId));
    if (!file) throw new HttpException("File not found!", HttpStatus.NOT_FOUND);

    const readStream = this.filesService.getFileStream(Number(fileId));
    res.setHeader("Content-Type", file.mimeType);
    res.setHeader("Content-Length", file.size);
    res.setHeader("Content-Disposition", `inline; filename="${file.name}"`);

    readStream.pipe(res);
    readStream.on("end", () => res.end());
    readStream.on("close", () => res.end());
    readStream.on("error", () => res.end());
  }
}
