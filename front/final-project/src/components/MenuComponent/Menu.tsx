// ProfileMenu.tsx
import React from 'react';
import styles from './Menu.module.scss';
import ChangeProfIcon from '../../assets/icons/ChangeProf';
import LogoutIcon from '../../assets/icons/Logout';

interface ProfileMenuProps {
  onLogoutClick: () => void;
  uploadFile: (file: File) => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ uploadFile, onLogoutClick }) => {

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };


  return (
    <div className={styles.profileMenu}>
      <div className={styles.changeProf}>
        <label htmlFor="fileInput">
          <div>
            <span>تغییر تصویر</span>
            <ChangeProfIcon />
          </div>
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }} // Hidden input
          onChange={handleFileChange}
        />
      </div>
      <div className={styles.logout}>
        <button onClick={onLogoutClick}>
          <div>
            <span>خروج</span>
            <LogoutIcon />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
