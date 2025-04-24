import { mapColors } from '../../../pages/map/mapColors'

interface AularioNave3PlantaAltaProps {
  selectedCode?: string // Cambiado de selectedClassRoomId
  onClassRoomClick?: (id: number) => void
  handleOpen?: (classRoomId: string) => void
}

export default function AularioNave3PlantaAlta({
  selectedCode,
  handleOpen
}: AularioNave3PlantaAltaProps) {
const isSelected = (id: string) => id === selectedCode

  return (
    <>
      <svg
        id="eDZ35ixfFPu1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1143 285"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        project-id="d87729293d7245d7a2ad59fd17b8e765"
        export-id="a68713931cef473b941afaac88f25546"
      >
        {/* Contorno exterior  */}
        <g
          style={{fill: mapColors.outline.fill,
                  stroke: mapColors.outline.stroke,
                  strokeWidth: mapColors.outline.strokeWidth}}>
          <path d="M80.277592,39.238169h985.311873l-.000001,189.225753h-985.311872v-189.225753Z" transform="translate(.000004 0.000003)"/>
          {/* <path d="M440.63488,177.72591h92.96v23.10139h-92.96v-23.10139Zm-27.90648,0v-16.26338h27.90648l.00001,8.24999-.00001,8.01339h-27.90648Z"/> */}
        </g>
        
        <g  transform="matrix(-1 0 0 1 946.071006-.083143)"
            style={{fill: mapColors.arrow.fill,
                    stroke: mapColors.arrow.stroke,
                    strokeWidth: mapColors.arrow.strokeWidth,}}>
	        <g transform="matrix(.533707 0 0 0.523591 451.40865 177.13594)">
            <line x1="50.06" y1="77.95" x2="50.06" y2="47.3" transform="matrix(-1 0 0-1 0 0)" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="37.76,60.46 50.06,45.74 62.36,60.46" transform="matrix(-1 0 0-1 0 0)" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          {/* Escaleras */}
          <g
            style={{
              fill: mapColors.outline.fill,
              stroke: mapColors.outline.stroke,
              strokeWidth: mapColors.outline.strokeWidth}}>
            <path d="M440.63488,177.72591h92.96v23.10139h-92.96v-23.10139Zm-27.90648,0v-16.26338h27.90648l.00001,8.24999-.00001,8.01339h-27.90648Z"/>
          </g>
          <g style={{
              fill: mapColors.ladder.fill,
              stroke: mapColors.ladder.stroke,
              strokeWidth: mapColors.ladder.strokeWidth}}>
            <path d="M448.482723,177.72591v23.10139"/>
            <path d="M456.44605,177.72591l.144788,23.10139"/>
            <path d="M463.928088,177.72591v23.10139" transform="translate(.000001 0)"/>
            <path d="M463.928088,177.72591v23.10139" transform="translate(14.557917 0)"/>
            <path d="M463.928088,177.72591v23.10139" transform="translate(37.44266 0)"/>
            <path d="M463.928088,177.72591v23.10139" transform="translate(60.739404 0)"/>
            <path d="M448.482723,177.72591v23.10139" transform="translate(61.450076 0)"/>
            <path d="M463.928088,177.72591v23.10139" transform="translate(52.476029 0)"/>
            <path d="M463.928088,177.72591v23.10139" transform="translate(30.750273 0)"/>
            <path d="M448.482723,177.72591v23.10139" transform="translate(23.137556 0)"/>
            <path d="M463.928088,177.72591v23.10139" transform="translate(22.733956 0)"/>
            <path d="M412.7284,169.71252h27.90649"/>
          </g>
      </g>

        {/* A20 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A20')}
          className={`classRoom ${isSelected('A20') ? 'selected' : ''}`}
        >
          <path
            d="M80.277596,39.238172h244.655514v189.225753h-244.655514Z"
            transform="translate(0 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="25"
            fontWeight="400"
            transform="translate(165 135)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A20
            </tspan>
          </text>
        </g>

        {/* A19 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A19')}
          className={`classRoom ${isSelected('A19') ? 'selected' : ''}`}
        >
          <path
            d="M571.5,87.978136h166.289298v140.485784h-166.289298v-140.485784Z"
            transform="translate(0 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="25"
            fontWeight="400"
            transform="translate(635 165)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A19
            </tspan>
          </text>
        </g>
        {/* A18 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A18')}
          className={`classRoom ${isSelected('A18') ? 'selected' : ''}`}
        >
          <path
            d="M737.789297,39.238172h327.800168v189.225749l-327.800168-.428984v-188.796765Z"
            transform="translate(.000001 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="25"
            fontWeight="400"
            transform="translate(895 140)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A18
            </tspan>
          </text>
        </g>
      </svg>
    </>
  )
}
