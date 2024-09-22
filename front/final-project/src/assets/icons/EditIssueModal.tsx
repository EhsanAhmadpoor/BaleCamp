<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.416 17.0821H16.7302" stroke="#42526E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7123 4.62969C11.3265 3.84719 12.319 3.88803 13.1023 4.50219L14.2607 5.41053C15.044 6.02469 15.3215 6.97719 14.7073 7.76136L7.79984 16.5739C7.56901 16.8689 7.21651 17.043 6.84151 17.0472L4.17734 17.0814L3.57401 14.4855C3.48901 14.1214 3.57401 13.738 3.80484 13.4422L10.7123 4.62969Z" stroke="#42526E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M9.41748 6.28125L13.4125 9.41292" stroke="#42526E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>


interface EditIssueModalIconProps {
  onClick: () => void
}
const EditIssueModalIcon = ({ onClick, ...props }: EditIssueModalIconProps) => (
  <svg
    style={{ cursor: 'pointer' }}
    onClick={onClick}
    width={20}
    height={21}
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.416 17.0821H16.7302"
      stroke={`var(--color-gray-400)`}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.7123 4.62969C11.3265 3.84719 12.319 3.88803 13.1023 4.50219L14.2607 5.41053C15.044 6.02469 15.3215 6.97719 14.7073 7.76136L7.79984 16.5739C7.56901 16.8689 7.21651 17.043 6.84151 17.0472L4.17734 17.0814L3.57401 14.4855C3.48901 14.1214 3.57401 13.738 3.80484 13.4422L10.7123 4.62969Z"
      stroke={`var(--color-gray-400)`}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.41748 6.28125L13.4125 9.41292"
      stroke={`var(--color-gray-400)`}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round" />


  </svg>
)

export default EditIssueModalIcon;