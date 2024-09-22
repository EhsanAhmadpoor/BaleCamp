interface CloseIconProps {
  height: number,
  width: number,
  fill: string,
}
const CloseIcon = ({ height, width, fill, ...props }: CloseIconProps) => (
  <svg
    style={{ cursor: 'pointer' }}
    width={width}
    height={height}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.1678 6.3291C18.4607 6.62202 18.4606 7.0969 18.1677 7.38976L6.88965 18.6655C6.59673 18.9583 6.12185 18.9583 5.82899 18.6654C5.53613 18.3724 5.53618 17.8976 5.8291 17.6047L17.1072 6.32899C17.4001 6.03613 17.875 6.03618 18.1678 6.3291Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.82514 6.32514C6.11803 6.03225 6.59291 6.03225 6.8858 6.32514L18.1733 17.6126C18.4662 17.9055 18.4662 18.3804 18.1733 18.6733C17.8804 18.9662 17.4055 18.9662 17.1126 18.6733L5.82514 7.3858C5.53225 7.09291 5.53225 6.61803 5.82514 6.32514Z"
      fill={fill}
    />
  </svg>
)

export default CloseIcon;