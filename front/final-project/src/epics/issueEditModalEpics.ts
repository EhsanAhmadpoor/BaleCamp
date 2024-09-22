import { Epic, ofType } from "redux-observable"
import { catchError, from, map, of, switchMap } from "rxjs"
import { ajax } from "rxjs/ajax"
import { SingleIssueType } from "../pages/Issues/IssueInfoModal"
import { closeIssueEditModal, editIssueFailure, editIssueStart, editIssueSuccess, getIssueEditFiles, getIssueEditInfo, setIssueEditFiles, setIssueEditInfo } from "../redux/slices/IssueEditModalSlice"
import { fetchIssues } from "../redux/slices/issuesSlice"

export const getIssueEditInfoEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getIssueEditInfo.type),
    switchMap((action: any) => {
      const issueId = action.payload
      return from(
        ajax.getJSON(`/api/issues/${issueId}`)
      ).pipe(
        map((response: any) => {
          const issue: SingleIssueType = {
            id: response.id,
            title: response.title,
            description: response.description,
            userId: response.userId,
            status: response.status,
            date: response.date,
            type: response.type,
            labels: response.labels.map((label: { id: number }) => ({ id: label.id })),
            comments: response.comments,
            published: response.published,
            vote: response.vote,
            upVotes: response.upVotes,
            downVotes: response.downVotes,
            reviewed: response.reviewed,
            votesDiff: response.votesDiff,
            IssueComments: []
          }
          return setIssueEditInfo(issue)
        })
      )
    })
  )


export const getIssueEditFilesEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getIssueEditFiles.type),
    switchMap((action: any) => {
      const issueId = action.payload
      return from(
        ajax.getJSON(`/api/issues/${issueId}/files`)
      ).pipe(
        map((response: any) => {
          const files = response.map((file: any) => {
            const updatedUrl = file.path.replace('http://localhost:3000', '/api');
            return {
              id: file.id,
              name: file.name,
              url: updatedUrl,
            }
          });
          return setIssueEditFiles(files);
        })
      )
    }
    )
  )

export const editIssueEpic: Epic = (action$, state$: any) =>
  action$.pipe(
    ofType(editIssueStart.type),
    switchMap((action: any) => {
      const { title, description, category, status } = state$.value.issueEditModal;
      const { issueId, publish } = action.payload;

      const payload: any = {
        title: title,
        description: description,
        status: status,
        type: category,
        // labelIds,
        // fileIds,
      };

      if (publish) {
        payload.published = true;
      }

      return from(
        ajax.patch(`/api/issues/${issueId}`, payload, { 'Content-Type': 'application/json' })
      ).pipe(
        map(() => editIssueSuccess()),
        switchMap(() => [
          closeIssueEditModal(),
          fetchIssues({ status: "", searchQuery: "", sortBy: '', category: '', labelIds: [] }), // Fetch the list of issues
        ]),
        catchError((error) => {
          console.error('Error creating issue:', error);
          return of(editIssueFailure('Failed to create issue.'));
        })
      );
    })
  );
