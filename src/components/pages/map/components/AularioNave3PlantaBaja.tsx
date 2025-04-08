import { Toilet } from "@phosphor-icons/react"
import { useOutletContext } from "react-router-dom"
import { mapColors } from "../mapColors"

interface OutletContextType {
  handleOpen: (classRoomId: number) => void
}
interface AularioNaveProps {
  selectedClassRoomId?: number | null
  onClassRoomClick?: (id: number) => void
}

export default function AularioNave3PlantaBaja({ selectedClassRoomId, onClassRoomClick }: AularioNaveProps) {
    const context = useOutletContext<OutletContextType | null>()
    const handleOpen = context?.handleOpen || onClassRoomClick
    //
    const isSelected = (id: number) => id === selectedClassRoomId

  return(
    <>
      <svg  className="svg-container"
            id="eDZ35ixfFPu1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1143 285"
            shape-rendering="geometricPrecision" 
            text-rendering="geometricPrecision" 
            project-id="d87729293d7245d7a2ad59fd17b8e765" 
            export-id="a68713931cef473b941afaac88f25546"
          >
        {/* Contorno exterior  */}
        <g style={{fill: mapColors.outline.fill, stroke: mapColors.outline.stroke, strokeWidth: mapColors.outline.strokeWidth}}>
          <path d="M80.277592,39.238169h985.311873l-.000001,189.225753h-985.311872v-189.225753Z" transform="translate(.000004 0.000003)" />
        </g>
        {/* A17 */}
        <g  style={{fill: mapColors.classrooms.fill, stroke: mapColors.classrooms.stroke, strokeWidth: mapColors.classrooms.strokeWidth}}
            onClick={()=>handleOpen?.(0)} transform="translate(.000001 0)" className={`classRoom ${isSelected(3) ? "selected" : ""}`}>
          <path d="M80.277596,39.238172h244.655514l.16554,42.911613h-28.836108v101.936404h28.670568v43.948748l-244.655514.428984v-189.225749Z" transform="translate(0 0.000001)"/>
          <text dx="0" dy="0" font-family="&quot;eBHsLTiXjpU1:::Roboto&quot;" font-size="25" font-weight="400" 
                  transform="translate(165 135)"
                  stroke-width="0">
            <tspan y="0" font-weight="700" stroke-width="0">A17</tspan>
          </text>
        </g>
        {/* A16 */}
        <g  style={{fill: mapColors.classrooms.fill, stroke: mapColors.classrooms.stroke, strokeWidth: mapColors.classrooms.strokeWidth}}
            onClick={()=>handleOpen?.(1)} transform="translate(.000001 0)" className={`classRoom ${isSelected(1) ? "selected" : ""}`}>
          <path d="M571.5,87.978136h166.289298v140.485784h-166.289298v-140.485784Z" transform="translate(0 0.000002)"/>
          <text dx="0" dy="0" font-family="&quot;eBHsLTiXjpU1:::Roboto&quot;" font-size="25" font-weight="400" 
                  transform="translate(635 165)"
                  stroke-width="0">
            <tspan y="0" font-weight="700" stroke-width="0">A16</tspan>
          </text>
        </g>
        {/* A15 */}
        <g  style={{fill: mapColors.classrooms.fill, stroke: mapColors.classrooms.stroke, strokeWidth: mapColors.classrooms.strokeWidth}}
            onClick={()=>handleOpen?.(2)} transform="translate(.000001 0)" className={`classRoom ${isSelected(2) ? "selected" : ""}`}>
          <path d="M737.789297,39.238172h327.800168v189.225749l-327.800168-.428984v-188.796765Z" transform="translate(.000001 0.000001)"/>
          <text dx="0" dy="0" font-family="&quot;eBHsLTiXjpU1:::Roboto&quot;" font-size="25" font-weight="400" 
                    transform="translate(895 140)"
                    stroke-width="0">
              <tspan y="0" font-weight="700" stroke-width="0">A15</tspan>
          </text>
        </g>
        {/* Baños */}
        <g style={{fill: mapColors.banios.fill, stroke: mapColors.banios.stroke, strokeWidth: mapColors.banios.strokeWidth}}>
          <path d="M296.26254,82.149783h53.518396v101.936404h-53.518396v-101.936404Z" transform="translate(.000002 0.000003)" />
          <text dx="0" dy="0" font-family="&quot;eBHsLTiXjpU1:::Roboto&quot;" font-size="25" font-weight="400" 
                  transform="translate(300 109)"
                  stroke-width="0">
                <tspan x='0' y="0" font-weight="700" stroke-width="0">B</tspan>
                <tspan x='0' y="16" font-weight="700" stroke-width="0">a</tspan>
                <tspan x='0' y="36" font-weight="700" stroke-width="0">ñ</tspan>
                <tspan x='0' y="52" font-weight="700" stroke-width="0">o</tspan>
                <tspan x='0' y="68" font-weight="700" stroke-width="0">s</tspan>
            </text>
            <Toilet
              transform="translate(315 115)"
              className="icon-common"
              size={30} 
            />
        </g>
    </svg>
    </>
  )
}