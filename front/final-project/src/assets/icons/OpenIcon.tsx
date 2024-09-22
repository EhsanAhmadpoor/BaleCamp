interface OpenIconProps {
  height: number,
  width: number,
  fill: string,
  onClick?: () => void
}
const OpenIcon = ({ onClick, height, width, fill, ...props }: OpenIconProps) => (
  <svg
    style={{ cursor: 'pointer' }}
    onClick={onClick}
    width={width}
    height={height}
    viewBox="0 0 17 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.5607 0.43934C17.0932 0.971873 17.1416 1.8052 16.7059 2.39242L16.5607 2.56066L3.622 15.5L16.5607 28.4393C17.0932 28.9719 17.1416 29.8052 16.7059 30.3924L16.5607 30.5607C16.0281 31.0932 15.1948 31.1416 14.6076 30.7059L14.4393 30.5607L0.439341 16.5607C-0.0931931 16.0281 -0.141605 15.1948 0.294104 14.6076L0.439341 14.4393L14.4393 0.43934C15.0251 -0.146447 15.9749 -0.146447 16.5607 0.43934Z"
      fill={fill} />
  </svg>
)

export default OpenIcon;