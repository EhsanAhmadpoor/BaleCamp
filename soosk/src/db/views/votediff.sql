Select *,
  ("upVotes" - "downVotes") as diff
from (
    Select "Issue".id as "issueId",
      count(
        case
          when "Vote".type = 'Up' then "Vote".id
        end
      ) as "upVotes",
      count(
        case
          when "Vote".type = 'Down' then "Vote".id
        end
      ) as "downVotes"
    From "Issue"
      Left Join "Vote" On "Issue".id = "Vote"."issueId"
    Group By "Issue".id
  ) as counts;