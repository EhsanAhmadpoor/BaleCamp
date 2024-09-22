import styles from './ToggleInput.module.scss'
interface ToggleInputProps {
  checked: boolean,
  onChange: () => void
}

const ToggleInput = ({ checked, onChange }: ToggleInputProps) => {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleInput;