Create Or Replace VIEW "IssueWithCommentsAndVotesCount" As
Select "Issue".id,
  "Issue".title,
  "Issue".description,
  "Issue".status,
  "Issue".type,
  "Issue".date,
  "Issue".published,
  "Issue".reviewed,
  "Issue"."userId",
  "IssueWithCommentsCount"."commentsCount",
  "IssueWithVotesCount"."upVoteCount",
  "IssueWithVotesCount"."downVoteCount",
  "IssueWithVotesCount"."userIds",
  "IssueWithLabels".labels
From "Issue"
  Join "IssueWithCommentsCount" On "Issue".id = "IssueWithCommentsCount".id
  Join "IssueWithVotesCount" On "Issue".id = "IssueWithVotesCount".id
  Left Join "IssueWithLabels" On "Issue".id = "IssueWithLabels".id