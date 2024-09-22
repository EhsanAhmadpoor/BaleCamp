import {
  Get,
  Req,
  Controller,
  Param,
  HttpException,
  HttpStatus,
  Patch,
  UseGuards,
  Body,
  Delete,
  Query,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "./users.service";
import { getUserId, stringParamToNumberArray } from "src/utils";
import { IRequest } from "src/types";
import { hmac } from "src/utils/crypto";
import { User, UserRole } from "@prisma/client";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(
    @Query("ids") ids: string,
    @Req() req: IRequest,
  ): Promise<
    Array<{
      id: string;
      name: string;
      avatarId?: string;
      role?: UserRole;
      email?: string;
    }>
  > {
    const _ids = stringParamToNumberArray(ids);
    const currentId = getUserId(req);
    return this.usersService
      .getUsers(currentId, _ids)
      .then((users) =>
        users.map((user) => ({
          ...user,
          id: user.id.toString(),
          avatarId: user.avatar?.fileId.toString(),
        })),
      )
      .catch((error: Error) => {
        if (error.message === "NotFound") {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      });
  }

  @Patch("/:userId")
  @UseGuards(AuthGuard("jwt"))
  async updateUser(
    @Param("userId") userId: string,
    @Body()
    reqBody: Partial<{
      name: string;
      avatarId: string;
      password: string;
      role: UserRole;
    }>,
    @Req() req: IRequest,
  ): Promise<void> {
    const currentId = getUserId(req)!;

    let password: Buffer | undefined;
    if (reqBody.password) {
      password = await hmac(reqBody.password);
    }

    return this.usersService
      .updateUser(currentId, Number(userId), {
        ...reqBody,
        avatarId: reqBody.avatarId ? Number(reqBody.avatarId) : undefined,
        password,
      })
      .then(() => undefined)
      .catch((error: Error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      });
  }

  @Delete("/:userId")
  @UseGuards(AuthGuard("jwt"))
  deleteUser(@Param("userId") userId: string, @Req() req: IRequest) {
    const currentId = getUserId(req)!;

    return this.usersService.deleteUser(currentId, Number(userId));
  }
}
