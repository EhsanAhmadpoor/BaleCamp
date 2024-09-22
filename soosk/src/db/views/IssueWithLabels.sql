Create Or Replace View "IssueWithLabels" As
SELECT "Issue".id,
  array_agg("B") as "labels"
FROM "Issue"
  Join "_IssueToLabel" On "Issue".id = "_IssueToLabel"."A"
Group By "Issue".id;