interface SearchIconProps {
  height: number,
  width: number,
  fill: string,
}
const SearchIcon = ({ height, width, fill, ...props }: SearchIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="11.7682" cy="11.7683" r="8.98856" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.0187 18.4875L21.5427 22.0024" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default SearchIcon;