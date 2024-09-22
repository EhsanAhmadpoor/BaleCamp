CREATE Or Replace VIEW "IssueWithCommentsCount" AS
Select "Issue".id,
  Count("Comment".id) As "commentsCount"
From "Issue"
  Left Join "Comment" On "Issue".id = "Comment"."issueId"
Group By "Issue".id;