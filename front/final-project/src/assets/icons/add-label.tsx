interface AddLabelIconProps {
  onClick: () => void
}
const AddLabelIcon = ({ onClick, ...props }: AddLabelIconProps) => (
  <svg
    onClick={onClick}
    style={{ cursor: 'pointer' }}
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3.5C7.30527 3.5 3.5 7.30616 3.5 12C3.5 16.6938 7.30527 20.5 12 20.5C16.6938 20.5 20.5 16.6938 20.5 12C20.5 7.30621 16.6938 3.5 12 3.5ZM2 12C2 6.47784 6.47673 2 12 2C17.5222 2 22 6.47779 22 12C22 17.5222 17.5222 22 12 22C6.47673 22 2 17.5222 2 12Z"
      fill="#09B188"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12Z"
      fill="#09B188"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9999 7.25C12.4142 7.25 12.7499 7.58579 12.7499 8V16C12.7499 16.4142 12.4142 16.75 11.9999 16.75C11.5857 16.75 11.2499 16.4142 11.2499 16V8C11.2499 7.58579 11.5857 7.25 11.9999 7.25Z"
      fill="#09B188"
    />
  </svg>
)

export default AddLabelIcon;