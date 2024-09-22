Create Or Replace VIEW "IssueWithVotesCount" As
Select "Issue".id,
  count(
    case
      when "Vote".type = 'Up' then "Vote".id
    end
  ) as "upVoteCount",
  count(
    case
      when "Vote".type = 'Down' then "Vote".id
    end
  ) as "downVoteCount",
  array_remove(array_agg("Vote"."userId"), null) as "userIds"
  From "Issue"
  Left Join "Vote" On "Issue".id = "Vote"."issueId"
Group By "Issue".id;