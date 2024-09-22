import { useSelector } from 'react-redux';
import ConfirmIcon from '../../assets/icons/Confirm';
import styles from './AddLabel.module.scss'
import { addNewLabel, changeNewLabel, closeAddLabelFromMenu, editLabel } from '../../redux/slices/issuesSlice';
import { useDispatch } from 'react-redux';
interface AddLabelProps {

}

const AddLabel = ({ }: AddLabelProps) => {

  const newLabel: string = useSelector((state: any) => state.issues.newLabel)
  const dispatch = useDispatch()
  const editingLabelId = useSelector((state: any) => state.issues.editingLabelId);

  const handleConfirm = () => {
    if (editingLabelId) {
      dispatch(editLabel({ labelId: editingLabelId, newLabelName: newLabel }));
    } else {
      dispatch(addNewLabel(newLabel));
    }
    dispatch(changeNewLabel(""));
    dispatch(closeAddLabelFromMenu());
  };

  return (
    <div className={styles.AddLabel}>
      <input
        type='text'
        placeholder='عنوان برچسب'
        className={styles.labelInput}
        value={newLabel}
        onChange={(e: any) => dispatch(changeNewLabel(e.target.value))}
      />
      <ConfirmIcon onClick={handleConfirm} />
    </div>
  )
}

export default AddLabel;