import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaClient } from "@prisma/client";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_Secret,
      signOptions: { expiresIn: "180 days" },
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersService, PrismaClient],
  exports: [AuthService],
})
export class AuthModule {}
