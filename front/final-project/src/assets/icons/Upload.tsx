interface UploadIconProps {
  height: number;
  width: number;
  fill: string;
}

const UploadIcon = ({ height, width, fill, ...props }: UploadIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: 'pointer' }}
    {...props}
  >
    <mask id="mask0" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="2" y="9" width="20" height="15">
      <path fillRule="evenodd" clipRule="evenodd" d="M2 9.29297H21.9996V23.037H2V9.29297Z" fill="white" />
    </mask>
    <g mask="url(#mask0)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.565 23.037H6.435C3.99 23.037 2 21.048 2 18.602V13.727C2 11.282 3.99 9.29297 6.435 9.29297H7.368C7.782 9.29297 8.118 9.62897 8.118 10.043C8.118 10.457 7.782 10.793 7.368 10.793H6.435C4.816 10.793 3.5 12.109 3.5 13.727V18.602C3.5 20.221 4.816 21.537 6.435 21.537H17.565C19.183 21.537 20.5 20.221 20.5 18.602V13.718C20.5 12.105 19.188 10.793 17.576 10.793H16.633C16.219 10.793 15.883 10.457 15.883 10.043C15.883 9.62897 16.219 9.29297 16.633 9.29297H17.576C20.015 9.29297 22 11.278 22 13.718V18.602C22 21.048 20.01 23.037 17.565 23.037Z"
        fill={fill}
      />
    </g>
    <mask id="mask1" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="11" y="2" width="2" height="15">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.25 2.5H12.75V16.0409H11.25V2.5Z" fill="white" />
    </mask>
    <g mask="url(#mask1)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 16.041C11.586 16.041 11.25 15.705 11.25 15.291V3.25C11.25 2.836 11.586 2.5 12 2.5C12.414 2.5 12.75 2.836 12.75 3.25V15.291C12.75 15.705 12.414 16.041 12 16.041Z"
        fill={fill}
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.08569 6.92706C8.89469 6.92706 8.70269 6.85406 8.55669 6.70806C8.26369 6.41606 8.26169 5.94206 8.55469 5.64806L11.4697 2.72006C11.7507 2.43706 12.2507 2.43706 12.5317 2.72006L15.4477 5.64806C15.7397 5.94206 15.7387 6.41606 15.4457 6.70806C15.1517 7.00006 14.6777 7.00006 14.3857 6.70606L12.0007 4.31206L9.61669 6.70606C9.47069 6.85406 9.27769 6.92706 9.08569 6.92706Z"
      fill={fill}
    />
  </svg>
);

export default UploadIcon;
