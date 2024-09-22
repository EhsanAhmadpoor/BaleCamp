import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { castVote, closeInfoModal, createComment, deleteVote, getComments, getIssueFiles, getIssueInfo, updateVote } from "../../redux/slices/issuesSlice"
import styles from './IssueInfoModal.module.scss'
import CloseIcon from "../../assets/icons/Close"
import { useSelector } from "react-redux"
import SendIcon from "../../assets/icons/Send"
import like from '../../assets/icons/like.png'
import disslike from '../../assets/icons/disslike.png'
import CommentIcon from "../../assets/icons/Chat"
import formatDate from "../../utils/formatDate"
import DoneIssueIcon from '../../assets/icons/Done';
import OpenIssueIcon from '../../assets/icons/OpenIssue';
import DoingIssueIcon from '../../assets/icons/DoingIssue';
import CloseIssueIcon from '../../assets/icons/CloseIssue';
import getFileType from "../../utils/getFileType"
import truncateFileName from "../../utils/truncateFileName"
import PlayIcon from "../../assets/icons/Play"
import Comment from "../../components/Comment/Comment"
import EditIssueModalIcon from "../../assets/icons/EditIssueModal"
import { useNavigate } from "react-router-dom"
import { openIssueEditInfoModal } from "../../redux/slices/IssueEditModalSlice"
import useWindowSize from "../../hooks/useWindowSize"

interface IssueInfoModalProps {
  issueId: string | undefined
  handleCloseModal: () => void
}
export interface CommentType {
  id: number;
  userId: string;
  text: string;
  date: string;
}
export interface SingleIssueType {
  id: number,
  title: string,
  description: string,
  status: "Pending" | "Done" | "InProgress",
  date: string,
  type: "Suggestion" | "Bug",
  published: boolean,
  reviewed: boolean,
  votesDiff: number,
  upVotes: number,
  downVotes: number,
  userId: number,
  labels: { id: number }[],
  comments: number,
  vote: { id: number, type: 'Up' | 'Down', date: string, userId: string, issueId: string }
  IssueComments: CommentType[]
}

