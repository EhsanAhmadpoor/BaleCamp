interface SendIconProps {
  height: number;
  width: number;
  fill: string;
  onClick?: any
}

const SendIcon = ({ height, width, fill, onClick, ...props }: SendIconProps) => (
  <svg
    style={{ cursor: 'pointer' }}
    width={width}
    height={height}
    viewBox="0 0 32 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.84624 17.9982L7.86548 26.3445C7.77845 26.71 7.99864 26.925 8.09873 27.0007C8.19881 27.0764 8.46426 27.2339 8.79759 27.0538L26.2194 17.5919C26.5267 17.4239 26.5606 17.1341 26.5606 17.0192C26.5623 16.9061 26.5258 16.6241 26.2299 16.4587L8.83919 6.94605C8.50934 6.76589 8.23955 6.92429 8.13946 7C8.03764 7.07746 7.81223 7.29591 7.89578 7.66318L9.85232 16.1522L19.1299 16.1036C19.639 16.101 20.055 16.5118 20.0585 17.0218C20.062 17.5318 19.6495 17.9478 19.1403 17.9504L9.84624 17.9982ZM6.72016 28.2435C6.11442 27.6377 5.86724 26.7744 6.06915 25.918L8.17001 17.0687L6.09772 8.07743C5.87491 7.1079 6.22825 6.13141 7.02371 5.52916C7.8183 4.92604 8.8531 4.85033 9.72429 5.3264L27.115 14.8391C27.9148 15.2769 28.4065 16.1115 28.4083 17.0218C28.4057 17.9365 27.9053 18.7764 27.0994 19.2133L9.67836 28.6743C8.80283 29.1512 7.76802 29.072 6.97777 28.468C6.88552 28.3967 6.80023 28.3235 6.72016 28.2435Z"
      fill={fill}
    />
  </svg>
);

export default SendIcon;
