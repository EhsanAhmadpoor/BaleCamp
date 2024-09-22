#!/bin/sh
psql -h localhost -U postgres sooskdb -c "DROP VIEW IF EXISTS \"IssueWithVotesCount\" CASCADE;"
psql -h localhost -U postgres sooskdb -c "DROP VIEW IF EXISTS \"IssueWithCommentsAndVotesCount\" CASCADE;"
psql -h localhost -U postgres sooskdb < ./src/db/views/IssueWithVotesCount.sql
psql -h localhost -U postgres sooskdb < ./src/db/views/IssueWithCommentsCount.sql
psql -h localhost -U postgres sooskdb < ./src/db/views/IssueWithLabels.sql
psql -h localhost -U postgres sooskdb < ./src/db/views/IssueWithCommentsAndVotesCount.sql
