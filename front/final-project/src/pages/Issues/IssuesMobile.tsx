import styles from './IssuesMobile.module.scss'
import LoginIcon from "../../assets/icons/LoginIssues";
import Kafshdoozak from '../../assets/icons/Kafshdoozak.png'
import QuestionIcon from "../../assets/icons/Question";
import IssuesBaleIcon from '../../assets/icons/IssuesBaleLogo';
import ResetIcon from '../../assets/icons/reset';
import ToggleInput from '../../components/ToggleInput/ToggleInput';
import { useEffect, useState } from 'react';
import RoadMapIcon from '../../assets/icons/Roadmap';
import FilterIcon from '../../assets/icons/Filter';
import SearchIcon from '../../assets/icons/Search';
import SortIcon from '../../assets/icons/Sort';
import CategoriesIcon from '../../assets/icons/Categories';
import SendIcon from '../../assets/icons/Send';
import Issue from '../../components/Issue/Issue';
import Modal from '../../components/Modal/Modal';
import IssueModal from './IssueModal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clearIssueInfoModal, closeAddLabelFromMenu, closeConfirmModal, closeInfoModal, deleteLabel, fetchIssues, fetchProfileFileId, fetchTags, IssueType, openAddLabel, openConfirmModal, openInfoModal, setCategory, setLabelIds, setSearchQuery, setSortBy, setStatus, uploadFileActionLoader } from '../../redux/slices/issuesSlice';
import { useTheme } from '../../hooks/useTheme';
import KafshdoozakDark from '../../assets/icons/Kafshdoozak-dark.png'
import { useNavigate, useParams } from 'react-router-dom';
import InfoModal from './AppIndoModal';
import UserProfileIcon from '../../assets/icons/User-Profile';
import ProfileMenu from '../../components/MenuComponent/Menu';
import AddLabelIcon from '../../assets/icons/add-label';
import AddLabel from './AddLabel';
import LabelMenu from '../../components/MenuComponent/LabelMenu';
import IssueInfoModal from './IssueInfoModal';
import { useRef } from 'react'
import ConfirmLogoutModal from './ConfirmLogoutModal';
import IssueEditModal from './IssueEditModal';
import { clearIssueEditModal, closeIssueEditModal } from '../../redux/slices/IssueEditModalSlice';
import EditIcon from '../../assets/icons/Edit';
import IssueMobileModal from './IssueMobileModal';
import IssueEditMobileModal from './IssueEditMobileModal';

