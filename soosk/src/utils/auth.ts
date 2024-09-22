import { UserRole } from "@prisma/client";

export const AllowedRoles: UserRole[] = [UserRole.Manager, UserRole.Admin];
