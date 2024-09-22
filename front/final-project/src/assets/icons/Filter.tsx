interface FilterIconProps {
  height: number,
  width: number,
  fill: string,
  onClick?: () => void
}
const FilterIcon = ({ onClick, height, width, fill, ...props }: FilterIconProps) => (
  <svg
    onClick={onClick}
    width={width}
    height={height}
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0439 9.10221C13.1225 9.10221 14 9.9753 14 11.0483C14 12.1213 13.1225 12.9943 12.0439 12.9943C10.9646 12.9943 10.0865 12.1213 10.0865 11.0483C10.0865 9.9753 10.9646 9.10221 12.0439 9.10221ZM12.0439 10.0451C11.4844 10.0451 11.0294 10.4951 11.0294 11.0483C11.0294 11.602 11.4844 12.0515 12.0439 12.0515C12.6027 12.0515 13.0571 11.602 13.0571 11.0483C13.0571 10.4951 12.6027 10.0451 12.0439 10.0451ZM7.4505 10.6012C7.71073 10.6012 7.92193 10.8124 7.92193 11.0727C7.92193 11.3329 7.71073 11.5441 7.4505 11.5441H3.48985C3.22962 11.5441 3.01842 11.3329 3.01842 11.0727C3.01842 10.8124 3.22962 10.6012 3.48985 10.6012H7.4505ZM4.95675 3C6.03602 3 6.91351 3.87372 6.91351 4.9467C6.91351 6.01967 6.03602 6.89214 4.95675 6.89214C3.87812 6.89214 3 6.01967 3 4.9467C3 3.87372 3.87812 3 4.95675 3ZM4.95675 3.94286C4.39795 3.94286 3.94286 4.39292 3.94286 4.9467C3.94286 5.49984 4.39795 5.94927 4.95675 5.94927C5.51619 5.94927 5.97065 5.49984 5.97065 4.9467C5.97065 4.39292 5.51619 3.94286 4.95675 3.94286ZM13.1773 4.50883C13.4375 4.50883 13.6488 4.72003 13.6488 4.98026C13.6488 5.24049 13.4375 5.45169 13.1773 5.45169H9.2173C8.95707 5.45169 8.74587 5.24049 8.74587 4.98026C8.74587 4.72003 8.95707 4.50883 9.2173 4.50883H13.1773Z"
      fill={fill}
    >
    </path>
  </svg>
)

export default FilterIcon;