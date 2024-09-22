import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, debounceTime, map, mergeMap, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { fetchTags, setTags, setIssues, fetchIssues, addNewLabel, closeAddLabel, deleteLabel, editLabel, castVote, setVoteSuccess, deleteVote, updateVote, fetchProfileFileId, setUserProfileId, uploadFileActionLoader, updateProfile, getIssueInfo, setIssueInfoModal, getIssueFiles, setIssueFiles, getComments, setComments, createComment, appendIssues, thereIsNoMore } from '../redux/slices/issuesSlice';
import { IssueType } from '../redux/slices/issuesSlice';
import { SingleIssueType } from '../pages/Issues/IssueInfoModal';

export const fetchUserProfileFileId: Epic = (action$) =>
  action$.pipe(
    ofType(fetchProfileFileId.type),
    switchMap((action: any) => {
      const userId = action.payload;
      const idsParam = JSON.stringify([userId]);
      const queryParams = `ids=${encodeURIComponent(idsParam)}`;
      return from(
        ajax.getJSON(`/api/users/?${queryParams}`)
      ).pipe(
        map((response: any) => {
          if (response[0].avatar) {
            return setUserProfileId(response[0].avatar.fileId)
          }
        })
      )
    }
    )
  )

export const fetchTagsEpic: Epic = (action$) =>
  action$.pipe(
    ofType(fetchTags.type),
    switchMap(() =>
      from(
        ajax.getJSON<string[]>('/api/labels')
      ).pipe(
        map((response) => setTags(response)),
        catchError((error) => {
          console.error('Error fetching tags:', error);
          return of(setTags([]));
        })
      )
    )
  );

export const fetchIssuesEpic: Epic = (action$) =>
  action$.pipe(
    ofType(fetchIssues.type),
    debounceTime(300),//change this ////////
    switchMap((action: any) => {
      const { status, searchQuery, sortBy, category, labelIds, offset, lastIssueRef, observer } = action.payload;
      const queryParams: Record<string, string> = {
        query: searchQuery,
        sortBy,
      };
      if (status) {
        queryParams.status = status;
      }
      if (labelIds && labelIds.length > 0) {
        queryParams.labelIds = JSON.stringify(labelIds);
      }
      if (category) {
        queryParams.type = category
      }
      if (offset) {
        queryParams.offset = offset
      }
      const queryString = new URLSearchParams(queryParams).toString();
      return from(
        ajax.getJSON<IssueType[]>(`/api/issues?${queryString}`)
      ).pipe(
        mergeMap(response => {
          const actions = [];

          if (offset !== undefined) {
            actions.push(appendIssues({ issues: response }));
          } else {
            actions.push(setIssues(response));
          }

          // Handle unobserving lastIssueRef if provided
          if (lastIssueRef && observer && lastIssueRef.current) {
            observer.unobserve(lastIssueRef.current);
          }

          if (response.length < 20) {
            actions.push(thereIsNoMore())
          }
          // Dispatch multiple actions
          return actions;
        }),
      )
    })
  )


export const postNewLabel: Epic = (action$) =>
  action$.pipe(
    ofType(addNewLabel.type),
    switchMap((action: any) => {
      const name = action.payload;
      return from(
        ajax.post<string>('/api/labels', {
          name: name,
          color: 0
        }, { 'Content-Type': 'application/json' })
      ).pipe(
        mergeMap(() => [
          closeAddLabel(),
          fetchTags()
        ]),
        catchError((error) => {
          console.error('Error posting new label:', error);
          return of(closeAddLabel());
        })
      )
    })
  );

export const deleteLabelEpic: Epic = (action$) =>
  action$.pipe(
    ofType(deleteLabel.type),
    mergeMap((action: any) =>
      ajax.delete(`/api/labels/${action.payload.labelId}`).pipe(
        map(() => fetchTags())
      )
    )
  )

export const editLabelEpic: Epic = (action$) =>
  action$.pipe(
    ofType(editLabel.type),
    switchMap((action: any) =>
      ajax.patch(`/api/labels/${action.payload.labelId}`, {
        name: action.payload.newLabelName,
        color: 0
      }, { 'Content-Type': 'application/json' }).pipe(
        map(() => fetchTags())
      )
    )
  )

const apiBaseUrl = '/api/issues';

