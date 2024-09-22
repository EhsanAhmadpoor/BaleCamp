import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";
import { UsersService } from "./users/users.service";
import { IssuesService } from "./issues/issues.service";
import { IssuesController } from "./issues/issues.controller";
import { UsersController } from "./users/users.controller";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { PrismaClient } from "@prisma/client";
import { DBService } from "./db/db.service";
import { LabelsController } from "./labels/labels.controller";
import { LabelsService } from "./labels/labels.service";
import { FilesController } from "./files/files.controller";
import { FilesService } from "./files/files.service";

@Module({
  imports: [AuthModule],
  controllers: [
    AppController,
    IssuesController,
    UsersController,
    AuthController,
    LabelsController,
    FilesController,
  ],
  providers: [
    AppService,
    PrismaService,
    UsersService,
    IssuesService,
    PrismaClient,
    DBService,
    LabelsService,
    FilesService,
  ],
})
export class AppModule {}
