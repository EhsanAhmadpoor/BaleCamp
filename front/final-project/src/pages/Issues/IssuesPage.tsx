import Issues from "./Issues";
import IssuesMobile from "./IssuesMobile";
import useWindowSize from "../../hooks/useWindowSize";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../redux/slices/issuesSlice";

const IssuesPage = () => {
  const { width } = useWindowSize()
  const dispatch = useDispatch()
  const isModalOpen = useSelector((state: any) => state.issues.isModalOpen);  // Accessing modal state from issues slice
  const navigate = useNavigate()
  const location = useLocation()

  const handleOpenModal = () => {
    dispatch(openModal())
    navigate('/issues/new')
  }

  const handleCloseModal = () => {
    dispatch(closeModal())
    navigate('/issues')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      openModal();
    }
  }

  useEffect(() => {
    if (location.pathname === '/issues/new') {
      openModal();
    } else {
      closeModal();
    }
  }, [location.pathname])

  return width > 768 ?
    <Issues isModalOpen={isModalOpen} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} handleKeyPress={handleKeyPress} />
    :
    <IssuesMobile isModalOpen={isModalOpen} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} handleKeyPress={handleKeyPress} />;
}

export default IssuesPage;