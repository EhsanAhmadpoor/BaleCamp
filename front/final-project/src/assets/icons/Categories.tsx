interface CategoriesIconProps {
  height: number,
  width: number,
  fill: string,
}
const CategoriesIcon = ({ height, width, fill, ...props }: CategoriesIconProps) => (
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
      d="M2.75 6.5C2.75 6.08579 3.08579 5.75 3.5 5.75H21.5C21.9142 5.75 22.25 6.08579 22.25 6.5C22.25 6.91421 21.9142 7.25 21.5 7.25H3.5C3.08579 7.25 2.75 6.91421 2.75 6.5Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.75 12.5C2.75 12.0858 3.08579 11.75 3.5 11.75H21.5C21.9142 11.75 22.25 12.0858 22.25 12.5C22.25 12.9142 21.9142 13.25 21.5 13.25H3.5C3.08579 13.25 2.75 12.9142 2.75 12.5Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.75 18C2.75 17.5858 3.08579 17.25 3.5 17.25H21.5C21.9142 17.25 22.25 17.5858 22.25 18C22.25 18.4142 21.9142 18.75 21.5 18.75H3.5C3.08579 18.75 2.75 18.4142 2.75 18Z"
      fill={fill}
    />
  </svg>
)

export default CategoriesIcon;