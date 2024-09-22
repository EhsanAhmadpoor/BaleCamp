interface TextAreaWithLabelProps {
  label: string,
  placeholder: string,
  inputClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  onChange: (e: any) => void,
  value: string,
}
const TextAreaWithLabel = ({
  label,
  placeholder,
  inputClassName = '',
  labelClassName = '',
  wrapperClassName = '',
  onChange,
  value,
  ...props
}: TextAreaWithLabelProps) => {
  return (
    <div className={wrapperClassName}>
      <textarea
        className={inputClassName}
        placeholder={placeholder}
        {...props}
        onChange={onChange}
        value={value}
      />
      <label className={labelClassName}>{label}</label>
    </div>
  );
};

export default TextAreaWithLabel;
