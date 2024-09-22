import HomeIcon from '../../assets/icons/HomeIcon';
import styles from './Board.module.scss'
import Kafshdoozak from '../../assets/icons/BoardHeader.png'
import LoginBaleLogo from '../../assets/icons/LoginBaleLogo';
import Issue from '../../components/Issue/Issue';
import { useSelector } from 'react-redux';
import { clearIssueInfoModal, fetchIssues, fetchTags, IssueType } from '../../redux/slices/issuesSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import IssueInfoModal from '../Issues/IssueInfoModal';
import Modal from '../../components/Modal/Modal';
interface BoardProps {

}



const Board = ({ }: BoardProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const issues = useSelector((state: any) => state.issues.issues)
  const userId = localStorage.getItem('userId')
  const tags = useSelector((state: any) => state.issues.tags);

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchIssues({ status: '', searchQuery: '', sortBy: 'Date', category: '', labelIds: [] }));
  }, [dispatch]);

  const { issueId } = useParams();

  const handleCloseIssueModal = () => {
    dispatch(clearIssueInfoModal());
    navigate('/board')
  }

  return (
    <div className={styles.BoardPage}>
      <div className={styles.BoardContainer}>
        <div className={styles.homeIcon}>
          <HomeIcon onClick={() => navigate('/issues')} height={24} width={24} fill="var(--home-icon-fill)" />
        </div>
        <div className={styles.headerImage}>
          <img className={styles.image} alt='kafshdoozak' src={Kafshdoozak} />
        </div>
        <div className={styles.ContentContainer}>
          <div className={styles.ContentHeader}>
            <span>نقشه راه</span>
            <LoginBaleLogo width={52} height={20} fill='var(--board-bale-icon)' />
          </div>
          <div className={styles.Content}>
            <div className={styles.Done}>
              <div className={styles.DoneHeader}>
                <div className={styles.count}>
                  <span>22</span>
                </div>
                <div className={styles.description}>
                  <div className={styles.rectangle}></div>
                  <div className={styles.desc}>
                    <span className={styles.doingTitle}>انجام شده</span>
                    <span className={styles.doingDesc}>مواردی که توسعۀ آن‌ها به اتمام رسیده است.</span>
                  </div>
                </div>
              </div>
              <div className={styles.DoneContent}>
                {issues.filter((issue: IssueType) => issue.status === 'Done').map((issue: IssueType) => (
                  <Issue
                    issue={issue}
                    isFromBoard={true}
                    isSentByMe={issue.userId === userId}
                    tags={tags}
                    onOpenClick={() => navigate(`/board/${issue.id}`)}
                  />
                ))}
                {/* <Issue isFromBoard={true} isSentByMe={false} />
                <Issue isFromBoard={true} isSentByMe={false} />
                <Issue isFromBoard={true} isSentByMe={false} /> */}
              </div>
            </div>
            <div className={styles.Doing}>
              <div className={styles.DoingHeader}>
                <div className={styles.count}>
                  <span>22</span>
                </div>
                <div className={styles.description}>
                  <div className={styles.rectangle}></div>
                  <div className={styles.desc}>
                    <span className={styles.doingTitle}>در حال انجام</span>
                    <span className={styles.doingDesc}>مواردی که در حال توسعه روی آن‌ها هستیم.</span>
                  </div>
                </div>
              </div>
              <div className={styles.DoingContent}>
                {issues.filter((issue: IssueType) => issue.status === 'InProgress').map((issue: IssueType) => (
                  <Issue
                    issue={issue}
                    isFromBoard={true}
                    isSentByMe={issue.userId === userId}
                    tags={tags}
                    onOpenClick={() => navigate(`/issues/${issue.id}`)}
                  />
                ))}
              </div>
            </div>
            <div className={styles.Open}>
              <div className={styles.OpenHeader}>
                <div className={styles.count}>
                  <span>22</span>
                </div>
                <div className={styles.description}>
                  <div className={styles.rectangle}></div>
                  <div className={styles.desc}>
                    <span className={styles.doingTitle}>باز</span>
                    <span className={styles.doingDesc}>مواردی که هنوز بررسی نشده‌اند.</span>
                  </div>
                </div>
              </div>
              <div className={styles.OpenContent}>
                {issues.filter((issue: IssueType) => issue.status === 'Pending').map((issue: IssueType) => (
                  <Issue
                    issue={issue}
                    isFromBoard={true}
                    isSentByMe={issue.userId === userId}
                    tags={tags}
                    onOpenClick={() => navigate(`/board/${issue.id}`)}

                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={!!issueId} onClose={handleCloseIssueModal}>
        <IssueInfoModal handleCloseModal={handleCloseIssueModal} issueId={issueId} />
      </Modal>
    </div>
  )
}

export default Board;