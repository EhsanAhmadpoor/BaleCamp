import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { createIssueFailure, createIssueStart, createIssueSuccess, fetchTags, setTags } from '../redux/slices/IssueModalSlice';
import { closeModal } from '../redux/slices/issuesSlice';
import { fetchIssues } from '../redux/slices/issuesSlice';

export const fetchTagsInModalEpic: Epic = (action$) =>
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

export const createIssueEpic: Epic = (action$, state$: any) =>
  action$.pipe(
    ofType(createIssueStart.type),
    switchMap(() => {
      const { title, description, labelIds, fileIds, category } = state$.value.issueModal;
      return from(
        ajax.post('/api/issues', {
          title,
          description,
          labelIds,
          fileIds,
          type: category,
        }, { 'Content-Type': 'application/json' })
      ).pipe(
        map(() => createIssueSuccess()),
        switchMap(() => [
          closeModal(),
          fetchIssues({ status: "", searchQuery: "", sortBy: '', category: '', labelIds: [] }), // Fetch the list of issues
        ]),
        catchError((error) => {
          console.error('Error creating issue:', error);
          return of(createIssueFailure('Failed to create issue.'));
        })
      );
    })
  );