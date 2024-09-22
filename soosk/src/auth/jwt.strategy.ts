import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IRequest } from "src/types";

export interface JWTPayload {
  sub: string;
}

export function extractFromCookie(req: IRequest): string | null {
  if (!req || !req.cookies) return null;
  // console.log("token", req.cookies["access_token"]);
  return req.cookies["access_token"];
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: extractFromCookie,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_Secret,
      passReqToCallback: true,
    });
  }

  async validate(req: IRequest, payload: JWTPayload) {
    req.userId = payload.sub;
    return payload;
  }
}
