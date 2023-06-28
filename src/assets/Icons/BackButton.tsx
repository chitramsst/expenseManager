import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props : any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.744 16.532 1 8.766 8.744 1"
    />
  </Svg>
)
export default SvgComponent
