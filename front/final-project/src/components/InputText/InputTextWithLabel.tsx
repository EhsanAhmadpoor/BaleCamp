interface TextINputWithLabelProps {
  label: string,
  placeholder: string,
  onChange: (event: any) => void,
  inputClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  value: string,
  type?: string
}
const TextInputWithLabel = ({
  label,
  placeholder,
  onChange,
  inputClassName = '',
  labelClassName = '',
  wrapperClassName = '',
  value,
  type = "text",
  ...props
}: TextINputWithLabelProps) => {
  return (
    <div className={wrapperClassName}>
      <input
        type={type}
        className={inputClassName}
        placeholder={placeholder}
        onChange={(e: any) => onChange(e)}
        value={value}
        {...props}
      />
      <label className={labelClassName}>{label}</label>
    </div>
  );
};

export default TextInputWithLabel;
