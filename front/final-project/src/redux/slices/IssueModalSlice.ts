import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IssueModalState {
  tags: string[],
  title: string,
  description: string,
  category: 'Bug' | 'Suggestion',
  labelIds: string[],
  fileIds: string[],
  isLoading: boolean,
  error: string | null,
}

const initialState: IssueModalState = {
  tags: [],
  title: '',
  description: '',
  category: 'Bug',
  labelIds: [],
  fileIds: [],
  isLoading: false,
  error: null,
}

const IssueModalSlice = createSlice({
  name: 'IssuesModal',
  initialState,
  reducers: {
    setTags(state, action: PayloadAction<string[]>) {
      state.tags = action.payload;
    },
    fetchTags() { },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload
    },
    setCategoryForModal(state, action: PayloadAction<'Bug' | 'Suggestion'>) {
      state.category = action.payload
    },
    setLabelIdsForModal(state, action: PayloadAction<string[]>) {
      state.labelIds = action.payload
    },
    addFileId(state, action: PayloadAction<string>) {
      state.fileIds.push(action.payload);
    },
    removeFileId(state, action: PayloadAction<string>) {
      state.fileIds = state.fileIds.filter(id => id !== action.payload);
    },
    createIssueStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    createIssueSuccess(state) {
      state.isLoading = false;
    },
    createIssueFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})

export const { createIssueStart, createIssueSuccess, createIssueFailure, setTags, fetchTags, setTitle, setDescription, setCategoryForModal, setLabelIdsForModal, addFileId, removeFileId } = IssueModalSlice.actions;
export default IssueModalSlice.reducer;