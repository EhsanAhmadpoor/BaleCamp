import { Injectable } from "@nestjs/common";
import { PrismaClient, User, UserRole } from "@prisma/client";
import { has, omit } from "lodash";
import { AllowedRoles } from "src/utils/auth";
import { hmac } from "src/utils/crypto";
import { UserError } from "./error";
import { GeneralError } from "src/error";

export type UpdatableUserFields = Partial<
  Omit<User, "id"> & {
    avatarId: number;
  }
>;
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient) {}

  findUnique(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  findUser(user: Partial<User>) {
    return this.prisma.user.findFirst({ where: user });
  }

  async getUsers(currentId: number | undefined, userIds: number[]) {
    let current: User | null = null;
    if (currentId) {
      current = await this.findUnique(currentId);
    }

    const showDetails = current?.role && AllowedRoles.includes(current.role);
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: showDetails,
        role: showDetails,
        avatar: { select: { fileId: true } },
      },
      where: { id: { in: userIds } },
    });
  }

  private checkRole(current: User, user: User) {
    return !(
      current?.role === UserRole.Normal ||
      (current?.role === UserRole.Admin && user?.role !== UserRole.Normal) ||
      (current?.role === UserRole.Manager && user?.role === UserRole.Manager)
    );
  }

  public async isAdmin(userId: number) {
    const user = await this.findUnique(userId);
    return !user || AllowedRoles.includes(user.role);
  }

  async updateUser(
    currentId: number,
    userId: number,
    updateFields: UpdatableUserFields,
  ) {
    const current = await this.findUnique(currentId);
    let hasValidRole = false;
    if (currentId === userId) {
      if (
        current?.role === UserRole.Manager ||
        !hasOneOf(updateFields, ["email", "role", "verified"])
      ) {
        hasValidRole = true;
      }
    } else {
      const user = await this.findUnique(userId);

      if (current && user) {
        hasValidRole = this.checkRole(current, user);
      }
    }

    if (!hasValidRole) throw new GeneralError.NotAllowedError();

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...omit(updateFields, "avatarId"),
        avatar: updateFields.avatarId
          ? {
              connectOrCreate: {
                create: { fileId: updateFields.avatarId },
                where: { userId },
              },
            }
          : undefined,
      },
    });
  }

  public async createUser(email: string, name: string, password: string) {
    const user = await this.findUser({ email });

    if (user) {
      throw new UserError.UserExitsError();
    }

    const passwordHmac = await hmac(password);
    const newUser = await this.prisma.user.create({
      data: {
        email,
        name,
        verified: false,
        password: passwordHmac,
        role: UserRole.Normal,
      },
    });

    if (newUser.id === 1) {
      await this.prisma.user.update({
        where: { id: 1 },
        data: { role: UserRole.Manager },
      });
    }

    return newUser.id;
  }

  async deleteUser(currentId: number, userId: number) {
    const [current, user] = await Promise.all([
      this.findUnique(currentId),
      this.findUnique(userId),
    ]);

    if (!current || !user || !this.checkRole(current, user)) {
      throw new GeneralError.NotAllowedError();
    }

    this.prisma.user.delete({ where: { id: userId } });
  }
}

function hasOneOf<T>(object: T, props: Array<keyof T>) {
  return props.some((prop) => has(object, prop));
}
