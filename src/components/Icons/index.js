export const ToggleIcon = ({ width = '24px', height = '24px', className }) => (
  <svg
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    focusable="false"
    // style="pointer-events: none; display: block; width: 100%; height: 100%;"
    className={className}
    width={width}
    height={height}
  >
    <g className="style-scope yt-icon">
      <path
        d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"
        className="style-scope yt-icon"
      ></path>
    </g>
  </svg>
);
