<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill="#7A869A" />
</svg>


interface DoingIssueIconProps {
  height: number,
  width: number,
  fill: string,
}
const DoingIssueIcon = ({ height, width, fill, ...props }: DoingIssueIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.7406 5.62393C17.4032 5.28115 16.8503 5.28167 16.5136 5.6251L8.17034 14.1337C8.13199 14.1728 8.069 14.1729 8.0306 14.1338L5.14929 11.201C4.81243 10.8581 4.2598 10.8583 3.9232 11.2014C3.59556 11.5354 3.59544 12.0702 3.92295 12.4044L7.27869 15.8282C7.72943 16.288 8.46996 16.2881 8.92073 15.8282L17.7419 6.82938C18.0702 6.49443 18.0697 5.95819 17.7406 5.62393Z"
      fill={fill}
    />
  </svg>
)

export default DoingIssueIcon;