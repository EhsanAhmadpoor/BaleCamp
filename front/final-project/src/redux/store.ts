import { configureStore } from '@reduxjs/toolkit'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { loginEpic, signUpEpic } from '../epics/authEpics'
import authReducer from './slices/authSlice'
import issuesReducer from './slices/issuesSlice'
import { castVoteEpic, createCommentEpic, deleteLabelEpic, deleteVoteEpic, editLabelEpic, fetchIssuesEpic, fetchTagsEpic, fetchUserProfileFileId, getCommentsEpic, getIssueFilesEpic, getIssueInfoEpic, postNewLabel, updateProfileEpic, updateVoteEpic, uploadFileEpic, } from '../epics/issuesEpic'
import { fetchTagsInModalEpic } from '../epics/issueModalEpics'
import issueModalReducer from './slices/IssueModalSlice'
import { createIssueEpic } from '../epics/issueModalEpics'
import issueEditModalReducer from './slices/IssueEditModalSlice'
import { editIssueEpic, getIssueEditFilesEpic, getIssueEditInfoEpic } from '../epics/issueEditModalEpics'

const rootEpic = combineEpics(
  loginEpic,
  signUpEpic,
  fetchTagsEpic,
  fetchIssuesEpic,
  fetchTagsInModalEpic,
  createIssueEpic,
  postNewLabel,
  deleteLabelEpic,
  editLabelEpic,
  castVoteEpic,
  deleteVoteEpic,
  updateVoteEpic,
  fetchUserProfileFileId,
  uploadFileEpic,
  updateProfileEpic,
  getIssueInfoEpic,
  getIssueFilesEpic,
  getCommentsEpic,
  createCommentEpic,
  getIssueEditInfoEpic,
  getIssueEditFilesEpic,
  editIssueEpic
);
const epicMiddleware = createEpicMiddleware()

const store: any = configureStore({
  reducer: {
    auth: authReducer,
    issues: issuesReducer,
    issueModal: issueModalReducer,
    issueEditModal: issueEditModalReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware)
})

epicMiddleware.run(rootEpic)

export default store;