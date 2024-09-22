import { forwardRef } from 'react';
import MessageVector from '../../assets/icons/Message';
import OpenIcon from '../../assets/icons/OpenIcon';
import styles from './Issue.module.scss';
import like from '../../assets/icons/like.png';
import disslike from '../../assets/icons/disslike.png';
import CommentIcon from '../../assets/icons/Chat';
import SelfMessageVector from '../../assets/icons/SelfMessage';
import DoneIssueIcon from '../../assets/icons/Done';
import OpenIssueIcon from '../../assets/icons/OpenIssue';
import DoingIssueIcon from '../../assets/icons/DoingIssue';
import CloseIssueIcon from '../../assets/icons/CloseIssue';
import { castVote, deleteVote, IssueType, updateVote } from '../../redux/slices/issuesSlice';
import { useDispatch } from 'react-redux';
import formatDate from '../../utils/formatDate';

interface IssueProps {
  isSentByMe: boolean;
  isFromBoard: boolean;
  tags: { id: number; name: string }[];
  onOpenClick: () => void;
}

const statusIcons = {
  Done: DoneIssueIcon,
  Pending: OpenIssueIcon,
  InProgress: DoingIssueIcon,
  Close: CloseIssueIcon,
};

const Issue = forwardRef<HTMLDivElement, IssueProps & { issue: IssueType }>(
  ({ onOpenClick, tags, issue, isSentByMe, isFromBoard }, ref) => {
    const dispatch = useDispatch();

    const handleVoteClick = (voteType: 'Up' | 'Down') => {
      if (issue.vote?.type === voteType) {
        dispatch(deleteVote({ issueId: issue.id }));
      } else if (!issue.vote) {
        dispatch(castVote({ issueId: issue.id, voteType }));
      } else {
        dispatch(updateVote({ issueId: issue.id, voteType }));
      }
    };

    const tagMap = new Map(tags.map(tag => [tag.id, tag.name]));
    const userId = localStorage.getItem('userId');
    const StatusIcon = statusIcons[issue.status];

    return (
      <div className={styles.issueContainer} ref={ref}>
        <div className={`${styles.issue} ${isSentByMe ? styles.selfIssue : ''}`}>
          <div className={`${styles.header} ${isFromBoard && styles.headerFromBoard}`}>
            <span className={styles.type}>
              {issue.type === 'Bug' ? 'گزارش باگ' : issue.type === 'Suggestion' ? 'پیشنهاد' : ''}#
            </span>
            <span className={`${isSentByMe ? styles.titleByMe : styles.title}`}>{issue.title}</span>
          </div>
          <div className={styles.body}>
            <div className={styles.content}>
              <span className={`${isSentByMe ? styles.issueTextByMe : styles.issueText}`}>{issue.description}</span>
              <OpenIcon
                onClick={onOpenClick}
                width={31}
                height={17}
                fill={`${isSentByMe ? 'var(--issue-open-icon-sentByMe)' : 'var(--issue-open-icon)'}`}
              />
            </div>
            <div className={styles.tags}>
              {issue.labels.map(label => (
                <span key={label.id}>{tagMap.get(label.id)}#</span>
              ))}
            </div>
          </div>
          <div className={`${styles.footer} ${isFromBoard && styles.footerFromBoard}`}>
            <div className={styles.reactions}>
              <div
                onClick={() => {
                  if (userId) {
                    handleVoteClick('Up');
                  }
                }}
                className={`${isSentByMe === false ? styles.like : styles.likeInIssueSentByMe}  ${issue.vote?.type === 'Up' ? styles.selected : ''
                  }`}
              >
                <span className={styles.numberOfReactions}>{issue.upVotes}</span>
                <img src={like} width={16} height={16} />
              </div>
              <div
                onClick={() => {
                  if (userId) {
                    handleVoteClick('Down');
                  }
                }}
                className={`${isSentByMe === false ? styles.disslike : styles.disslikeInIssueSentByMe} ${issue.vote?.type === 'Down' ? styles.selected : ''
                  }`}
              >
                <span className={styles.numberOfReactions}>{issue.downVotes}</span>
                <img src={disslike} width={16} height={16} />
              </div>
            </div>
            <div className={styles.info}>
              <div className={`${isSentByMe ? styles.commentsByMe : styles.comments}`}>
                <span>{issue.commentsCount}</span>
                <CommentIcon height={13.49} width={13.49} fill="var(--issue-comment-icon)" />
              </div>
              <div className={`${isSentByMe ? styles.dateByMe : styles.date}`}>
                <span>{formatDate(issue.date)}</span>
              </div>
              <div className={styles.status}>
                <StatusIcon
                  width={20}
                  height={20}
                  fill={`${isSentByMe
                    ? `var(--issue-${issue.status}-icon-sentByMe)`
                    : `var(--issue-${issue.status}-icon)`
                    } `}
                />
              </div>
            </div>
          </div>
        </div>
        {!isFromBoard && (
          <div>
            {isSentByMe ? (
              <div className={styles.selfMessageVector}>
                <SelfMessageVector width={52} height={60} fill="var(--issue-self-message-vector)" />
              </div>
            ) : (
              <div className={styles.messageVector}>
                <MessageVector width={52} height={60} fill="var(--issue-message-vector)" />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default Issue;