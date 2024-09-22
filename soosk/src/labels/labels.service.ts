import { Injectable } from "@nestjs/common";
import { Label, PrismaClient, UserRole } from "@prisma/client";
import { UsersService } from "src/users/users.service";

@Injectable()
export class LabelsService {
  constructor(
    private prisma: PrismaClient,
    private users: UsersService,
  ) {}

  getLabels() {
    return this.prisma.label.findMany();
  }

  async addLabels(name: string, color: number) {
    const label = await this.prisma.label.findFirst({ where: { name } });

    if (label) throw new Error("Label is already defined");

    return this.prisma.label.create({ data: { name, color } });
  }

  async deleteLabel(id: number) {
    const label = await this.prisma.label.findUnique({ where: { id } });

    if (!label) throw new Error("Label not found.");

    return this.prisma.label.delete({ where: { id } });
  }

  async updateLabel(userId: number, labelId: number, label: Partial<Label>) {
    const user = await this.users.findUnique(userId);
    const allowedRoles: UserRole[] = [UserRole.Manager, UserRole.Admin];
    if (!user || !allowedRoles.includes(user.role)) {
      throw new Error("Not allowed");
    }
    return this.prisma.label.update({ where: { id: labelId }, data: label });
  }
}
