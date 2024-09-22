import { useDispatch } from 'react-redux';
import { closeInfoModal } from '../../redux/slices/issuesSlice';
import styles from './AppIndoModal.module.scss'

interface InfoModalProps {
}

const InfoModal = ({ }: InfoModalProps) => {
  const dispatch = useDispatch()

  return (
    <div className={styles.modalContent}>
      <div className={styles.header}>
        <span>سامانۀ ارسال پیشنهاد و گزارش اشکال بله</span>
      </div>
      <div className={styles.content}>
        <span>شما می‌توانید گزارش‌های اشکال و پیشنهادات خود را برای بهبود پیام‌رسان "بله" ارسال کنید. برای این‌کار از دکمۀ ارسال بازخورد در پایین صفحه استفاده کنید.</span>
      </div>
      <div className={styles.footer}> 
        <button onClick={() => dispatch(closeInfoModal())}>
          متوجه شدم
        </button>
      </div>
    </div>
  )
}

export default InfoModal;