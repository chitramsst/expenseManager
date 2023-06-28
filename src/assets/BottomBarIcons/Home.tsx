import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="M19.04 4.82 13.28.79C11.71-.31 9.3-.25 7.79.92L2.78 4.83C1.78 5.61.99 7.21.99 8.47v6.9C.99 17.92 3.06 20 5.61 20h10.78c2.55 0 4.62-2.07 4.62-4.62V8.6c0-1.35-.87-3.01-1.97-3.78ZM11.75 16c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3c0-.41.34-.75.75-.75s.75.34.75.75v3Z"
    />
  </Svg>
)
export default SvgComponent
