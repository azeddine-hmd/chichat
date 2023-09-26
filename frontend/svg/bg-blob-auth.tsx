import React from "react";

export type AuthBlobSvgProps = {
  children?: React.ReactNode;
} & React.ComponentProps<"svg">;

export default function AuthBlobSvg({ ...restProps }: AuthBlobSvgProps) {
  return (
    <svg
      id="visual"
      viewBox="0 0 900 900"
      width="900"
      height="900"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      {...restProps}
    >
      <rect x="0" y="0" width="900" height="900" fill="#081927"></rect>
      <defs>
        <linearGradient id="grad1_0" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="30%" stop-color="#081927" stop-opacity="1"></stop>
          <stop offset="70%" stop-color="#081927" stop-opacity="1"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="grad2_0" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="30%" stop-color="#081927" stop-opacity="1"></stop>
          <stop offset="70%" stop-color="#081927" stop-opacity="1"></stop>
        </linearGradient>
      </defs>
      <g transform="translate(900, 0)">
        <path
          d="M0 572.8C-65.9 536.2 -131.8 499.7 -194.4 469.3C-257 439 -316.4 414.9 -376.2 376.2C-436 337.5 -496.3 284.3 -529.2 219.2C-562 154.1 -567.4 77 -572.8 0L0 0Z"
          fill="#cc5500"
        ></path>
      </g>
      <g transform="translate(0, 900)">
        <path
          d="M0 -572.8C62.9 -532.9 125.7 -493 194 -468.4C262.3 -443.8 336.1 -434.4 396 -396C455.9 -357.5 502 -290 529.2 -219.2C556.3 -148.3 564.5 -74.2 572.8 0L0 0Z"
          fill="#cc5500"
        ></path>
      </g>
    </svg>
  );
}
