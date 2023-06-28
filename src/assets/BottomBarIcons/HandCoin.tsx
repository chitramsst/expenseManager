import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="M23.13 9.11a2.667 2.667 0 0 0-.901-.535 2.705 2.705 0 0 0-1.042-.15 2.697 2.697 0 0 0-1.023.246c-.32.148-.608.358-.844.617l-3.404 3.663a2.786 2.786 0 0 0-1.041-1.194 2.871 2.871 0 0 0-1.537-.448H3.664a3.707 3.707 0 0 0-2.59 1.053A3.557 3.557 0 0 0 0 14.899v4.806a3.557 3.557 0 0 0 1.075 2.537 3.707 3.707 0 0 0 2.59 1.052h5.847c1.346 0 2.678-.28 3.906-.82a9.55 9.55 0 0 0 3.223-2.312l6.682-7.344a2.621 2.621 0 0 0-.194-3.708ZM3.663 12.72h9.675c.366 0 .717.143.976.396s.404.597.404.956c0 .659-.516 1.244-1.171 1.333l-6.042.711a.73.73 0 0 0-.483.266.702.702 0 0 0 .124 1.004.71.71 0 0 0 .53.14l6.055-.712h.006a2.888 2.888 0 0 0 1.404-.616 2.8 2.8 0 0 0 .875-1.24l4.374-4.714a1.222 1.222 0 0 1 .87-.396 1.27 1.27 0 0 1 .903.315 1.212 1.212 0 0 1 .178 1.618l-6.768 7.438a8.11 8.11 0 0 1-2.74 1.967 8.262 8.262 0 0 1-3.32.697H3.666a2.25 2.25 0 0 1-1.572-.639 2.158 2.158 0 0 1-.652-1.539V14.9c.001-.577.235-1.13.652-1.539a2.25 2.25 0 0 1 1.57-.639ZM9.653 9.417H7.681a2.414 2.414 0 0 1-.905-.195 2.373 2.373 0 0 1-.76-.52 2.321 2.321 0 0 1-.666-1.668c.001-.153.064-.3.174-.409a.597.597 0 0 1 .414-.17.596.596 0 0 1 .414.17.58.58 0 0 1 .174.41c-.01.312.105.615.322.844.215.23.515.365.833.378h1.97a.987.987 0 0 0 .674-.307.954.954 0 0 0 .26-.683c0-.672-.242-.804-.643-.943L6.778 5.227a1.966 1.966 0 0 1-1.096-.764 1.91 1.91 0 0 1-.341-1.277c-.01-.56.208-1.102.604-1.506.196-.2.43-.359.688-.469.26-.11.538-.17.82-.175h1.97c.313.006.621.072.908.195.286.123.545.3.76.52.439.449.678 1.048.666 1.668a.575.575 0 0 1-.363.536.597.597 0 0 1-.642-.126.575.575 0 0 1-.173-.41 1.172 1.172 0 0 0-.322-.845 1.212 1.212 0 0 0-.833-.377H7.453a.987.987 0 0 0-.673.307.956.956 0 0 0-.261.683c0 .673.243.804.644.943l3.164 1.098c.446.12.834.39 1.096.763.262.374.383.826.34 1.278a2.11 2.11 0 0 1-.606 1.502 2.176 2.176 0 0 1-1.504.646Z"
    />
    <Path
      fill={props.color}
      d="M8.555 10.453a.614.614 0 0 1-.422-.17.577.577 0 0 1-.176-.41V.58a.575.575 0 0 1 .176-.409A.61.61 0 0 1 8.555 0a.61.61 0 0 1 .422.171.575.575 0 0 1 .176.41v9.292a.577.577 0 0 1-.176.41.614.614 0 0 1-.422.17Z"
    />
  </Svg>
)
export default SvgComponent