import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentType, SingleIssueType } from '../../pages/Issues/IssueInfoModal';

export interface IssueType {
  id: number;
  title: string;
  description: string;
  userId: string;
  status: 'Pending' | 'InProgress' | 'Done' | 'Close';
  date: string;
  type: string;
  labels: { id: number }[];
  commentsCount: number;
  published: boolean;
  upVotes: number;
  downVotes: number;
  vote: { id: number, type: 'Up' | 'Down' } | null
}


interface IssuesState {
  tags: string[];
  issues: IssueType[]
  searchQuery: string;
  sortBy: string;
  category: string;
  labelIds: string[];
  status: string,
  isModalOpen: boolean,
  isInfoModalOpen: boolean,
  profileImage: null | string,
  isAddLabelOpen: boolean,
  newLabel: string,
  editingLabelId: string | null
  offset: number;
  loading: boolean;
  vote: { id: number, type: 'Up' | 'Down' } | null
  profileFileId: null | string
  IssueInfoModal: SingleIssueType | null
  files: { id: string; name: string; url: string }[];
  isConfirmLogoutModalOpen: boolean,
  hasMore: boolean
}

const initialState: IssuesState = {
  tags: [],
  issues: [],
  searchQuery: '',
  sortBy: 'Date',
  category: '',
  labelIds: [],
  status: '',
  isModalOpen: false,
  isInfoModalOpen: false,
  profileImage: null,
  isAddLabelOpen: false,
  newLabel: "",
  editingLabelId: null,
  offset: 20,
  loading: false,
  vote: null,
  profileFileId: null,
  IssueInfoModal: null,
  files: [],
  isConfirmLogoutModalOpen: false,
  hasMore: true
};


const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setTags(state, action: PayloadAction<string[]>) {
      state.tags = action.payload;
    },
    fetchTags() { }, // This action is just a trigger for the epic
    setIssues(state, action: PayloadAction<IssueType[]>) {
      state.issues = action.payload
      state.offset = 20
      state.loading = false
    },
    appendIssues(state, action: PayloadAction<{ issues: IssueType[] }>) {
      state.loading = false
      state.issues = [...state.issues, ...action.payload.issues]
      state.offset += 20
    },
    fetchIssues(state, action: PayloadAction<{ status: string, searchQuery: string, sortBy: string, category: string, labelIds: string[], offset?: number, lastIssueRef?: React.MutableRefObject<HTMLDivElement | null>, observer?: IntersectionObserver }>) {
      state.loading = true
      console.log(action)
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setLabelIds(state, action: PayloadAction<string[]>) {
      state.labelIds = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
    openInfoModal(state) {
      state.isInfoModalOpen = true
    },
    closeInfoModal(state) {
      state.isInfoModalOpen = false
    },
    openAddLabel(state) {
      state.isAddLabelOpen = true
    },
    closeAddLabel(state) {
      state.isAddLabelOpen = false
    },
    changeNewLabel(state, action: PayloadAction<string>) {
      state.newLabel = action.payload
    },
    addNewLabel(state, action: PayloadAction<string>) {
      console.log(action, state)
    },
    deleteLabel(state, action: PayloadAction<{ labelId: string }>) {
      console.log(state, action)
    },
    openAddLabelFromMenu(state, action: PayloadAction<{ labelId: string | null, labelName: string }>) {
      state.isAddLabelOpen = true;
      state.editingLabelId = action.payload.labelId;
      state.newLabel = action.payload.labelName;
    },
    closeAddLabelFromMenu(state) {
      state.isAddLabelOpen = false;
      state.editingLabelId = null;
      state.newLabel = "";
    },
    editLabel(state, action: PayloadAction<{ labelId: string, newLabelName: string }>) {
      console.log(state, action)
    },
    castVote(state, action: PayloadAction<{ issueId: number, voteType: 'Up' | 'Down' }>) {
      console.log(state, action)
    },
    deleteVote(state, action: PayloadAction<{ issueId: number }>) {
      console.log(state, action)
    },
    updateVote(state, action: PayloadAction<{ issueId: number, voteType: 'Up' | 'Down' }>) {
      console.log(state, action)
    },
    setVoteSuccess(state) {
      console.log(state)
    },
    setVoteFailure(state) {
      console.log(state)
    },
    fetchProfileFileId(state, action: PayloadAction<string>) {
      console.log(state, action)
    },
    setUserProfileId(state, action: PayloadAction<string>) {
      state.profileFileId = action.payload
      state.profileImage = `/api/files/${action.payload}`
    },
    uploadFileActionLoader(state, action: PayloadAction<{ file: File, userId: string | null, name: string | null, role: string | null, email: string | null }>) {
      console.log(state, action)
    },
    updateProfile(state, action: PayloadAction<{ avatarId: string, userId: string, name: string | null, role: string | null, email: string | null }>) {
      console.log(state, action)
    },
    getIssueInfo(state, action: PayloadAction<string | undefined>) {
      console.log(state, action)
    },
    setIssueInfoModal(state, action: PayloadAction<SingleIssueType>) {
      state.IssueInfoModal = action.payload

    },
    getIssueFiles(state, action: PayloadAction<string | undefined>) {
      console.log(state, action)
    },
    setIssueFiles(state, action: PayloadAction<{ id: string; name: string; url: string }[]>) {
      state.files = action.payload;
    },
    getComments(state, action: PayloadAction<string | undefined>) {
      console.log(state, action)
    },
    setComments(state, action: PayloadAction<CommentType[]>) {
      if (state.IssueInfoModal !== null) {
        1
        state.IssueInfoModal.IssueComments = action.payload
      }
    },
    createComment(state, action: PayloadAction<{ issueId: string | undefined, text: string }>) {
      console.log(state, action)
    },
    clearIssueInfoModal(state) {
      state.IssueInfoModal = null
      state.files = []
    },
    openConfirmModal(state) {
      state.isConfirmLogoutModalOpen = true
    },
    closeConfirmModal(state) {
      state.isConfirmLogoutModalOpen = false
    },
    thereIsNoMore(state) {
      state.hasMore = false
      state.loading = false
    }

  }
});

export const { thereIsNoMore, openConfirmModal, closeConfirmModal, clearIssueInfoModal, appendIssues, createComment, getComments, setComments, setIssueFiles, getIssueFiles, setIssueInfoModal, getIssueInfo, updateProfile, uploadFileActionLoader, setUserProfileId, fetchProfileFileId, castVote, deleteVote, updateVote, setVoteSuccess, setVoteFailure, openAddLabelFromMenu, closeAddLabelFromMenu, editLabel, deleteLabel, addNewLabel, changeNewLabel, openAddLabel, closeAddLabel, openInfoModal, closeInfoModal, openModal, closeModal, setStatus, setTags, fetchTags, setIssues, fetchIssues, setSearchQuery, setSortBy, setCategory, setLabelIds } = issuesSlice.actions;
export default issuesSlice.reducer;
