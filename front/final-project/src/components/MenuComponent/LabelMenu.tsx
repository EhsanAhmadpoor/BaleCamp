// ProfileMenu.tsx
import React from 'react';
import styles from './LabelMenu.module.scss';
import DeleteIcon from '../../assets/icons/Delete';
import EditIcon from '../../assets/icons/Edit';
import { useDispatch } from 'react-redux';
import { openAddLabelFromMenu } from '../../redux/slices/issuesSlice';

interface LabelMenuProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
  labelId: string,
  labelName: string,
  handleLabelMenuOpen: (e: React.MouseEvent, tagId: string) => void
}

const LabelMenu = ({ handleLabelMenuOpen, onEditClick, onDeleteClick, labelId, labelName }: LabelMenuProps) => {
  const dispatch = useDispatch()

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleLabelMenuOpen(e, labelId)
    dispatch(openAddLabelFromMenu({ labelId, labelName })); // Pass labelId and labelName to open the AddLabel component in edit mode
    onEditClick();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteClick();
  };

  return (
    <div className={styles.profileMenu}>
      <div className={styles.changeProf}>
        <button onClick={handleEditClick}>
          <div>
            <span>ویرایش</span>
            <EditIcon />
          </div>
        </button>
      </div>
      <div className={styles.logout}>
        <button onClick={handleDeleteClick}>
          <div>
            <span>حذف</span>
            <DeleteIcon width={24} height={24} fill='var(--color-red-50)' />
          </div>
        </button>
      </div>
    </div>
  );
};

export default LabelMenu;