const IssueInfoModal = ({ handleCloseModal, issueId }: IssueInfoModalProps) => {
  const dispatch = useDispatch()
  const issue: SingleIssueType = useSelector((state: any) => state.issues.IssueInfoModal)
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    dispatch(getIssueFiles(issueId))
  }, [dispatch])
  useEffect(() => {
    dispatch(getIssueInfo(issueId))
  }, [dispatch])

  useEffect(() => {
    dispatch(getComments(issueId))
  }, [dispatch])

  const handleVoteClick = (voteType: 'Up' | 'Down') => {
    if (issue?.vote?.type === voteType) {
      dispatch(deleteVote({ issueId: issue.id }));
    } else if (issue?.vote === undefined || issue?.vote === null) {
      dispatch(castVote({ issueId: issue.id, voteType }));
    } else {
      dispatch(updateVote({ issueId: issue.id, voteType: voteType }));
    }
  };


  const statusIcons = {
    Done: DoneIssueIcon,
    Pending: OpenIssueIcon,
    InProgress: DoingIssueIcon,
    Close: CloseIssueIcon,
  };

  const StatusIcon = statusIcons[issue?.status] || null;
  const tags = useSelector((state: any) => state.issues.tags);
  const tagMap = new Map<number, string>(tags.map((tag: any) => [tag.id, tag.name]));
  const files = useSelector((state: any) => state.issues.files); // Assuming you are storing files in the Redux state

  const handlePlay = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  const renderFilePreview = (file: { id: string; name: string; url: string }) => {
    const fileType = getFileType(file.name); // Utility to determine file type (image, video, etc.)
    switch (fileType) {
      case 'image':
        return <img src={file.url} alt={truncateFileName(file.name)} onClick={() => handlePlay(file.url)} />;
      case 'video':
        return (
          <>
            <video src={file.url} controls={false} />
            <div className={styles.play} onClick={() => handlePlay(file.url)}>
              <PlayIcon height={40} width={40} fill='var(--modal-play-icon)' />
            </div>
          </>
        );
      case 'pdf':
        return (
          <div className={styles.pdfIcon} onClick={() => handlePlay(file.url)}>PDF</div>
        );
      default:
        return <div className={styles.fileIcon} onClick={() => handlePlay(file.url)}>FILE</div>;  // Add a custom generic file icon
    }
  };

  const [comment, setComment] = useState("")

  const navigate = useNavigate()
  const { width } = useWindowSize()
  const handleOpenIssueEditModal = () => {
    if (width > 780) {
      if (role === 'Admin' || role === 'Manager' || userId == issue?.userId.toString()) {
        dispatch(closeInfoModal())
        dispatch(openIssueEditInfoModal())
        navigate(`/issues/${issue.id}/edit`)
      }
    } else{
      if (role === 'Admin' || role === 'Manager' || userId == issue?.userId.toString()) {
        dispatch(closeInfoModal())
        dispatch(openIssueEditInfoModal())
        navigate(`/issues/${issue.id}/edit`)
      }
    }
  }
  const role = localStorage.getItem('role')

  return (
    <div className={styles.infoModal}>
      <div className={styles.modalHeader}>
        <div onClick={handleCloseModal} className={styles.closeIcon}>
          <CloseIcon height={24} width={24} fill='var(--issue-modal-close-icon)' />
        </div>
        <div className={styles.headerNameAndSuggest}>
          <div className={styles.modalInfoHeader}>
            <span className={styles.modalDesc}>{issue?.title}</span>
            <span className={styles.modalTitle}>{issue?.type === 'Suggestion' ? 'پیشنهاد' : issue?.type === 'Bug' ? 'باگ' : ''}#</span>
          </div>
          {(role === 'Admin' || role === 'Manager' || userId == issue?.userId.toString()) &&
            <EditIssueModalIcon onClick={handleOpenIssueEditModal} />
          }
        </div>
      </div>
      <div className={styles.modalContent}>
        <div className={styles.tags}>
          {issue?.labels.map(label =>
            <span key={label.id}>{tagMap.get(label.id)}#</span>
          )}
        </div>
        <span className={styles.issueText}>{issue?.description}</span>
        {/* Existing modal content */}
        <div className={styles.filesContainer}>
          {files?.map((file: any) => (
            <div key={file.id} className={styles.Item}>
              <div className={styles.preview}>{renderFilePreview(file)}</div>
            </div>
          ))}
        </div>
        <div className={`${styles.footer}`}>
          <div className={styles.reactions}>
            <div onClick={() => handleVoteClick('Up')} className={` ${styles.like}  ${issue?.vote?.type === 'Up' ? styles.selected : ''}`}>
              <span className={styles.numberOfReactions}>{issue?.upVotes}</span>
              <img src={like} width={16} height={16} />
            </div>
            <div onClick={() => handleVoteClick('Down')} className={`${styles.disslike} ${issue?.vote?.type === 'Down' ? styles.selected : ''}`}>
              <span className={styles.numberOfReactions}>{issue?.downVotes}</span>
              <img src={disslike} width={16} height={16} />
            </div>
          </div>
          <div className={styles.info}>
            <div className={`${styles.comments}`}>
              <span>{issue?.comments}</span>
              <CommentIcon height={13.49} width={13.49} fill='var(--issue-comment-icon)' />
            </div>
            <div className={`${styles.date}`}>
              <span>{formatDate(issue?.date)}</span>
            </div>
            <div className={styles.status}>
              {StatusIcon ? <StatusIcon width={20} height={20} fill={`var(--issue-${issue?.status}-icon)`} /> : null}
            </div>
          </div>
        </div >
        <div className={styles.commentsSection}>
          <div className={styles.comments}>
            {issue?.IssueComments.map((comment) =>
              <Comment
                id={comment.id}
                date={comment.date}
                userId={comment.userId}
                text={comment.text}
                isSentByMe={comment.userId == userId}
              />
            )}
          </div>
        </div>
        <div className={styles.modalComments}></div>
      </div>
      <div className={styles.commentContainer}>
        <SendIcon onClick={() => {
          if (userId) {
            dispatch(createComment({ issueId: issueId, text: comment }))
            setComment("")
          }
        }
        } width={32} height={32} fill='var(--issues-send-icon)' />
        <input
          disabled={userId === null}
          className={styles.comment}
          type='text'
          placeholder='نظر خود را بنویسید...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
    </div>
  )
}

export default IssueInfoModal;