export const castVoteEpic: Epic = (action$) =>
  action$.pipe(
    ofType(castVote.type),
    switchMap((action: any) => {
      const { issueId, voteType } = action.payload;
      return ajax.post(`${apiBaseUrl}/${issueId}/votes`, { type: voteType }, { 'Content-Type': 'application/json' }).pipe(
        mergeMap(() => [
          setVoteSuccess(),
          fetchIssues({ status: "", searchQuery: "", sortBy: 'Date', category: '', labelIds: [] }),
          getIssueInfo(issueId)
        ]),
      );
    })
  );

export const deleteVoteEpic: Epic = (action$) =>
  action$.pipe(
    ofType(deleteVote.type),
    switchMap((action: any) => {
      const { issueId } = action.payload;
      return ajax.delete(`${apiBaseUrl}/${issueId}/votes`).pipe(
        mergeMap(() => [
          setVoteSuccess(),
          fetchIssues({ status: "", searchQuery: "", sortBy: 'Date', category: '', labelIds: [] }),
          getIssueInfo(issueId)
        ]),
      );
    })
  );

export const updateVoteEpic: Epic = (action$) =>
  action$.pipe(
    ofType(updateVote.type),
    switchMap((action: any) => {
      const { issueId, voteType } = action.payload;
      return ajax.patch(`${apiBaseUrl}/${issueId}/votes`, { type: voteType }, { 'Content-Type': 'application/json' }).pipe(
        mergeMap(() => [
          setVoteSuccess(),
          fetchIssues({ status: "", searchQuery: "", sortBy: 'Date', category: '', labelIds: [] }),
          getIssueInfo(issueId)
        ]),
      );
    })
  );

export const uploadFileEpic: Epic = (action$) =>
  action$.pipe(
    ofType(uploadFileActionLoader.type),
    switchMap((action: any) => {
      const { file, userId, name, role, email } = action.payload
      const formData = new FormData();
      formData.append('file', file);

      return from(
        ajax.post(`/api/files/upload`, formData)
      ).pipe(
        map((response: any) => {
          return updateProfile({ avatarId: response.response.id, userId: userId, role: role, name: name, email: email })
        }),
        catchError(error => {
          console.error('File upload failed', error);
          return of(); // Dispatch some error handling action if needed
        })
      )
    })
  );
export const updateProfileEpic: Epic = (action$) =>
  action$.pipe(
    ofType(updateProfile.type),
    switchMap((action: any) => {
      const { userId, avatarId } = action.payload;
      return ajax.patch(`/api/users/${userId}`, {
        avatarId: avatarId,
      }, {
        'Content-Type': 'application/json'
      }).pipe(
        map((response: any) => {
          console.log(response)
          return fetchProfileFileId(userId)
        })
      )
      // ).pipe(
      //   map((response: any) => {
      //     return fetchProfileFileId(userId);
      //   }),
      //   catchError((error) => {
      //     console.error('Error updating profile:', error);
      //     return of();
      //   })
      // )
    })
  );

export const getIssueInfoEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getIssueInfo.type),
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
            labels: response.labels,
            comments: response.comments,
            published: response.published,
            vote: response.vote,
            upVotes: response.upVotes,
            downVotes: response.downVotes,
            reviewed: response.reviewed,
            votesDiff: response.votesDiff,
            IssueComments: []
          }
          return setIssueInfoModal(issue)
        })
      )
    })
  )

export const getIssueFilesEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getIssueFiles.type),
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
          return setIssueFiles(files);
        })
      )
    }
    )
  )

export const getCommentsEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getComments.type),
    switchMap((action: any) => {
      const issueId = action.payload
      return from(
        ajax.getJSON(`/api/issues/${issueId}/comments`)
      ).pipe(
        map((response: any) => {
          const comments = response.map((comment: any) => {
            return {
              id: comment.id,
              userId: comment.userId,
              text: comment.text,
              date: comment.date,
            }
          })
          return setComments(comments)
        })
      )
    })
  )

export const createCommentEpic: Epic = (action$) =>
  action$.pipe(
    ofType(createComment.type),
    switchMap((action: any) => {
      const { issueId, text } = action.payload
      const body = { text: text };
      return from(
        ajax.post(`/api/issues/${issueId}/comments`, body, {
          'Content-Type': 'application/json',
        })
      ).pipe(
        map((response: any) => {
          console.log(response)
          return getComments(issueId)
        })
      )
    })
  )
