interface OpenIssueIconProps {
  height: number,
  width: number,
  fill: string,
}
const OpenIssueIcon = ({ height, width, fill, ...props }: OpenIssueIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.6666 9.99992C16.6666 13.6821 13.6821 16.6666 9.99998 16.6666C6.31782 16.6666 3.33331 13.6821 3.33331 9.99992C3.33331 6.31776 6.31782 3.33325 9.99998 3.33325C13.6821 3.33325 16.6666 6.31776 16.6666 9.99992Z"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.4746 12.1194L9.75745 10.4985V7.00513"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default OpenIssueIcon;