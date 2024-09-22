import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SingleIssueType } from '../../pages/Issues/IssueInfoModal';

interface IssueEditModalState {
  isOpen: boolean,
  tags: string[],
  title: string,
  description: string,
  category: 'Bug' | 'Suggestion' | '',
  labelIds: { id: number; }[],
  fileIds: { id: string; name: string; url: string; }[],
  isLoading: boolean,
  error: string | null,
  status: 'Pending' | 'InProgress' | 'Done' | 'Closed' | '',
  published: boolean
}

const initialState: IssueEditModalState = {
  isOpen: false,
  tags: [],
  title: '',
  description: '',
  category: '',
  labelIds: [],
  fileIds: [],
  isLoading: false,
  error: null,
  status: '',
  published: false
}

const IssueEditModalSlice = createSlice({
  name: 'IssuesEditModal',
  initialState,
  reducers: {
    editIssueStart(state, action: PayloadAction<{ issueId: string | undefined, publish?: boolean }>) {
      state.isLoading = true;
      state.error = null;
      console.log(action)
    },
    editIssueSuccess(state) {
      state.isLoading = false;
    },
    editIssueFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload
    },
    setStatus(state, action: PayloadAction<'Pending' | 'InProgress' | 'Done' | 'Closed'>) {
      state.status = action.payload
    },
    setLabelIdsForModal(state, action: PayloadAction<{ id: number }[]>) {
      state.labelIds = action.payload
    },
    setCategoryForModal(state, action: PayloadAction<'Bug' | 'Suggestion'>) {
      state.category = action.payload
    },
    removeFileId(state, action: PayloadAction<string>) {
      state.fileIds = state.fileIds.filter(file => file.id !== action.payload);
    },
    addFileId(state, action: PayloadAction<{ id: string; name: string; url: string; }>) {
      state.fileIds.push(action.payload);
    },
    openIssueEditInfoModal(state) {
      state.isOpen = true
    },
    closeIssueEditModal(state) {
      state.isOpen = false
    },
    clearIssueEditModal(state) {
      state.tags = []
      state.title = ''
      state.category = ''
      state.description = ''
      state.fileIds = []
      state.labelIds = []
      state.isLoading = false
      state.error = null
    },
    getIssueEditInfo(state, action: PayloadAction<string | undefined>) {
      console.log(state, action)
    },
    setIssueEditInfo(state, action: PayloadAction<SingleIssueType>) {
      state.title = action.payload.title
      state.description = action.payload.description
      state.category = action.payload.type
      state.labelIds = action.payload.labels
      state.status = action.payload.status
      state.published = action.payload.published
    },
    getIssueEditFiles(state, action: PayloadAction<string | undefined>) {
      console.log(state, action)
    },
    setIssueEditFiles(state, action: PayloadAction<{ id: string; name: string; url: string }[]>) {
      state.fileIds = action.payload;
    },
  }
})

export const { setStatus, setIssueEditFiles, getIssueEditInfo, setIssueEditInfo, getIssueEditFiles, clearIssueEditModal, closeIssueEditModal, openIssueEditInfoModal, editIssueStart, editIssueSuccess, editIssueFailure, setTitle, setDescription, setCategoryForModal, setLabelIdsForModal, addFileId, removeFileId } = IssueEditModalSlice.actions;
export default IssueEditModalSlice.reducer;