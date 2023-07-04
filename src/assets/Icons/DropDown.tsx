import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#9DB2CE"
      d="M14.187 6.976H4.813a.853.853 0 0 0-.601 1.456l4.101 4.101a1.687 1.687 0 0 0 2.383 0l1.56-1.56 2.541-2.54a.858.858 0 0 0-.61-1.457Z"
    />
  </Svg>
)
export default SvgComponent
