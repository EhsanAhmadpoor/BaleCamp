import { useDispatch } from 'react-redux';
import { closeConfirmModal } from '../../redux/slices/issuesSlice';
import styles from './ConfirmModalLogout.module.scss'
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

interface ConfirmLogoutModalProps {
}

const ConfirmLogoutModal = ({ }: ConfirmLogoutModalProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    dispatch(closeConfirmModal())
    dispatch(logout())
    navigate('/login')
  }
  return (
    <div className={styles.modalContent}>
      <div className={styles.header}>
        <span>خروج از حساب کاربری</span>
      </div>
      <div className={styles.content}>
        <span>آیا از خروج از حساب کاربری خود اطمینان دارید؟</span>
      </div>
      <div className={styles.footer}>
        <button className={styles.dontLogout} onClick={() => dispatch(closeConfirmModal())}>
          انصراف
        </button>
        <button className={styles.logout} onClick={() => handleLogoutClick()}>
          خروج
        </button>
      </div>
    </div>
  )
}

export default ConfirmLogoutModal;