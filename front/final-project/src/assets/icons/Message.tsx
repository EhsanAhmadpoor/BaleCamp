interface MessageVectorProps {
  height: number,
  width: number,
  fill: string,
}
const MessageVector = ({ height, width, fill, ...props }: MessageVectorProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 52 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13 42.5C10.5423 52.7355 0 60 0 60H52V0L14.1818 17.5C14.1818 17.5 14.8177 34.9298 13 42.5Z"
      fill={fill}
    />
  </svg>
)

export default MessageVector;