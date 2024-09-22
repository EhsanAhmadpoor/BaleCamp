interface ConfirmIconProps {
  onClick: () => void
}
const ConfirmIcon = ({ onClick, ...props }: ConfirmIconProps) => (
  <svg
    style={{ cursor: 'pointer' }}
    onClick={onClick}
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.3444 6.61883C18.9937 6.27521 18.4323 6.27574 18.0822 6.62004L9.1595 15.3947C9.11815 15.4354 9.05183 15.4354 9.01044 15.3948L5.91368 12.3552C5.56349 12.0115 5.00248 12.0117 4.65254 12.3557C4.29393 12.7082 4.29381 13.2862 4.65227 13.6389L8.25988 17.1882C8.71726 17.6382 9.45102 17.6382 9.90843 17.1882L19.3457 7.90467C19.7051 7.55116 19.7045 6.97159 19.3444 6.61883Z"
      fill="#09B188"
    />
  </svg>
)

export default ConfirmIcon;