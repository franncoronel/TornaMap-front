import { Toilet } from '@phosphor-icons/react'
import { mapColors } from '../../../pages/map/mapColors'

interface ITSPbProps {
  selectedCode?: string // Cambiado de selectedClassRoomId
  onClassRoomClick?: (id: string) => void
  handleOpen?: (classRoomId: string) => void
}

export default function ITSPb({selectedCode,handleOpen}: ITSPbProps) {
  const isSelected = (id: string) => id === selectedCode

  return (
    <>
      <svg id="ewPY0fJzILd1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-220 -25 1000 360" 
      shape-rendering="geometricPrecision" 
      text-rendering="geometricPrecision" 
      project-id="dad7e7c888d34c45a454bf474854790e" 
      export-id="52140fb7d2a347c89e550d96a567ee8c">
        
        {/* Contorno */}
        <g transform="matrix(0 -1 1 0 0 330)" style={{fill: mapColors.outline.fill,stroke: mapColors.outline.stroke,strokeWidth: mapColors.outline.strokeWidth}}>
          <path d="M154.233595,599.999998L483.432776,600v-600.000001l-329.101765-.000001-.097416,600Z" 
          transform="translate(-154.233595 0.000002)"/>
          <path d="M340.433574,568.991416l-147.755505-.487642.000001-43.862576h147.755504l-.000011,23.999976" transform="translate(-154.233597 0)"/>
          <path d="M261.423148,470.172174h79.010426v54.469024l-79.010426-54.469024Z" transform="translate(-154.233597 0)"/>
          <path d="M192.678069,599.119376q0,.622125,0-30.615602" transform="matrix(1 0 0 1.057527 -154.233596 -33.584928)"/>
          <path d="M261.99868,600v-31.008584" transform="translate(-154.233597 0)"/>
        </g>

        {/* Escaleras */}
        <g transform="matrix(0 -1 1 0 0 330)">
          <g transform="translate(-401.965163 367.676473)">
            <g style={{ fill: mapColors.arrow.fill, stroke: mapColors.arrow.stroke, strokeWidth: mapColors.arrow.strokeWidth }} 
                transform="matrix(0.005617 0.533677 -0.523562 0.005511 515.835627 216.333313)">
              <line x1="50.06" y1="77.95" x2="50.06" y2="47.3" transform="matrix(-1 0 0 -1 0 0)" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="37.76,60.46 50.06,45.74 62.36,60.46" transform="matrix(-1 0 0 -1 0 0)" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <g style={{ fill: mapColors.arrow.fill, stroke: mapColors.arrow.stroke, strokeWidth: mapColors.arrow.strokeWidth }} 
                transform="matrix(0 -0.533707 0.523591 0 460.578022 -371.718216)">
              <line x1="50.06" y1="77.95" x2="50.06" y2="47.3" transform="matrix(-1 0 0 -1 0 0)" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="37.76,60.46 50.06,45.74 62.36,60.46" transform="matrix(-1 0 0 -1 0 0)" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <g style={{fill: mapColors.outline.fill, stroke: mapColors.outline.stroke, strokeWidth: mapColors.outline.strokeWidth }}>
                <path d="M448.482723,177.72591v23.10139" />
                <path d="M456.44605,177.72591l.144788,23.10139"/>
                <path d="M463.928088,177.72591v23.10139" transform="translate(0.000001 0)"/>
                <path d="M463.928088,177.72591v23.10139" transform="translate(14.557917 0)"/>
                <path d="M463.928088,177.72591v23.10139" transform="translate(37.44266 0)"/>
                <path d="M463.928088,177.72591v23.10139" transform="translate(60.739404 0)"/>
                <path d="M448.482723,177.72591v23.10139" transform="translate(61.450076 0)"/>
                <path d="M463.928088,177.72591v23.10139" transform="translate(52.476029 0)"/>
                <path d="M463.928088,177.72591v23.10139" transform="translate(30.750273 0)"/>
                <path d="M448.482723,177.72591v23.10139" transform="translate(23.137556 0)"/>
                <path d="M463.928088,177.72591v23.10139" transform="translate(22.733956 0)"/>
                <path d="M0.000001,217.677776h45.351255" transform="matrix(0 1 -1 0 697.967776 -367.676473)"/>
                <path d="M0.000001,217.677776h45.351255" transform="matrix(0 1 -1 0 667.967776 -367.676473)"/>
                <path d="M0.000001,217.677776h45.351255" transform="matrix(0 1 -1 0 677.827776 -367.676473)"/>
                <path d="M0.000001,217.677776h45.351255" transform="matrix(0 1 -1 0 687.827776 -367.676473)"/>
                <path d="M0.000001,217.677776h45.351255" transform="matrix(0 1 -1 0 707.827776 -367.676473)"/>
                <path d="M0.000001,217.677776h45.351255" transform="matrix(0 1 -1 0 717.827776 -367.676473)"/>
                <path d="M0.000001,217.677776h45.351255" transform="matrix(0 1 -1 0 727.827776 -367.676473)"/>
            </g>

            <g style={{fill: mapColors.outline.fill,stroke: mapColors.outline.stroke,strokeWidth: mapColors.outline.strokeWidth}}>
              <path d="M440.63488,177.72591h92.96v23.10139h-92.96v-23.10139Zm.00001,0" />
              <path d="M0,210.719824h45.351256v77.055034h-45.351255L0,210.719824Z" transform="matrix(0 -1 1 0 231.472659 -322.325217)"/>
            </g>
            
          </g>
        </g> 
        <g transform="matrix(0-1 1 0 0 330)" style={{fill: mapColors.classRooms.fill,stroke: mapColors.classRooms.stroke,strokeWidth: mapColors.classRooms.strokeWidth}}>
          <g>
            <path d="M421.248955,600.000002v-54.109977l62.183823-.000001-.000003,54.109977-62.18382.000001Z" transform="translate(-154.233593 0.000001)"/>
            <path d="M483.432781,545.890025l-81.121806.000001v-83.896968l81.121801-.259134.000005,84.156101Z" transform="translate(-154.233597 0)" />
          </g>
          <g>
            <path d="M483.432776,383.896967v77.836957l-56.440512.259133v-78.096091l56.440512.000001Z" transform="translate(-154.233597 0.000003)" />
          </g>
          <g style={{fill: mapColors.banios.fill,  stroke: mapColors.banios.stroke, strokeWidth: mapColors.banios.strokeWidth }}>
            <path d="M484.395997,222.163048L483.432781,300h-67.885864l-.000001-77.836951l68.849081-.000001Z" transform="matrix(0.831403 0 0 1.234108 -72.728285 -154.276255)"/>
            <text transform="translate(310 150) rotate(90)" dx="0" dy="0" fontFamily='"eBHsLTiXjpU1:::Roboto"' fontSize="12" fontWeight="400" strokeWidth="0" >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                Baños 
              </tspan>
            </text>
            <Toilet className="icon-common" x="0" y="0" transform="translate(305 155) rotate(90)" size={25} />
          </g>
          <g>
            <path d="M484.395997,222.163048L483.432781,300h-67.885864l-.000001-77.836951l68.849081-.000001Z" transform="matrix(0 0.703167 -1.995567 0 772.540427 -292.198878)"/>
            
          </g>
          {/*.......................................................:Aulas:...........................................................*/}
          {/* Aula 1*/}
          <g onClick={() => handleOpen?.('A1')}
            className={`classRoom ${isSelected('A1') ? 'selected' : ''}`}>
            <path d="M154.773811,447.647782v76.993416h107.493282v-76.993416h-107.493282Z" transform="matrix(0.98668 0 0 1.335732 -152.616153 -484.823892)"/>
            <text dx="0" dy="0" fontFamily='"eBHsLTiXjpU1:::Roboto"' fontSize="12" fontWeight="400" strokeWidth="0"
                  transform="translate(50 160) rotate(90)" >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                A1
              </tspan>
            </text>
          </g>
          {/* Aula 2*/}
          <g onClick={() => handleOpen?.('A2')}
            className={`classRoom ${isSelected('A2') ? 'selected' : ''}`}>
            <path d="M154.773811,447.647782v76.993416h107.493282v-76.993416h-107.493282Z" transform="matrix(0.984893 0 0 1.335732 -152.339548 -381.981322)"/>
            <text dx="0" dy="0" fontFamily='"eBHsLTiXjpU1:::Roboto"' fontSize="12" fontWeight="400" strokeWidth="0"
                  transform="translate(50 260) rotate(90)" >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                A2
              </tspan>
            </text>
          </g>
          {/* Aula 3*/}
          <g onClick={() => handleOpen?.('A3')}
            className={`classRoom ${isSelected('A3') ? 'selected' : ''}`}>
            <path d="M154.773811,447.647782v76.993416h107.493282v-76.993416h-107.493282Z" transform="matrix(0.984881 0 0 1.335732 -152.336401 -279.138752)"/>
            <text dx="0" dy="0" fontFamily='"eBHsLTiXjpU1:::Roboto"' fontSize="12" fontWeight="400" strokeWidth="0"
                  transform="translate(50 365) rotate(90)" >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                A3
              </tspan>
            </text>
          </g>
          {/* Aula 4*/}
          <g onClick={() => handleOpen?.('A4')}
            className={`classRoom ${isSelected('A4') ? 'selected' : ''}`}>
            <path d="M154.428424,447.647782l.000001,76.993416h106.484852l1.008429-76.993416h-107.493282Z" transform="matrix(0.986682 0 0 1.339819 -152.371803 -178.125711)"/>
            <text dx="0" dy="0" fontFamily='"eBHsLTiXjpU1:::Roboto"' fontSize="12" fontWeight="400" strokeWidth="0"
                  transform="translate(50 465) rotate(90)" >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                A4
              </tspan>
            </text>
          </g>

          {/* Este es el Lab */}
          {/* <g onClick={() => handleOpen?.('LabLCD')}
            className={`classRoom ${isSelected('LabLCD') ? 'selected' : ''}`}>
            <path d="M154.428427,447.647782h107.493281l-.000001-76.993606h-107.590697l.097417,76.993606Z" transform="translate(-154.233595 0)"/>
            <text dx="0" dy="0" fontFamily='"eBHsLTiXjpU1:::Roboto"' fontSize="12" fontWeight="400" strokeWidth="0"
                  transform="translate(50 400) rotate(90)" >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                LAB
              </tspan>
            </text>
          </g>
          <g>
            <path d="M154.428429,370.654176h107.493279l.000001-76.993606h-107.493281l.000001,76.993606Z" transform="translate(-154.233594 0)"/>
          </g> */}
        </g>
        {/* Flechas de los accesos */}
        <g transform="matrix(0 -1 1 0 0 330)" style={{ fill: mapColors.entry.fill }}>
          <polygon points="50,23.15 19,76.85 81,76.85 50,23.15" transform="matrix(0-.142567 0.140807 0 96.867093 593.733797)"/>
          <polygon points="50,23.15 19,76.85 81,76.85 50,23.15" transform="matrix(0 0.142567-.140807 0 118.586101 579.432577)"/>
          <polygon points="50,23.15 19,76.85 81,76.85 50,23.15" transform="matrix(0-.142567 0.140807 0 27.623455 593.325667)"/>
          <polygon points="50,23.15 19,76.85 81,76.85 50,23.15" transform="matrix(0 0.142567-.140807 0 49.265492 579.068967)"/> 
          <polygon points="50,23.15 19,76.85 81,76.85 50,23.15" transform="matrix(0.001787 0.142556 -0.140796 0.001765 10.67596 80.26901)"/>
          <polygon points="50,23.15 19,76.85 81,76.85 50,23.15" transform="matrix(0 0.142567 -0.140807 0 10.820961 11.127701)"/>
          <polygon points="50,23.15 19,76.85 81,76.85 50,23.15" transform="matrix(0 -0.142567 0.140807 0 -10.723633 25.384403)"/>
          <polygon points="50,23.15 19,76.85 81,76.85 50,23.15" transform="matrix(0 -0.142567 0.140807 0 -10.723633 94.660436)"/>
          <polygon points="50,23.15 19,76.85 81,76.85 50,23.15" transform="matrix(0 -0.142567 0.140807 0 -10.723633 58.429756)"/>
          <polygon points="50,23.15 19,76.85 81,76.85 50,23.15" transform="matrix(0 0.142567 -0.140807 0 10.820961 44.173056)"/>
          {/* <polygon points="50,23.15 19,76.85 81,76.85 50,23.15" transform="matrix(.193062 0 0 0.168-3.57216 586.961002)"/> */}
        </g>
      </svg>
    </>
  )
}
