import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { Response } from "src/types";
import { omit } from "lodash";
import { AuthGuard } from "@nestjs/passport";
interface SignUpRequest {
  email: string;
  name: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

@Controller("auth")
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post("login")
  async login(@Body() reqBody: LoginRequest, @Res() response: Response) {
    const user = await this.authService.validateUser(
      reqBody.email,
      reqBody.password,
    );

    if (!user) {
      throw new HttpException(
        "Email or password is not correct!",
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { token, expireDate } = await this.authService.createJwt(user.id);

    response
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expireDate,
        path: "/",
      })
      .send(omit(user, ["password"]));
  }

  @Post("signup")
  async signUp(@Body() reqBody: SignUpRequest, @Res() response: Response) {
    const { email, name, password } = reqBody;

    try {
      const userId = await this.usersService.createUser(email, name, password);
      const { token, expireDate } = await this.authService.createJwt(userId);
      response
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expireDate,
          path: "/",
        })
        .send({ userId });
    } catch (error) {
      throw new HttpException((error as Error).message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("logout")
  @UseGuards(AuthGuard("jwt"))
  async logout(@Res() response: Response) {
    // TODO: valid tokens
    return response
      .cookie("access_token", "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/",
      })
      .send();
  }
}
