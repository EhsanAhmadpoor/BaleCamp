import HomeIcon from '../../assets/icons/HomeIcon';
import styles from './BoardMobile.module.scss'
import Kafshdoozak from '../../assets/icons/BoardHeader.png'
import Issue from '../../components/Issue/Issue';
import { useSelector } from 'react-redux';
import { clearIssueInfoModal, fetchIssues, fetchTags, IssueType } from '../../redux/slices/issuesSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import IssueInfoModal from '../Issues/IssueInfoModal';
import Modal from '../../components/Modal/Modal';
interface BoardProps {

}



const BoardMobile = ({ }: BoardProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const issues = useSelector((state: any) => state.issues.issues)
  const userId = localStorage.getItem('userId')
  const tags = useSelector((state: any) => state.issues.tags);
  const [activeTab, setActiveTab] = useState('Done');

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchIssues({ status: '', searchQuery: '', sortBy: 'Date', category: '', labelIds: [] }));
  }, [dispatch]);

  const { issueId } = useParams();

  const handleCloseIssueModal = () => {
    dispatch(clearIssueInfoModal());
    navigate('/board')
  }


  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.BoardContainer}>
      <div className={styles.boardHeader}>
        <div className={styles.headerDiv}>
          <div className={styles.homeIcon}>
            <HomeIcon onClick={() => navigate('/issues')} height={16} width={16} fill="var(--home-icon-fill)" />
          </div>
          <span>نقشۀ‌راه</span>
        </div>
      </div>
      <div className={styles.headerImage}>
        <img className={styles.image} alt='kafshdoozak' src={Kafshdoozak} />
      </div>
      <div className={styles.ContentContainer}>
        <div className={styles.ContentHeader}>
          <div className={styles.openDiv} >
            <div className={`${styles.NumberOfItems} ${activeTab === 'Done' ? styles.selectedBoardNumberOfItems : ''}`}>22</div>
            {/* <button onClick={() => } className={`${styles.open} ${ ? styles.selectedBoard : ''}`}>باز</button> */}
            <button onClick={() => handleTabChange('Done')} className={`${styles.open} ${activeTab === 'Done' ? styles.selectedBoard : ''}`}>باز</button>
          </div>
          <div className={styles.doingDiv} >
            <div className={`${styles.NumberOfItems} ${activeTab === 'InProgress' ? styles.selectedBoardNumberOfItems : ''}`}>22</div>
            {/* <button onClick={() => } className={`${styles.doing} ${ ? styles.selectedBoard : ''}`}>درحال انجام</button> */}
            <button onClick={() => handleTabChange('InProgress')} className={`${styles.doing} ${activeTab === 'InProgress' ? styles.selectedBoard : ''}`}>درحال انجام</button>
          </div>
          <div className={styles.doneDiv} >
            <div className={`${styles.NumberOfItems} ${activeTab === 'Pending' ? styles.selectedBoardNumberOfItems : ''}`}>22</div>
            {/* <button onClick={() => } className={`${styles.done} ${ ? styles.selectedBoard : ''}`}>انجام شده</button> */}
            <button onClick={() => handleTabChange('Pending')} className={`${styles.done} ${activeTab === 'Pending' ? styles.selectedBoard : ''}`}>انجام شده</button>
          </div>
          {/* <LoginBaleLogo width={52} height={20} fill='var(--board-bale-icon)' /> */}
        </div>
        <div className={styles.tabs}>
          {activeTab === 'Pending' &&
            <div className={styles.DoneHeader}>
              <div className={styles.count}>
                <span>22</span>
              </div>
              <div className={styles.description}>
                <div className={styles.rectangle}></div>
                <div className={styles.desc}>
                  <span className={styles.doingDesc}>مواردی که توسعۀ آن‌ها به اتمام رسیده است.</span>
                </div>
              </div>
            </div>
          }
          {activeTab === 'InProgress' &&
            <div className={styles.DoingHeader}>
              <div className={styles.count}>
                <span>22</span>
              </div>
              <div className={styles.description}>
                <div className={styles.rectangle}></div>
                <div className={styles.desc}>
                  <span className={styles.doingDesc}>مواردی که در حال توسعه روی آن‌ها هستیم.</span>
                </div>
              </div>
            </div>
          }
          {activeTab === 'Done' &&
            <div className={styles.OpenHeader}>
              <div className={styles.count}>
                <span>22</span>
              </div>
              <div className={styles.description}>
                <div className={styles.rectangle}></div>
                <div className={styles.desc}>
                  <span className={styles.doingDesc}>مواردی که هنوز بررسی نشده‌اند.</span>
                </div>
              </div>
            </div>
          }
        </div>
        <div className={styles.Content}>
          <div className={`${styles.DoneContent} ${activeTab === 'Done' ? styles.active : ''}`}>
            {issues.filter((issue: IssueType) => issue.status === 'Done').map((issue: IssueType) => (
              <Issue
                issue={issue}
                isFromBoard={true}
                isSentByMe={issue.userId === userId}
                tags={tags}
                onOpenClick={() => navigate(`/issues/${issue.id}`)}
              />
            ))}
            {/* <Issue isFromBoard={true} isSentByMe={false} />
                <Issue isFromBoard={true} isSentByMe={false} />
                <Issue isFromBoard={true} isSentByMe={false} /> */}
          </div>
          <div className={`${styles.DoingContent} ${activeTab === 'InProgress' ? styles.active : ''}`}>
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
          <div className={`${styles.OpenContent} ${activeTab === 'Pending' ? styles.active : ''}`}>
            {issues.filter((issue: IssueType) => issue.status === 'Pending').map((issue: IssueType) => (
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
      </div>
      <Modal isOpen={!!issueId} onClose={handleCloseIssueModal}>
        <IssueInfoModal handleCloseModal={handleCloseIssueModal} issueId={issueId} />
      </Modal>
    </div >
  )
}

export default BoardMobile;