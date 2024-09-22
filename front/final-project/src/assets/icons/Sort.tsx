<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" fill="#5E6C84" />
  <path fill-rule="evenodd" clip-rule="evenodd" fill="#5E6C84" />
  <path fill-rule="evenodd" clip-rule="evenodd" fill="#5E6C84" />
  <path fill-rule="evenodd" clip-rule="evenodd" fill="#5E6C84" />
  <path fill-rule="evenodd" clip-rule="evenodd" fill="#5E6C84" />
  <path fill-rule="evenodd" clip-rule="evenodd" fill="#5E6C84" />
  <path fill-rule="evenodd" clip-rule="evenodd" fill="#5E6C84" />
</svg>

interface SortIconProps {
  height: number,
  width: number,
  fill: string,
}
const SortIcon = ({ height, width, fill, ...props }: SortIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.75 6.5C2.75 6.08579 3.08579 5.75 3.5 5.75H7.5C7.91421 5.75 8.25 6.08579 8.25 6.5C8.25 6.91421 7.91421 7.25 7.5 7.25H3.5C3.08579 7.25 2.75 6.91421 2.75 6.5Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.75 12.5C2.75 12.0858 3.08579 11.75 3.5 11.75H10.5C10.9142 11.75 11.25 12.0858 11.25 12.5C11.25 12.9142 10.9142 13.25 10.5 13.25H3.5C3.08579 13.25 2.75 12.9142 2.75 12.5Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.75 18C2.75 17.5858 3.08579 17.25 3.5 17.25H21.5C21.9142 17.25 22.25 17.5858 22.25 18C22.25 18.4142 21.9142 18.75 21.5 18.75H3.5C3.08579 18.75 2.75 18.4142 2.75 18Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.5039 5.60938C19.9181 5.60938 20.2539 5.94516 20.2539 6.35938V13.1683C20.2539 13.5825 19.9181 13.9183 19.5039 13.9183C19.0897 13.9183 18.7539 13.5825 18.7539 13.1683V6.35938C18.7539 5.94516 19.0897 5.60938 19.5039 5.60938Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.9357 10.5856C17.2293 10.2934 17.7042 10.2945 17.9964 10.5881L19.5037 12.1024L21.0111 10.5881C21.3033 10.2945 21.7782 10.2934 22.0717 10.5856C22.3653 10.8778 22.3664 11.3527 22.0742 11.6463L20.0353 13.6946C19.8945 13.836 19.7032 13.9155 19.5037 13.9155C19.3042 13.9155 19.1129 13.836 18.9722 13.6946L16.9333 11.6463C16.6411 11.3527 16.6422 10.8778 16.9357 10.5856Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.5391 4.25C14.9533 4.25 15.2891 4.58579 15.2891 5V11.8089C15.2891 12.2231 14.9533 12.5589 14.5391 12.5589C14.1248 12.5589 13.7891 12.2231 13.7891 11.8089V5C13.7891 4.58579 14.1248 4.25 14.5391 4.25Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.5389 4.25C14.7384 4.25 14.9297 4.32949 15.0704 4.4709L17.1093 6.51923C17.4015 6.8128 17.4005 7.28767 17.1069 7.57989C16.8133 7.8721 16.3384 7.87101 16.0462 7.57744L14.5389 6.06312L13.0316 7.57744C12.7393 7.87101 12.2645 7.8721 11.9709 7.57989C11.6773 7.28767 11.6762 6.8128 11.9684 6.51923L14.0073 4.4709C14.1481 4.32949 14.3394 4.25 14.5389 4.25Z"
      fill={fill}
    />
  </svg>
)

export default SortIcon;