interface IssuesMobileProps {
  isModalOpen: boolean,
  handleOpenModal: () => void,
  handleCloseModal: () => void,
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const IssuesMobile = ({ isModalOpen, handleOpenModal, handleCloseModal, handleKeyPress }: IssuesMobileProps) => {
  const userId = localStorage.getItem('userId')
  const role = localStorage.getItem('role')
  const name = localStorage.getItem('name')
  const email = localStorage.getItem('email')

  const { issueId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isInfoModalOpen = useSelector((state: any) => state.issues.isInfoModalOpen)
  const isConfirmLogoutModalOpen = useSelector((state: any) => state.issues.isConfirmLogoutModalOpen)
  const tags = useSelector((state: any) => state.issues.tags);
  const issues = useSelector((state: any) => state.issues.issues);
  const profilePhoto = useSelector((state: any) => state.issues.profileImage)
  const isAddLabelOpen = useSelector((state: any) => state.issues.isAddLabelOpen)

  const [searchQuery, setSearchQueryState] = useState('');
  const [sortBy, setSortByState] = useState('');
  const [category, setCategoryState] = useState('');
  const [labelIds, setLabelIdsState] = useState<string[]>([]);
  const [status, setStatusState] = useState('')
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [labelMenuOpenTagId, setLabelMenuOpenTagId] = useState<string | null>(null);


  const toggleProfileMenu = () => {
    setProfileMenuOpen(prev => !prev);
  };

  const uploadFile = (file: File) => {
    dispatch(uploadFileActionLoader({ file: file, userId: userId, name: name, email: email, role: role }))
    toggleProfileMenu()
  };

  const handleLogoutClick = () => {
    toggleProfileMenu()
    dispatch(openConfirmModal())
  };

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIssues({ status, searchQuery, sortBy, category, labelIds }));
  }, [dispatch, searchQuery, sortBy, category, labelIds, status]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQueryState(value);
    dispatch(setSearchQuery(value));
  };

  const handleSort = (sortOption: string) => {
    if (sortBy !== sortOption) {
      setSortByState(sortOption);
      dispatch(setSortBy(sortOption));
    } else {
      setSortByState('')
      dispatch(setSortBy(''));
    }
  };

  const handleCategory = (Category: string) => {
    if (category !== Category) {
      setCategoryState(Category);
      dispatch(setCategory(Category));
    } else {
      setCategoryState('')
      dispatch(setCategory(''));
    }
  };

  const handleLabelToggle = (labelId: string) => {
    const updatedLabelIds = labelIds.includes(labelId)
      ? labelIds.filter(id => id !== labelId)
      : [...labelIds, labelId];
    setLabelIdsState(updatedLabelIds);
    dispatch(setLabelIds(updatedLabelIds));
    setLabelMenuOpenTagId(null);
  };

  const handleStatusToggle = (Status: string) => {
    if (Status === status) {
      setStatusState("")
      dispatch(setStatus(""))
    }
    else {
      setStatusState(Status)
      dispatch(setStatus(Status))
    }
  }

  const handleReset = () => {
    setSearchQueryState('');
    setSortByState('');
    setCategoryState('');
    setLabelIdsState([]);
    setStatusState('');

    dispatch(setSearchQuery(''));
    dispatch(setSortBy(''));
    dispatch(setCategory(''));
    dispatch(setLabelIds([]));
    dispatch(setStatus(''));
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLabelMenuOpen = (e: React.MouseEvent, tagId: string) => {
    e.preventDefault();
    setLabelMenuOpenTagId((prevTagId) => (prevTagId === tagId ? null : tagId)); // Toggle menu for the clicked tag
  };

  const handleEditClick = (tagId: string) => {
    console.log(tagId)
  };

  const handleDeleteClick = (tagId: string) => {
    const updatedLabelIds = labelIds.filter(id => id !== tagId);
    setLabelIdsState(updatedLabelIds);
    dispatch(setLabelIds(updatedLabelIds));

    if (tagId !== null) {
      dispatch(deleteLabel({ labelId: tagId }))
    }
    setLabelMenuOpenTagId(null)
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfileFileId(userId))
    }
  }, [dispatch, userId])

  const handleCloseIssueModal = () => {
    dispatch(clearIssueInfoModal());
    navigate('/issues')
  }

  const lastIssueRef = useRef<HTMLDivElement | null>(null); // Reference for the last issue
  const issuesRef = useRef<HTMLDivElement | null>(null);  // Ref for the issues div

  const offset = useSelector((state: any) => state.issues.offset)

  const hasMore = useSelector((state: any) => state.issues.hasMore)

  useEffect(() => {
    if (!hasMore) return;
    if (!lastIssueRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchIssues({ status, searchQuery, sortBy, category, labelIds, offset: offset, lastIssueRef, observer }))
          // if (lastIssueRef.current) {
          //   observer.unobserve(lastIssueRef.current)
          // }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(lastIssueRef.current);


    // if (lastIssueRef.current) observer.unobserve(lastIssueRef.current);
  }, [dispatch, issues])

  const loading = useSelector((state: any) => state.issues.loading)

  const handleCloseIssueEditModal = () => {
    dispatch(clearIssueInfoModal())
    dispatch(closeIssueEditModal());
    dispatch(clearIssueEditModal());
    navigate('/issues')
  }

  const isIssueEditModalOpen = useSelector((state: any) => state.issueEditModal.isOpen)

  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {isIssueEditModalOpen ? (
        <IssueEditMobileModal handleCloseModal={handleCloseIssueEditModal} issueId={issueId} />
      ) :
        isModalOpen ? (
          <IssueMobileModal handleCloseModal={handleCloseModal} />
        ) : (
          <div className={styles.IssuesContainer}>
            <div className={styles.header}>
              <div className={styles.loginIcon}>
                {userId ?
                  (profilePhoto === null ?
                    <UserProfileIcon onClick={toggleProfileMenu} />
                    :
                    <img className={styles.loginIconImage} onClick={toggleProfileMenu} width={24} height={24} src={profilePhoto} />
                  )
                  :
                  <LoginIcon onClick={() => navigate('/login')} height={24} width={24} fill={`${theme === 'dark' ? "var(--issues-login-icon-dark)" : "var(--issues-login-icon)"}`} />
                }
                {isProfileMenuOpen && (
                  <ProfileMenu
                    uploadFile={uploadFile}
                    onLogoutClick={handleLogoutClick}
                  />
                )}
              </div>
              <div className={styles.kafshdoozak}>
                <span>کفشدوزک</span>
                <img alt="kafshdoozak" src={`${theme === 'dark' ? KafshdoozakDark : Kafshdoozak}`} className={styles.kafshdoozakIcon} />
              </div>
              <div className={styles.questionIcon}>
                <FilterIcon onClick={() => setSidebarOpen(prev => !prev)} width={16} height={16} fill={`${theme === 'dark' ? "var(--issues-question-icon-dark)" : "var(--issues-question-icon)"}`} />
              </div>
            </div>
            <div>
              {isSidebarOpen ? (
                <>
                  <div className={styles.sidebar}>

                    <div className={styles.filtersContainer}>
                      <div className={styles.filters}>
                        <div className={styles.filter}>
                          <div className={styles.filterTitle}>
                            <span>فیلتر</span>
                            <FilterIcon width={12} height={12} fill='var(--issues-filter-icon)' />
                          </div>
                          <div className={styles.search}>
                            <SearchIcon width={24} height={24} fill='var(--issues-search-icon)' />
                            <input
                              className={styles.input}
                              type='text'
                              placeholder='جستجو'
                              value={searchQuery}
                              onChange={handleSearch}
                            />
                          </div>
                          <div className={styles.sortAndCategories}>
                            <div className={styles.sort}>
                              <div className={styles.sortTitle}>
                                <span>: مرتب سازی</span>
                                <SortIcon width={24} height={24} fill='var(--issues-sort-icon)' />
                              </div>
                              <div className={styles.sortItems}>
                                <button className={`${styles.sortItem} ${sortBy === 'Date' ? styles.selected : ''}`} onClick={() => handleSort('Date')}>جدیدترین</button>
                                <button className={`${styles.sortItem} ${sortBy === 'Votes' ? styles.selected : ''}`} onClick={() => handleSort('Votes')}>بیشترین رای</button>
                                <button className={`${styles.sortItem} ${sortBy === 'Comments' ? styles.selected : ''}`} onClick={() => handleSort('Comments')}>پربحث ترین</button>
                              </div>
                            </div>
                            <div className={styles.categories}>
                              <div className={styles.categoriesTitle}>
                                <span>: دسته بندی</span>
                                <CategoriesIcon width={24} height={24} fill='var(--issues-sort-icon)' />
                              </div>
                              <div className={styles.sortItems}>
                                <button
                                  onClick={() => handleCategory('Suggestion')}
                                  className={`${styles.categoryItem} ${category === 'Suggestion' ? styles.selected : ''}`}
                                >پیشنهاد</button>
                                <button
                                  className={`${styles.categoryItem} ${category === 'Bug' ? styles.selected : ''}`}
                                  onClick={() => handleCategory('Bug')}
                                >گزارش باگ</button>
                              </div>
                            </div>
                          </div>
                          <div className={styles.tagsContainer}>
                            <div className={styles.tags}>
                              {tags.map((tag: any) => (
                                <span
                                  key={tag}
                                  onClick={() => handleLabelToggle(tag.id)}
                                  onContextMenu={(e) => { (role === 'Admin' || role === 'Manager') ? handleLabelMenuOpen(e, tag.id) : null }}
                                  className={`${styles.tag} ${labelIds.includes(tag.id) ? styles.selectedTags : ''}`}
                                >{tag.name}#
                                  {labelMenuOpenTagId === tag.id && ( // Only open the menu for the clicked tag
                                    <LabelMenu
                                      labelId={tag.id}
                                      labelName={tag.name}
                                      onEditClick={() => handleEditClick(tag.id)}
                                      onDeleteClick={() => handleDeleteClick(tag.id)}
                                      handleLabelMenuOpen={handleLabelMenuOpen}
                                    />
                                  )}
                                </span>
                              ))}
                              {(role === 'Manager' || role === 'Admin') &&
                                <AddLabelIcon onClick={() => { isAddLabelOpen ? dispatch(closeAddLabelFromMenu()) : dispatch(openAddLabel()) }} />
                              }
                            </div>
                            <div className={styles.AddLabelContainer}>
                              {isAddLabelOpen &&
                                <AddLabel />
                              }
                            </div>
                          </div>
                        </div>
                        <div className={styles.roadmapContainer}>
                          <div className={styles.roadmapTitle}>
                            <span>نقشه راه</span>
                            <RoadMapIcon width={12} height={12} fill='var(--issues-roadmap-icon)' />
                          </div>
                          <div className={styles.roadmap}>
                            <div className={styles.roadmapFilters}>
                              <div className={styles.roadmapFilter} >
                                <div className={styles.NumberOfItems}>22</div>
                                <button onClick={() => handleStatusToggle('Pending')} className={`${styles.statusFilter} ${status === 'Pending' ? styles.selectedFilter : ''}`}>باز</button>
                              </div>
                              <div className={styles.roadmapFilter}>
                                <div className={styles.NumberOfItems}>22</div>
                                <button onClick={() => handleStatusToggle('InProgress')} className={`${styles.statusFilter} ${status === 'InProgress' ? styles.selectedFilter : ''}`}>در حال انجام</button>
                              </div>
                              <div className={styles.roadmapFilter}>
                                <div className={styles.NumberOfItems}>22</div>
                                <button onClick={() => handleStatusToggle('Done')} className={`${styles.statusFilter} ${status === 'Done' ? styles.selectedFilter : ''}`}>انجام شده</button>
                              </div>
                              <div className={styles.roadmapFilter}>
                                <div className={styles.NumberOfItems}>22</div>
                                <button onClick={() => handleStatusToggle('Close')} className={`${styles.statusFilter} ${status === 'Close' ? styles.selectedFilter : ''}`}>بسته شده</button>
                              </div>
                            </div>
                            <div className={styles.openRoadmapButton}>
                              <span onClick={() => navigate('/board')}>بررسی اجمالی نقشه راه</span>
                            </div>
                          </div>
                        </div>
                      </div >
                      <div className={styles.resetPlusNightMode}>
                        <div onClick={() => handleReset()} className={styles.reset}>
                          <span>بازنشانی</span>
                          <ResetIcon width={16} height={16} fill='var(--issues-reset-icon)' />
                        </div>
                        <div className={styles.nightMode}>
                          <span>حالت شب</span>
                          <ToggleInput checked={theme === 'dark'} onChange={handleThemeToggle} />
                        </div>
                      </div>
                    </div >
                    {/* <div className={styles.baleLogo}>
                  <IssuesBaleIcon height={20} width={52} fill="var(--issues-bale-icon)" />
                </div> */}
                    <div onClick={() => setSidebarOpen(prev => !prev)} className={styles.confirm}>
                      <span>
                        مشاهده
                      </span>
                    </div>
                  </div >
                </>
              ) : (
                <>
                  <div className={styles.issuesDiv}>
                    <div className={styles.issues} ref={issuesRef}>
                      {issues.map((issue: IssueType, index: number) => {
                        const isLastIssue = index === issues.length - 1;
                        return (
                          <Issue
                            issue={issue}
                            tags={tags}
                            // key={issue.id}
                            isFromBoard={false}
                            isSentByMe={userId == issue.userId}
                            onOpenClick={() => navigate(`/issues/${issue.id}`)}
                            ref={isLastIssue ? lastIssueRef : null}
                          />
                        )
                      })}
                      {loading && <p style={{ color: `var(--color-gray-500)` }}>Loading...</p>}
                    </div>
                    <Modal isOpen={!!issueId} onClose={handleCloseIssueModal}>
                      <IssueInfoModal handleCloseModal={handleCloseIssueModal} issueId={issueId} />
                    </Modal>
                  </div>
                  {userId &&
                    <div className={styles.feedbackContainer}>
                      <SendIcon onClick={handleOpenModal} width={32} height={32} fill='var(--issues-send-icon)' />
                      <input
                        className={styles.feedback}
                        type='text'
                        placeholder='ارسال بازخورد...'
                        onKeyDown={handleKeyPress}
                      />
                    </div>
                  }
                </>
              )
              }

            </div>
          </div >
        )
      }
      <Modal isOpen={isConfirmLogoutModalOpen} onClose={() => dispatch(closeConfirmModal())}>
        <ConfirmLogoutModal />
      </Modal >
    </>

  )
}

export default IssuesMobile;