/*
  Warnings:

  - You are about to drop the column `voteDiff` on the `Issue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "voteDiff",
ADD COLUMN     "downVotes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "upVotes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "votesDiff" INTEGER NOT NULL DEFAULT 0;
