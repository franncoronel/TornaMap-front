import { useOutletContext } from "react-router-dom"

interface OutletContextType {
  handleOpen: (classRoomId: number) => void
}
interface TornaviasSubsueloProps {
  selectedClassRoomId?: number | null
  onClassRoomClick?: (id: number) => void
}

export default function TornaviasSubsuelo({ selectedClassRoomId, onClassRoomClick }: TornaviasSubsueloProps) {
  const context = useOutletContext<OutletContextType | null>()
  const handleOpen = context?.handleOpen || onClassRoomClick
  //
  const isSelected = (id: number) => id === selectedClassRoomId

  return (
    <>
      <svg className="svg-container" id="eBHsLTiXjpU1" xmlns="http://www.w3.org/2000/svg" viewBox="0 330 630 322" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" project-id="729e4ceae0ad41f0af0203ebbf87e174" export-id="66d7fd809be74a5a81a3926e2b015bee" >
        {/* Contorno exterior  */}
        <g>
          <path d="M2.826632,337c0,112.621305,58.627761,243.669928,216.740684,311.193148l19.308875-44.63483C83.807214,546.009954,52.979149,386.685276,52.979149,336h-50.152517" transform="translate(.000001 0)" fill="#bc793c" stroke="#bc793c" stroke-width="1.396"/>
          <path d="M212.143328,347.599413c19.099633,144.497161,213.686862,166.157509,271.658316,44.5419l141.835612,64.711542C508.108976,700.652917,101.945488,683.872221,56.067693,359.168237l156.075635-11.568824Z" transform="translate(-1.314856 0.986144)" fill="none" stroke="#d4d4d4" stroke-width="1.396"/>
        </g>
        {/* Auditorio Lectura Mundi */}
        <g  onClick={()=>handleOpen?.(0)} className={`classRoom ${isSelected(0) ? "selected" : ""}`}>
          <path d="M152.40227,386.685275l-40.706687,11.247393c4.558881,20.985764,22.054315,58.70383,35.670348,75.189049l35.962754-23.500413c-10.682006-11.39414-27.052417-44.983517-30.926415-62.936029Z" transform="translate(.000001 0.000001)" fill="#c7a67e" stroke="#c7a67e" stroke-width="1.396"/>
          <text dx="0" dy="0" font-family="&quot;eBHsLTiXjpU1:::Roboto&quot;" font-size="5" font-weight="400" transform="translate(131.444581 427.258449)" stroke-width="0">
            <tspan y="0" font-weight="700" stroke-width="0">Auditorio</tspan>
            <tspan x="0" y="5" font-weight="700" stroke-width="0">Lectura Mundi</tspan>
          </text>
        </g>
        {/* Lectura Mundi Comunicación Identidad Visual */}
        <g  onClick={()=>handleOpen?.(1)} transform="translate(.000001 0.000001)" className={`classRoom ${isSelected(1) ? "selected" : ""}`}>
          <path d="M163.777204,367.564469c3.994251,27.061452,27.310193,73.710364,47.051268,93.109102l36.751213-32.672082c-13.962233-13.477412-31.78846-47.477558-34.827329-68.698472l-48.975152,8.261452Z" transform="translate(.000003 0)" fill="#c7a67e" stroke="#c7a67e" stroke-width="1.396"/>
          <text dx="0" dy="0" font-family="&quot;eBHsLTiXjpU1:::Roboto&quot;" font-size="5" font-weight="400" transform="translate(183.328686 398.816987)" stroke-width="0">
            <tspan y="0" font-weight="700" stroke-width="0">Lectura Mundi</tspan>
            <tspan x="0" y="5" font-weight="400" stroke-width="0">Comunicación</tspan>
            <tspan x="0" y="10" font-weight="400" stroke-width="0">Identidad Visual</tspan>
          </text>
        </g>
        {/* SUM */}
        <g  onClick={()=>handleOpen?.(2)} className={`classRoom ${isSelected(2) ? "selected" : ""}`}>
          <path d="M261.614702,440.822361l-14.035014-12.820872-36.751213,32.672082c4.541811,4.585526,14.138451,12.989207,19.218025,16.782618l31.568202-36.633828Z" transform="translate(.000003 0)" fill="#bc793c" stroke="#bc793c" stroke-width="1.396"/>
          <text dx="0" dy="0" font-family="&quot;eBHsLTiXjpU1:::Roboto&quot;" font-size="5" font-weight="400" transform="translate(230.848786 454.462261)" stroke-width="0">
            <tspan y="0" font-weight="700" stroke-width="0">SUM</tspan>
          </text>
        </g>
        {/* A27 */}
        <g  onClick={()=>handleOpen?.(3)} transform="translate(.000001 0)" className={`classRoom ${isSelected(3) ? "selected" : ""}`}>
          <path d="M336.686059,520.343505c16.195183,1.879988,49.658531-.84739,66.905777-5.161917l-12.963961-47.297694c-13.12237,3.271771-38.167049,5.333673-50.052251,3.901157l-3.889565,48.558454Z" transform="translate(.000001 0)" fill="#6ba0a8" stroke="#6ba0a8" stroke-width="1.396"/>
            <text dx="0" dy="0" font-family="&quot;eBHsLTiXjpU1:::Roboto&quot;" font-size="5" font-weight="400" transform="translate(364.104813 496.914308)" stroke-width="0">
            <tspan y="0" font-weight="700" stroke-width="0">A27</tspan>
          </text>
        </g>
        {/* A26 */}
        <g  onClick={()=>handleOpen?.(4)} transform="translate(.000001 0)" className={`classRoom ${isSelected(4) ? "selected" : ""}`}>
          <path d="M390.627876,467.883894l12.963961,47.297694c17.514813-5.107595,47.937744-18.736399,60.46326-27.892047l-28.689661-39.3772c-10.428627,7.307407-32.766706,17.369936-44.737562,19.971553" transform="translate(.000003 0)" fill="#6ba0a8" stroke="#6ba0a8" stroke-width="1.396"/>
          <text dx="0" dy="0" font-family="&quot;eBHsLTiXjpU1:::Roboto&quot;" font-size="5" font-weight="400" transform="translate(419.679074 483.327865)" stroke-width="0">
            <tspan y="0" font-weight="700" stroke-width="0">A26</tspan>
          </text>
        </g>
        {/* A25 Lab. de Artes Digitales*/}
        <g  onClick={()=>handleOpen?.(5)} className={`classRoom ${isSelected(5) ? "selected" : ""}`}>
          <path d="M464.0551,487.289541c22.515861-13.872036,54.947443-50.182526,63.920489-73.397303l-45.488801-20.764782c-7.012486,17.055566-30.99735,44.06238-47.121349,54.784883L464.0551,487.289538" transform="translate(0 0.000004)" fill="#6ba0a8" stroke="#6ba0a8" stroke-width="1.396"/>
          <text dx="0" dy="0" font-family="&quot;eBHsLTiXjpU1:::Roboto&quot;" font-size="5" font-weight="400" transform="translate(467.035782 434.691608)" stroke-width="0">
            <tspan y="0" font-weight="700" stroke-width="0">A25</tspan>
            <tspan x="0" y="5" font-weight="400" stroke-width="0">Lab. de Artes</tspan>
            <tspan x="0" y="10" font-weight="400" stroke-width="0">Digitales</tspan>
          </text>
        </g>
        {/* Gerencia de Informática Soporte Técnico */}
        <g  onClick={()=>handleOpen?.(6)} transform="translate(0 0.000001)" className={`classRoom ${isSelected(6) ? "selected" : ""}`}>
          <path d="M573.606346,434.718077l-20.752469,34.760868l45.815688,31.628575c7.996447-10.747864,20.887156-32.37141,25.652834-43.268522l-50.716053-23.120921Z" transform="translate(.000001-.028904)" fill="#9699a1" stroke="#9699a1" stroke-width="1.396"/>
          <text dx="0" dy="0" font-family="&quot;eBHsLTiXjpU1:::Roboto&quot;" font-size="5" font-weight="400" transform="translate(562.197946 463.181028)" stroke-width="0">
            <tspan y="0" font-weight="700" stroke-width="0">Gerencia de Informática</tspan>
            <tspan x="0" y="5" font-weight="400" stroke-width="0">Soporte Técnico</tspan>
          </text>
        </g>
        {/* IAMK */}
        <g  onClick={()=>handleOpen?.(7)} transform="translate(0 0.000001)" className={`classRoom ${isSelected(7) ? "selected" : ""}`}>
          <path d="M552.853878,469.450041c-5.199325,6.945144-18.767134,22.428585-27.127554,30.962849l39.909481,39.322713c10.065025-9.651156,26.734904-28.9414,33.03376-38.656988l-45.815687-31.628574Z" transform="translate(.000001 0.000001)" fill="#6ba0a8" stroke="#6ba0a8" stroke-width="1.396"/>
          <text dx="0" dy="0" font-family="&quot;eBHsLTiXjpU1:::Roboto&quot;" font-size="5" font-weight="700" transform="translate(556.824887 503.371962)" stroke-width="0">
            <tspan y="0" font-weight="700" stroke-width="0">IAMK</tspan>
          </text>
        </g>
        {/* A28 */}
        <g  onClick={()=>handleOpen?.(8)} transform="translate(.000001 0)" className={`classRoom ${isSelected(8) ? "selected" : ""}`}>
          <path d="M525.726325,500.412891c-7.112962,6.961764-23.676242,20.402454-32.944045,27.063894l32.320559,44.533764c12.076082-8.271162,32.605996-24.303262,40.532965-32.274945l-39.909479-39.322713Z" transform="translate(.000002 0)" fill="#6ba0a8" stroke="#6ba0a8" stroke-width="1.396"/>
          <text dx="0" dy="0" font-family="&quot;eBHsLTiXjpU1:::Roboto&quot;" font-size="5" font-weight="400" transform="translate(522.602938 537.990165)" stroke-width="0">
            <tspan y="0" font-weight="700" stroke-width="0">A28</tspan>
          </text>
        </g>
        {/* A29 */}
        <g  onClick={()=>handleOpen?.(9)} transform="translate(.000001 0)" className={`classRoom ${isSelected(9) ? "selected" : ""}`}>
          <path d="M492.782282,527.476785c-8.507383,4.997561-26.605501,14.985215-36.198373,19.975308l23.12806,49.649023c12.979191-5.529502,35.841544-17.774334,45.390872-25.090568l-32.320559-44.533763Z" transform="translate(0 0.000001)" fill="#6ba0a8" stroke="#6ba0a8" stroke-width="1.396"/>
          <text dx="0" dy="0" font-family="&quot;eBHsLTiXjpU1:::Roboto&quot;" font-size="5" font-weight="400" transform="translate(484.370341 564.067532)" stroke-width="0">
            <tspan y="0" font-weight="700" stroke-width="0">A29</tspan>
          </text>
        </g>
        {/* IAMK Servicios */}
        <g  onClick={()=>handleOpen?.(10)} transform="translate(0 0.000001)" className={`classRoom ${isSelected(10) ? "selected" : ""}`}>
          <path d="M456.583909,547.452094c-9.774067,4.179228-29.597963,11.308888-39.669812,14.215282L430.42164,614.12842c13.015658-2.971658,37.650561-11.502414,49.290329-17.027303l-23.12806-49.649023Z" fill="#6ba0a8" stroke="#6ba0a8" stroke-width="1.396"/>
          <text dx="0" dy="0" font-family="&quot;eBHsLTiXjpU1:::Roboto&quot;" font-size="5" font-weight="400" transform="translate(438.190008 580.042774)" stroke-width="0">
            <tspan y="0" font-weight="700" stroke-width="0">IAMK</tspan>
            <tspan x="0" y="5" font-weight="400" stroke-width="0">Servicios</tspan>
          </text>
        </g>
        {/* IAMK Decanato */}
        <g  onClick={()=>handleOpen?.(11)} transform="translate(0 0.000001)" className={`classRoom ${isSelected(11) ? "selected" : ""}`}>
          <path d="M416.914097,561.667376c-11.052498,2.765574-31.966516,6.307018-42.064177,6.551575l4.119723,54.91027c13.045229-.839876,38.75822-5.389702,51.451995-9.000803l-13.507541-52.461042Z" transform="translate(.000002 0.000004)" fill="#6ba0a8" stroke="#6ba0a8" stroke-width="1.396"/>
          <text dx="0" dy="0" font-family="&quot;eBHsLTiXjpU1:::Roboto&quot;" font-size="5" font-weight="400" transform="translate(396.673075 590.013135)" stroke-width="0">
            <tspan y="0" font-weight="700" stroke-width="0">IAMK</tspan>
            <tspan x="0" y="5" font-weight="400" stroke-width="0">Decanato</tspan>
          </text>
        </g>
        {/* Baños */}
        <g transform="translate(.000001 0)">
            <path d="M374.849922,568.218955c-10.749453.78454-32.279669.999543-43.060431.435108l-4.526401,54.915969c13.249275,1.059387,39.086713.957775,51.706554-.440808l-4.119722-54.910269Z" transform="translate(.000001 0.000001)" fill="#b9bdc0" stroke="#b9bdc0" stroke-width="1.396"/>
            <text dx="0" dy="0" font-family="&quot;eBHsLTiXjpU1:::Roboto&quot;" font-size="5" font-weight="400" transform="translate(345.673075 592.013135)" stroke-width="0">
                <tspan y="0" font-weight="700" stroke-width="0">Baños</tspan>
            </text>
        </g>
</svg>

</>
  )
}

