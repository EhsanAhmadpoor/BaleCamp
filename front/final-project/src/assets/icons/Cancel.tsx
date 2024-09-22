interface CancelIconProps {
  height: number,
  width: number,
  fill: string,
  onClick: () => void
}
const CancelIcon = ({ onClick, height, width, fill, ...props }: CancelIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 44 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    {...props}
  >
    <circle
      cx={22}
      cy={22.5}
      r={22}
      fill="#0ACA9B"
    />
    <circle
      cx={22}
      cy={22.5}
      r={17}
      stroke={fill}
      strokeWidth={2}
    />
    <path
      d="M25.6019 26.1918L18.0859 18.6758"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.0859 26.1918L25.6019 18.6758"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default CancelIcon;