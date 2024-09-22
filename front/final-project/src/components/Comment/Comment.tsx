import DeleteIcon from "../../assets/icons/Delete";
import MessageVector from "../../assets/icons/Message";
import SelfMessageVector from "../../assets/icons/SelfMessage";
import { CommentType } from "../../pages/Issues/IssueInfoModal";
import styles from "./Comment.module.scss"
import kafsh from '../../assets/icons/Kafshdoozak.png'
import formatDate from "../../utils/formatDate";

interface CommentProps extends CommentType {
  isSentByMe: boolean;
}

const Comment = ({ id, userId, date, text, isSentByMe }: CommentProps) => {

  console.log(id)
  console.log(userId)

  return (
    <div className={`${styles.commentContainer} ${isSentByMe ? styles.selfComment : ''}`}>
      <div className={styles.profileImage}>
        <img src={kafsh} style={{ width: '20px', height: '20px' }} />
      </div>
      <div className={styles.comment}>
        <span className={styles.name}>نیما</span>
        <span className={styles.text}>{text}</span>
        <div className={styles.dateAndDelete}>
          <span className={styles.date}>{formatDate(date)}</span>
          {isSentByMe &&
            <DeleteIcon width={16} height={16} fill="var(--delete-icon)" />
          }
        </div>
        <div>
          {isSentByMe ? (
            <div className={styles.selfMessageVector}>
              <SelfMessageVector width={35.86} height={30} fill='var(--issue-self-message-vector)' />
            </div>
          ) : (
            <div className={styles.messageVector}>
              <MessageVector width={52} height={30} fill='var(--issue-message-vector)' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Comment;