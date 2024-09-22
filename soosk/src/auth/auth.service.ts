import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IRequest } from "src/types";
import { UsersService } from "src/users/users.service";
import { hmac } from "src/utils/crypto";
import { JWTPayload, extractFromCookie } from "./jwt.strategy";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUser({ email });
    const inputPasswordHmac = await hmac(password);
    if (user && user.password.compare(inputPasswordHmac) === 0) return user;
  }

  async createJwt(userId: number) {
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 180);
    const token = await this.jwtService.sign({
      sub: userId.toString(),
    });

    return { token, expireDate };
  }

  async verify(token: string): Promise<JWTPayload | undefined> {
    return this.jwtService.verifyAsync<JWTPayload>(token);
  }

  async getUserIdFromReq(req: IRequest) {
    const token = extractFromCookie(req);
    if (token) {
      return this.verify(token).then((payload) =>
        payload?.sub ? Number(payload.sub) : undefined,
      );
    }
  }
}
