<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill="#7A869A" />
  <path fill-rule="evenodd" clip-rule="evenodd" fill="#7A869A" />
</svg>

interface CloseIssueIconProps {
  height: number,
  width: number,
  fill: string,
}
const CloseIssueIcon = ({ height, width, fill, ...props }: CloseIssueIconProps) => (
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
      d="M15.1398 4.85766C15.3839 5.10177 15.3838 5.4975 15.1397 5.74155L5.74133 15.138C5.49723 15.382 5.1015 15.382 4.85745 15.1379C4.6134 14.8938 4.61344 14.4981 4.85754 14.254L14.2559 4.85757C14.5 4.61352 14.8958 4.61356 15.1398 4.85766Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.85426 4.85432C5.09834 4.61025 5.49407 4.61025 5.73815 4.85432L15.1444 14.2606C15.3885 14.5046 15.3885 14.9004 15.1444 15.1444C14.9003 15.3885 14.5046 15.3885 14.2605 15.1444L4.85426 5.73821C4.61018 5.49413 4.61018 5.0984 4.85426 4.85432Z"
      fill={fill}
    />
  </svg>
)

export default CloseIssueIcon;