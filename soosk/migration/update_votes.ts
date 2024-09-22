import { PrismaClient, VoteType } from "@prisma/client";

async function run() {
  const client = new PrismaClient();
  await client.$connect();

  const issues = await client.issue.findMany({ include: { votes: true } });

  const updates = [];
  for (const issue of issues) {
    if (issue.votes.length === 0) continue;

    const upVotes = issue.votes.filter(
      (vote) => vote.type === VoteType.Up,
    ).length;
    const downVotes = issue.votes.filter(
      (vote) => vote.type === VoteType.Down,
    ).length;

    const tnx = client.issue.update({
      where: { id: issue.id },
      data: { upVotes, downVotes, votesDiff: upVotes - downVotes },
    });

    updates.push(tnx);
  }

  return client.$transaction(updates);
}

run()
  .then(() => console.log("migration success"))
  .catch((error) => console.log("migration failed", error));
