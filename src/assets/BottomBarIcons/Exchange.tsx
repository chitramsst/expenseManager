import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props : any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="M14.11 17.61a.74.74 0 0 1-.53-.22.755.755 0 0 1 0-1.06l3.04-3.039a.75.75 0 0 1 1.06 1.06l-3.04 3.04a.746.746 0 0 1-.53.219Z"
    />
    <Path
      fill={props.color}
      d="M17.15 14.57H6.84a.755.755 0 0 1-.75-.75.755.755 0 0 1 .75-.75h10.31a.75.75 0 1 1 0 1.5ZM6.85 10.93a.742.742 0 0 1-.53-.22.754.754 0 0 1 0-1.06l3.04-3.04a.75.75 0 0 1 1.06 1.06l-3.04 3.04a.743.743 0 0 1-.53.22Z"
    />
    <Path
      fill={props.color}
      d="M17.15 10.93H6.84a.755.755 0 0 1-.75-.75.755.755 0 0 1 .75-.75h10.31a.75.75 0 1 1 0 1.5Z"
    />
    <Path
      fill={props.color}
      d="M12 22.75A10.75 10.75 0 1 1 22.75 12 10.759 10.759 0 0 1 12 22.75Zm0-20A9.25 9.25 0 1 0 21.25 12 9.26 9.26 0 0 0 12 2.75Z"
    />
  </Svg>
)
export default SvgComponent