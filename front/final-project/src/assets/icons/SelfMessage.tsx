interface SelfMessageIconProps {
  height: number,
  width: number,
  fill: string,
}
const SelfMessageVector = ({ height, width, fill, ...props }: SelfMessageIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 53 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M39.0374 36.8333C41.4975 45.7041 52.0499 52 52.0499 52H-2.67029e-05V0L37.8545 15.1667C37.8545 15.1667 37.218 30.2725 39.0374 36.8333Z"
      fill={fill}
    />
  </svg>
)

export default SelfMessageVector;