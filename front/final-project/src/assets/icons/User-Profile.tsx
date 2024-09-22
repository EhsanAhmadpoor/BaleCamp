interface UserProfileIconProps {
  onClick: () => void
}
const UserProfileIcon = ({ onClick, ...props }: UserProfileIconProps) => (
  <svg
    onClick={onClick}
    width={25}
    height={25}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="0.5"
      width="24"
      height="24"
      rx="12"
      fill="#0ACA9B"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.4647 9.36298C15.4647 11.0077 14.1459 12.3265 12.5 12.3265C10.8547 12.3265 9.53539 11.0077 9.53539 9.36298C9.53539 7.71825 10.8547 6.39999 12.5 6.39999C14.1459 6.39999 15.4647 7.71825 15.4647 9.36298ZM12.5 17.6C10.0709 17.6 8.02002 17.2052 8.02002 15.682C8.02002 14.1582 10.0838 13.7774 12.5 13.7774C14.9297 13.7774 16.98 14.1722 16.98 15.6954C16.98 17.2192 14.9162 17.6 12.5 17.6Z"
      fill="white"
    />
  </svg>
)

export default UserProfileIcon;