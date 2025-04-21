import { BookOpenText, ForkKnife, Toilet } from '@phosphor-icons/react'
import { mapColors } from '../../../pages/map/mapColors'

interface TornaviasPrimerPisoProps {
  selectedCode?: string // Cambiado de selectedClassRoomId
  handleOpen?: (classRoomId: string) => void
}

export default function TornaviasPrimerPiso({
  selectedCode,
  handleOpen
}: TornaviasPrimerPisoProps) {
  const isSelected = (id: string) => id === selectedCode
  return (
    <>
      <svg
        id="eWvducpgXKQ1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 850 800"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        project-id="b2e3d31046794ea2a90eb59f13873c7a"
        export-id="bd7be5b03b65429194caf099cb167c77"
      >
        {/* Patrón de rayas diagonales */}
        <defs>
          <pattern
            id="hatchingPattern"
            patternUnits="userSpaceOnUse"
            width="10"
            height="10"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="10"
              y2="10"
              stroke="#e6bfbb"
              strokeWidth="1"
            />
            {/* #87453f*/}
          </pattern>
        </defs>
        {/* Contorno */}
        <g
          style={{
            fill: mapColors.outline.fill,
            stroke: mapColors.outline.stroke,
            strokeWidth: mapColors.outline.strokeWidth
          }}
        >
          <path
            d="M396.829917,614.92423c0,0-14.867033,64.188274-21.238619,91.697534-3.580063,15.456841-11.933544,51.522803-11.933544,51.522803-28.964337-6.140095-82.31983-27.562188-106.809472-42.666913-26.600141-15.199386-70.681824-49.664577-86.643898-70.86425-20.136756-21.900868-52.049481-70.019608-63.045049-98.677064C85.25702,507.958122,66.010372,409.955802,82.944596,328.307947l2.105478-8.405282l53.57151,11.607649c1.389167-9.523937,8.602153-32.103365,13.451975-45.158856c8.923457-32.032526,51.1981-91.541792,85.193173-122.186849l-35.769027-40.49637c21.186644-20.665354,69.021157-51.252118,96.416456-60.806654c23.016291-12.484351,79.696672-29.455153,122.585834-30.022393c41.957287-1.176605,116.732672,4.840602,158.904078,25.396283L559.463738,107.84161c30.170064,7.618143,71.084436,33.401963,86.033122,50.038777l33.55101-40.111145c29.387105,23.043235,68.476915,69.731389,80.383403,92.120741c18.36302,32.324188,34.212574,69.510625,39.824804,96.908986c9.081352,24.035732,12.908336,80.201638,11.57922,116.735593-.202681,30.190628-12.836945,85.647264-24.84149,111.115555-11.022003,28.370719-39.351275,77.713525-58.271426,97.836726-17.409196,23.725514-60.795601,62.016459-86.353772,77.259359-23.490553,16.753179-75.932137,38.860435-104.668743,44.786317l-13.713122-51.841968-23.800365-89.976504c-26.100282,9.731242-76.664525,8.52234-102.356462,2.210183Z"
            transform="translate(.000011 0.000001)"
          />
          <path
            d="M631.655112,283.679156c-19.102063-25.333791-46.320699-52.366454-46.164609-52.448145c0,0,23.521743-28.528336,23.521743-28.528336c18.225193,15.391183,46.569238,47.811133,55.034946,64.190475c0,0-32.39208,16.786006-32.39208,16.786006s15.315231,30.429611,15.315231,30.429611l34.23948-14.591046c3.913475,7.98412,10.107251,26.226765,12.876095,36.403866c2.312455,8.86901,5.477269,29.514639,6.84849,41.291258.648993,8.977988.759868,28.330391.411433,38.704806-.872037,10.250756-3.335188,30.702408-5.547838,39.752742l-37.095106-7.419022-9.769979,33.473708l33.727642,13.530853c-6.704074,18.171187-26.107651,52.128048-40.462272,67.913721l-7.256771-6.185133-28.450627,28.45947l6.562816,7.791726c-12.786499,12.060943-45.713587,33.140804-65.911392,42.136836c0,0-14.421822-33.78161-14.421822-33.78161s-33.534103,11.123105-33.534103,11.123105c-23.928707,9.387554-75.081151,8.997068-102.356461,2.210185-7.790292-1.544133-23.753392-6.821714-32.453493-10.159692l-14.128079,33.696037c-17.95772-6.65965-51.216028-26.439385-67.475059-38.701916-16.378974-14.084519-43.511709-43.700426-53.624118-59.672742l30.232523-20.896325c-4.904615-7.744676-13.602768-23.881241-17.463789-32.335739l-33.635826,14.863117c-3.316813-9.145774-9.298505-27.364813-12.725861-36.438077l35.686352-10.19891c-7.607284-22.502941-7.403929-74.311479-1.723614-103.075089c1.516114-7.874777,6.378137-23.927286,9.701752-32.102232c9.164969-24.476401,35.731406-66.846001,59.228117-84.167773c5.531593-4.8325,20.448723-15.706636,28.81481-21.748273l-19.620734-32.235832c23.010679-15.780387,77.538992-37.933315,128.430264-39.554711c28.104097.107689,80.525844,7.900073,102.253293,18.440559l21.137283-52.795025"
            transform="translate(0 0.000002)"
          />
          <path
            d="M375.591312,706.621769c67.29872,7.187468,117.11822,4.566857,147.395443-3.931216"
            transform="translate(.000001 0.000001)"
          />
          <ellipse
            rx="84.1"
            ry="77.1"
            transform="matrix(2.279425-.716586 0.775485 2.466781 444.895709 400.053565)"
          />
          <path
            d="M609.012246,202.702677l36.484625-44.822289"
            transform="translate(.000001 0)"
          />
          {/*Para indicar que no se puede pasar por esta zona  */}
          <path
            d="M85.050085,319.902668l53.571511,11.607648c10.52665-52.396156,37.616555-108.857236,98.645146-167.345706l-35.769028-40.496369-14.676226,13.232541l16.112415,16.561544-16.112416,16.592353-16.617096-15.443376c-4.886163,5.247362-16.365048,18.921596-22.654159,27.139485l17.890232,13.531262-13.704898,18.70457-17.883251-12.657874c-4.931415,5.166215-13.688972,21.432912-18.263729,31.535237l20.585652,10.382918-9.608468,20.734062-20.986916-9.370447c-6.720167,13.162541-15.870817,45.700736-20.528769,65.292152Z"
            transform="translate(.000015 0)"
            fill="url(#hatchingPattern)"
            stroke="#d4d4d4"
            strokeWidth="1.396"
          />
        </g>
        {/* Biblioteca */}
        <g
          style={{
            fill: mapColors.library.fill,
            stroke: mapColors.library.stroke,
            strokeWidth: mapColors.library.strokeWidth
          }}
        >
          <path
            d="M186.821487,136.90078c45.607922-42.394288,62.635392-48.220377,86.431474-63.427951L243.726743,17.521958C89.993867,93.325833,23.699056,265.91059,21.799023,316.239435q-.007861.208217,60.912941,12.068518c5.536115-22.277901,15.563544-59.41054,22.866899-73.697439l-10.619884-4.7894l10.619884-21.745478l10.009729,4.788345c3.863418-8.465639,11.664015-23.658262,18.263728-31.535237l-10.610464-6.99326l13.98652-19.693663c7.009059,5.088575,10.731641,7.325542,10.321858,7.108965s6.577153-8.682356,22.57307-27.139485l-8.422931-8.408499l16.405604-17.461289l8.71551,8.159267Z"
            transform="translate(.000004 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            strokeWidth="0"
            transform="translate(86 170)"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Biblioteca
            </tspan>
            <tspan x="0" y="12" fontWeight="700" strokeWidth="0">
              Central
            </tspan>
          </text>
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            strokeWidth="0"
            transform="translate(63 210)"
          >
            <tspan y="0" fontWeight="400" strokeWidth="0">
              Sala
            </tspan>
            <tspan x="0" y="15" fontWeight="400" strokeWidth="0">
              Silenciosa
            </tspan>
          </text>
          <BookOpenText className="icon-common" size={25} x="90" y="185" />
          {/* Pecera 1 */}
          <path
            d="M105.578866,228.075635L94.958982,249.821113l31.606799,14.159847l9.608467-20.734062c-9.07741-4.61727-24.32234-12.255662-30.595382-15.171263Z"
            transform="translate(.000001 0.000003)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            strokeWidth="0"
            transform="translate(110 250)"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              S1
            </tspan>
          </text>
          {/* Pecera 2 */}
          <path
            d="M151.735574,213.986619c-8.564658-6.240319-22.635866-16.226896-28.493714-19.651134l13.98652-19.693663c6.133633,3.749931,19.944296,14.183652,28.212091,20.640227l-13.704897,18.70457Z"
            transform="translate(0 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            strokeWidth="0"
            transform="translate(138 200)"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              S2
            </tspan>
          </text>
          {/* Pecera 3 */}
          <path
            d="M170.204385,154.354919l16.617106,15.699758l16.112416-16.592353-24.827926-24.720811-16.405604,17.461289l8.504008,8.152117Z"
            transform="translate(0 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            strokeWidth="0"
            transform="translate(175 153)"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              S3
            </tspan>
          </text>
        </g>
        {/* Biblioteca - Zona restringida */}
        <g className="libraryRestrictedZone">
          <path
            d="M273.252965,207.995954l25.195868,27.738939c-10.274954,6.950338-27.800736,27.597664-35.723918,40.465414-7.47902,10.416339-19.387936,32.152111-23.5042,43.702359l-34.020799-13.822501c.770365-6.778904,13.046347-30.177084,23.949262-46.811389c6.748521-12.346305,29.6429-37.561474,44.103787-51.272822Z"
            transform="translate(.000001 1)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            strokeWidth="0"
            transform="translate(220 305) rotate(-55)"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Biblioteca Central
            </tspan>
            <tspan x="0" y="12" fontWeight="700" strokeWidth="0">
              Zona Restringida
            </tspan>
          </text>
        </g>
        {/* .....................................:Escuela de Ciencia y Tecnología:........................................................ */}
        {/* Ecyt Decanato */}
        <g
          style={{
            fill: mapColors.escuelaCyt.fill,
            stroke: mapColors.escuelaCyt.stroke,
            strokeWidth: mapColors.escuelaCyt.strokeWidth
          }}
        >
          <path
            d="M757.760344,419.902162c2.008742-22.670625-2.526518-75.058429-10.989724-105.113442-6.74222-30.964592-39.239565-92.6416-65.560797-122.367408l39.061306-34.540929c33.301992,34.547907,65.020307,90.654422,78.984958,148.918585c10.03177,33.294534,12.601966,76.997017,11.57922,116.73559l-53.074963-3.632396Z"
            transform="translate(.000001 0.000005)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            transform="translate(743 290)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              ECyT
            </tspan>
            <tspan x="0" y="12" fontWeight="400" strokeWidth="0">
              Decanato
            </tspan>
          </text>
        </g>
        {/* Alumnos */}
        <g
          style={{
            fill: mapColors.escuelaCyt.fill,
            stroke: mapColors.escuelaCyt.stroke,
            strokeWidth: mapColors.escuelaCyt.strokeWidth
          }}
        >
          <path
            d="M646.970343,314.108769l34.239481-14.591046c3.972581,8.543808,10.270582,26.74574,12.876093,36.403864l-36.56069,8.680129c-2.411722-6.579224-6.865825-22.142615-10.554884-30.492947Z"
            transform="translate(.000001 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            transform="translate(655 320)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Dept.
            </tspan>
            <tspan x="0" y="12" fontWeight="700" strokeWidth="0">
              Alum.
            </tspan>
          </text>
        </g>
        {/* Instituto Colomb */}
        <g
          style={{
            fill: mapColors.escuelaCyt.fill,
            stroke: mapColors.escuelaCyt.stroke,
            strokeWidth: mapColors.escuelaCyt.strokeWidth
          }}
          onClick={() => handleOpen?.('IC')}
          className={`classRoom ${isSelected('IC') ? 'selected' : ''}`}
        >
          <path
            d="M589.265362,565.005193l23.788344,28.230525c-13.601894,12.714696-46.693126,33.629922-65.911393,42.136836l-14.421822-33.78161c15.985983-6.49366,44.071082-25.056245,56.544871-36.585751Z"
            transform="translate(.000002 0)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            transform="translate(550 610) rotate(-30)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Instituto
            </tspan>
            <tspan x="0" y="12" fontWeight="700" strokeWidth="0">
              Colomb
            </tspan>
          </text>
        </g>
        {/* Sala de profesores Cyt */}
        <g
          style={{
            fill: mapColors.escuelaCyt.fill,
            stroke: mapColors.escuelaCyt.stroke,
            strokeWidth: mapColors.escuelaCyt.strokeWidth
          }}
        >
          <path d="M613.937146,540.085921l-24.671782,24.919272l17.225526,20.438799l28.450627-28.45947-21.004371-16.898601Z" />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            transform="translate(600 570) rotate(-45)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Sala
            </tspan>
            <tspan x="0" y="12" fontWeight="700" strokeWidth="0">
              Prof.
            </tspan>
          </text>
        </g>
        {/*.......................................................:Áreas en común:...........................................................*/}
        {/* Librería Festina Lente */}
        <g
          style={{
            fill: mapColors.commonAreas.fill,
            stroke: mapColors.commonAreas.stroke,
            strokeWidth: mapColors.commonAreas.strokeWidth
          }}
        >
          <path d="M276.418798,134.565986c-9.904122,5.936898-28.948241,21.11441-39.152055,29.598624l-35.769027-40.49637c12.152454-10.405388,30.225034-25.747421,45.756253-34.43425l29.164829,45.331996Z" />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            transform="translate(220 118)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lib.
            </tspan>
            <tspan x="0" y="12" fontWeight="700" strokeWidth="0">
              Festina
            </tspan>
            <tspan x="0" y="24" fontWeight="700" strokeWidth="0">
              Lente
            </tspan>
          </text>
        </g>
        {/* Mensita */}
        <g
          style={{
            fill: mapColors.commonAreas.fill,
            stroke: mapColors.commonAreas.stroke,
            strokeWidth: mapColors.commonAreas.strokeWidth
          }}
        >
          <path
            d="M585.466195,231.281237c11.793846,11.850079,34.980821,37.430093,46.188914,52.397919l32.39208-16.786006c-7.992697-15.79205-36.536367-48.193528-55.034946-64.190475l-23.546048,28.578562Z"
            transform="translate(.000003 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            transform="translate(595 240)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Mensita
            </tspan>
          </text>
          <ForkKnife
            className="icon-common"
            x="615"
            y="243"
            weight="fill"
            size={25}
          />
        </g>
        {/* OSUNSAM */}
        <g
          style={{
            fill: mapColors.commonAreas.fill,
            stroke: mapColors.commonAreas.stroke,
            strokeWidth: mapColors.commonAreas.strokeWidth
          }}
        >
          <path
            d="M259.381702,519.189596c10.935457,15.841837,34.929202,41.640842,48.261207,51.125226l-24.869613,29.443841c-12.782995-10.876047-40.871718-40.026007-53.624121-59.672745l30.232527-20.896322Z"
            transform="translate(.000004 0.000003)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            strokeWidth="0"
            transform="translate(245 540) rotate(45)"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              OSUNSAM
            </tspan>
          </text>
        </g>
        {/* ..............................................:IAMK:............................................................... */}
        {/* IECJ IAMK Administración */}
        <g
          style={{
            fill: mapColors.iAMK.fill,
            stroke: mapColors.iAMK.stroke,
            strokeWidth: mapColors.iAMK.strokeWidth
          }}
        >
          <path
            d="M234.730854,633.622503c-7.380325-6.56406-19.527527-19.227165-24.388226-25.772566l-40.138234,36.763466c5.856737,8.003894,20.655397,22.143183,28.403533,28.551429l36.122927-39.542329Z"
            transform="translate(.000001 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            strokeWidth="0"
            transform="translate(200 622) rotate(49)"
            className="text-common"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              IECJ
            </tspan>
            <tspan y="10" x="0" fontWeight="700" strokeWidth="0">
              IAMK
            </tspan>
            <tspan y="20" x="0" fontWeight="700" strokeWidth="0">
              Admin.
            </tspan>
          </text>
        </g>
        {/* .................................................:Instituto Transporte IT:.................................................................................................................... */}
        {/* Instituto de Transporte IT */}
        <g
          style={{
            fill: mapColors.institutoTransporte.fill,
            stroke: mapColors.institutoTransporte.stroke,
            strokeWidth: mapColors.institutoTransporte.strokeWidth
          }}
          onClick={() => handleOpen?.('ITIT')}
          className={`classRoom ${isSelected('ITIT') ? 'selected' : ''}`}
        >
          <path
            d="M156.197631,523.862204c5.38304,11.840259,17.649467,34.550123,24.514927,45.433173l-45.059782,29.14993c-8.911626-13.556414-23.762178-39.556074-28.493428-52.508967l49.038283-22.074136Z"
            transform="translate(0 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(123 550) rotate(-5)"
            strokeWidth="0"
            className="text-common"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Int.
            </tspan>
            <tspan y="12" x="0" fontWeight="700" strokeWidth="0">
              de
            </tspan>
            <tspan y="24" x="0" fontWeight="700" strokeWidth="0">
              Transporte
            </tspan>
          </text>
        </g>
        {/* Depto. de Servicios Académicos IT */}
        <g
          style={{
            fill: mapColors.institutoTransporte.fill,
            stroke: mapColors.institutoTransporte.stroke,
            strokeWidth: mapColors.institutoTransporte.strokeWidth
          }}
        >
          <path
            d="M210.342629,607.849939c-8.95236-10.244195-24.001911-29.443305-29.630071-38.554563l-45.059782,29.14993c9.959006,15.197656,26.950464,38.49425,34.551609,46.168097l40.138244-36.763464Z"
            transform="translate(0 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(146 610) rotate(-35)"
            strokeWidth="0"
            className="text-common"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Depto. de
            </tspan>
            <tspan y="12" x="0" fontWeight="700" strokeWidth="0">
              Servicios
            </tspan>
            <tspan y="24" x="0" fontWeight="700" strokeWidth="0">
              Academicos
            </tspan>
            <tspan y="36" x="0" fontWeight="700" strokeWidth="0">
              IT
            </tspan>
          </text>
        </g>
        {/* Centro de Atención Psicoanalítica UIS */}{' '}
        {/* //* Intentar en algú momento ponerle el nombre completo  */}
        <g
          style={{
            fill: mapColors.centroDeAtencionPsico.fill,
            stroke: mapColors.centroDeAtencionPsico.stroke,
            strokeWidth: mapColors.centroDeAtencionPsico.strokeWidth
          }}
        >
          <path
            d="M231.242577,455.079984c1.547165,7.554654,7.064444,23.381722,10.675336,31.773873l-33.635827,14.863117-12.725862-36.438078l35.686353-10.198912Z"
            transform="translate(.000002 0.000003)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            transform="translate(210 480)"
            className="text-common"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              UIS
            </tspan>
          </text>
        </g>
        {/*// todo: Verificar que aulas y distribucion tiene ex Escuela de Humanidades  */}
        {/* Escuela de Humanidades - Decanato*/}
        <g
          style={{
            fill: mapColors.humanidades.fill,
            stroke: mapColors.humanidades.stroke,
            strokeWidth: mapColors.humanidades.strokeWidth
          }}
        >
          <path
            d="M319.840144,111.346257c75.14256-34.144216,183.160217-29.752161,239.623599-3.504649l19.94034-49.606132C554.43168,46.828812,520.222742,38.507192,482.348861,35.34659c-20.97359-1.750261-41.726158-3.452838-64.697033-2.5074-14.082876.579625-29.690977,2.864605-43.522461,5.394067-26.892728,4.918064-52.840999,13.426065-76.215197,24.628328l21.925974,48.484672Z"
            transform="translate(.000004 0.000003)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            transform="translate(410 55)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              EH
            </tspan>
            <tspan x="0" y="12" fontWeight="400" strokeWidth="0">
              Decanato
            </tspan>
          </text>
        </g>
        {/* Escuela de Humanidades*/}
        <g
          style={{
            fill: mapColors.humanidades.fill,
            stroke: mapColors.humanidades.stroke,
            strokeWidth: mapColors.humanidades.strokeWidth
          }}
        >
          <path
            d="M327.263643,213.98662c16.985138-8.970746,34.362269-18.323031,36.394122-18.70457c11.712036-4.510797,34.255949-10.272256,46.21096-12.246308c7.598843-.999778,23.499964-2.008385,34.331006-2.464214c5.499249-.587354,21.258824.049948,32.234073,1.17926c28.40594,4.353976,35.561281,8.44946,46.523058,12.146875l15.369602-33.261027c-7.626555-4.065091-26.271836-8.845666-38.519817-11.23854-10.108397-2.185029-27.761434-4.746005-37.801534-5.616096-27.100144-3.028411-37.227419-.996925-54.511777,1.251753-13.277425,1.82056-41.226825,9.255387-57.244986,15.602882-12.396231,4.411002-33.85388,14.752745-42.605448,21.114152l19.620734,32.235832"
            transform="translate(.000007 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            transform="translate(390 160)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Escuela
            </tspan>
            <tspan y="10" x="0" fontWeight="700" strokeWidth="0">
              de Humanidades
            </tspan>
          </text>
        </g>
        {/* Dirección de Gérenro y Diversidad Sexual */}
        <g
          style={{
            fill: mapColors.humanidades.fill,
            stroke: mapColors.humanidades.stroke,
            strokeWidth: mapColors.humanidades.strokeWidth
          }}
        >
          <path
            d="M340.355463,695.709143c-6.597881-2.317223-21.233509-8.03886-29.32171-11.342363l-10.972266,22.254985-29.096213-15.520702-14.116982,24.37659c18.184017,11.267016,51.055151,24.728614,65.59174,30.073223l17.915431-49.841733Z"
            transform="translate(.000001 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="8"
            fontWeight="400"
            transform="translate(267 698) rotate(25)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Direción de{' '}
            </tspan>
            <tspan y="8" x="0" fontWeight="700" strokeWidth="0">
              Gérenro y
            </tspan>
            <tspan y="16" x="0" fontWeight="700" strokeWidth="0">
              Diversidad Sexual
            </tspan>
          </text>
        </g>
        {/* Centro de Estudios Latinos-Americanos */}
        <g
          style={{
            fill: mapColors.humanidades.fill,
            stroke: mapColors.humanidades.stroke,
            strokeWidth: mapColors.humanidades.strokeWidth
          }}
        >
          <path
            d="M283.571377,670.087322c5.84398,3.656365,19.830554,10.673608,27.462375,14.279456l-10.972267,22.254987-29.096213-15.520706l12.606105-21.013737Z"
            transform="translate(.000002 0.000004)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="8"
            fontWeight="400"
            transform="translate(290 670) rotate(25)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Centro de
            </tspan>
            <tspan y="8" x="0" fontWeight="700" strokeWidth="0">
              Estudios
            </tspan>
            <tspan y="16" x="0" fontWeight="700" strokeWidth="0">
              Latinos-
            </tspan>
            <tspan y="24" x="0" fontWeight="700" strokeWidth="0">
              Americanos
            </tspan>
          </text>
        </g>
        {/* .......................................................:Laboratorios:................................................... */}
        {/* Lab. de Biomédica */}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('LB')}
          className={`classRoom ${isSelected('LB') ? 'selected' : ''}`}
        >
          <path d="M648.932918,481.725081c-6.72563,16.508337-23.875519,45.854964-34.995772,58.36084c10.699564,8.638894,25.144205,20.117947,28.261142,23.083734c13.481169-14.746894,33.384114-48.847337,40.462272-67.913721l-33.727642-13.530853Z" />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(633 540) rotate(-55)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="0" y="10" fontWeight="700" strokeWidth="0">
              Biomédica
            </tspan>
          </text>
        </g>
        {/* Lab. de Óptica */}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('LO')}
          className={`classRoom ${isSelected('LO') ? 'selected' : ''}`}
        >
          <path
            d="M658.702897,448.251373c2.597916-9.915621,5.366512-27.3622,5.344295-34.893157l37.298647,2.559433c-.851332,12.151571-3.703975,31.476879-5.547838,39.752744l-37.095104-7.41902Z"
            transform="translate(.000002 0.000004)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(664 432)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="0" y="10" fontWeight="700" strokeWidth="0">
              Óptica
            </tspan>
          </text>
        </g>
        {/* Lab. de Imágenes */}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('LI')}
          className={`classRoom ${isSelected('LI') ? 'selected' : ''}`}
        >
          <path d="M663.491106,379.269331l37.443302-2.056484c.514162,10.843138.867623,30.195541.411433,38.704806l-37.298649-2.559433c-.047288-9.17642-.116975-26.399805-.556086-34.088889Z" />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(666 395)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="0" y="10" fontWeight="700" strokeWidth="0">
              Imag.
            </tspan>
          </text>
        </g>
        {/* Lab. de Electrónica I */}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('LEI')}
          className={`classRoom ${isSelected('LEI') ? 'selected' : ''}`}
        >
          <path
            d="M713.854823,560.139867c7.026992-11.671915,18.219138-34.095264,21.937518-44.968544l50.201477,19.478795c-5.728432,14.975441-19.892653,41.721972-26.562537,52.757043l-45.576458-27.267294Z"
            transform="translate(.000003 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(730 540)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="-5" y="10" fontWeight="700" strokeWidth="0">
              Electrónica
            </tspan>
            <tspan x="16" y="20" fontWeight="700" strokeWidth="0">
              I
            </tspan>
          </text>
        </g>
        {/* Lab. de Electrónica III */}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('LEIII')}
          className={`classRoom ${isSelected('LEIII') ? 'selected' : ''}`}
        >
          <path
            d="M686.36613,599.005661c7.53362-8.416957,21.046323-27.94739,27.488693-38.865796l45.576461,27.267296c-7.521165,12.859758-22.770763,35.555239-31.708892,45.079683L686.36613,599.005661Z"
            transform="translate(0 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(702 590)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="-5" y="10" fontWeight="700" strokeWidth="0">
              Electrónica
            </tspan>
            <tspan x="15" y="20" fontWeight="700" strokeWidth="0">
              III
            </tspan>
          </text>
        </g>
        {/* Lab. de Electrónica IV */}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('LEIV')}
          className={`classRoom ${isSelected('LEIV') ? 'selected' : ''}`}
        >
          <path
            d="M686.36613,599.005662c-7.977895,9.187551-25.525271,27.40743-34.921488,36.366895l34.921488,40.019622c12.92596-11.056137,34.078171-32.255071,41.356262-42.905336L686.36613,599.005662Z"
            transform="translate(0 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(670 630)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="-5" y="10" fontWeight="700" strokeWidth="0">
              Electrónica
            </tspan>
            <tspan x="15" y="20" fontWeight="700" strokeWidth="0">
              IV
            </tspan>
          </text>
        </g>
        {/* Lab. de Computación I*/}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('LCI')}
          className={`classRoom ${isSelected('LCI') ? 'selected' : ''}`}
        >
          <path
            d="M757.760344,419.902161l53.074964,3.632401c.088915,14.373628-4.474915,42.169252-7.717758,56.371951l-52.507634-11.61644c2.906391-11.376459,6.30563-35.570415,7.150428-48.387912Z"
            transform="translate(0 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(760 445)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="0" y="10" fontWeight="700" strokeWidth="0">
              Comp. I
            </tspan>
          </text>
        </g>
        {/* Lab. de Computación II*/}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('LCII')}
          className={`classRoom ${isSelected('LCII') ? 'selected' : ''}`}
        >
          <path
            d="M750.609915,468.29007l52.507634,11.616439c-3.10856,13.319306-10.12453,40.318135-17.123731,54.743608l-50.201475-19.478796c4.752548-11.678783,12.220874-35.561392,14.817572-46.881251Z"
            transform="translate(.000001 0.000004)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(750 498)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="0" y="10" fontWeight="700" strokeWidth="0">
              Comp. II
            </tspan>
          </text>
        </g>
        {/* Lab. de Computación III*/}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('LCIII')}
          className={`classRoom ${isSelected('LCIII') ? 'selected' : ''}`}
        >
          <path
            d="M657.525225,344.601715l36.56069-8.680129c2.411818,10.306226,5.853031,30.949029,6.848493,41.29126l-37.443305,2.056482c-1.259175-11.025439-3.561545-28.359246-5.965878-34.667613Z"
            transform="translate(.000003 0.000003)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="9.5"
            fontWeight="400"
            transform="translate(662 360)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="0" y="10" fontWeight="700" strokeWidth="0">
              Comp.III
            </tspan>
          </text>
        </g>
        {/* Laboratorio de Ciencias Humanas LICH */}
        <g
          style={{
            fill: mapColors.humanidades.fill,
            stroke: mapColors.humanidades.stroke,
            strokeWidth: mapColors.humanidades.strokeWidth
          }}
          onClick={() => handleOpen?.('LICH')}
          className={`classRoom ${isSelected('LICH') ? 'selected' : ''}`}
        >
          <path
            d="M363.657763,758.144566l11.933547-51.522798c-8.46615-2.115069-25.710182-7.30218-35.23585-10.912627l-17.91543,49.841733c11.569639,4.291045,32.100914,10.898258,41.217733,12.593692Z"
            transform="translate(.000003 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="9.5"
            fontWeight="400"
            transform="translate(335 745) rotate(-70)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="0" y="10" fontWeight="700" strokeWidth="0">
              Ciencias
            </tspan>
            <tspan x="0" y="20" fontWeight="700" strokeWidth="0">
              Humanas
            </tspan>
          </text>
        </g>
        {/* .......................................................:Aulas:......................................................... */}
        {/* CIDI  // todo: No se si dejarle este color*/}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('CIDI')}
          className={`classRoom ${isSelected('CIDI') ? 'selected' : ''}`}
        >
          <path
            d="M613.053706,664.880487c11.863397-7.530674,31.319727-22.249068,38.390936-29.507933l34.921488,40.019623c-11.407792,10.09239-32.917574,27.508741-44.99751,34.354024l-28.314914-44.865714Z"
            transform="translate(0 0.000003)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(634 679)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              CIDI
            </tspan>
          </text>
        </g>
        {/* A30 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A30')}
          className={`classRoom ${isSelected('A30') ? 'selected' : ''}`}
        >
          <path d="M569.382208,687.668369c11.707026-4.582715,33.386844-16.075886,43.6715-22.787882l28.314912,44.865716c-8.243741,6.165504-32.268534,19.027766-50.201334,26.374608l-21.785078-48.452442Z" />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(590 705)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A30
            </tspan>
          </text>
        </g>
        {/* A31 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A31')}
          className={`classRoom ${isSelected('A31') ? 'selected' : ''}`}
        >
          <path
            d="M467.679414,655.491182l-2.983209-36.389147c11.520256-.65545,28.740423-3.95531,34.490184-6.387994l9.412642,35.654853c-9.924211,2.468117-30.331558,5.986-40.919617,7.122288Z"
            transform="translate(0 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(472 641)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A31
            </tspan>
          </text>
        </g>
        {/* A32 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A32')}
          className={`classRoom ${isSelected('A32') ? 'selected' : ''}`}
        >
          <path
            d="M467.679414,655.491182c-9.738725.496311-29.106775.658002-38.73736.329683l2.103313-36.384182c9.02163.42267,25.861483.557099,33.650838-.334647l2.983209,36.389146Z"
            transform="translate(0 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(434 642)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A32
            </tspan>
          </text>
        </g>
        {/* A33*/}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A33')}
          className={`classRoom ${isSelected('A33') ? 'selected' : ''}`}
        >
          <path
            d="M428.942054,655.820861c-11.951641-1.224391-32.1554-3.843076-40.249958-5.788836l8.137832-35.107795c8.439514,2.530668,25.472213,4.218114,34.215439,4.51245l-2.103313,36.384181Z"
            transform="translate(0 0.000004)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(396 642)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A33
            </tspan>
          </text>
        </g>
        {/* A34 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A34')}
          className={`classRoom ${isSelected('A34') ? 'selected' : ''}`}
        >
          <path
            d="M193.406116,343.387334l36.597516,8.132782c.374644-6.090245,5.620978-21.89897,9.217084-31.61745l-34.020799-13.822501c-4.549714,9.162578-9.986476,27.61896-11.793801,37.307169Z"
            transform="translate(0 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            strokeWidth="0"
            transform="translate(201 333)"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A34
            </tspan>
          </text>
        </g>
        {/* A35 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A35')}
          className={`classRoom ${isSelected('A35') ? 'selected' : ''}`}
        >
          <path
            d="M522.956868,193.897662c8.498459,3.846212,23.24087,11.836283,29.419859,15.992322l20.089871-31.003693c-9.164108-5.103664-26.152433-14.248928-34.140133-18.249657l-15.369597,33.261028Z"
            transform="translate(.000001 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(533 190)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A35
            </tspan>
          </text>
        </g>
        {/* //! Verificar estas Aulas */}
        {/* T04 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('T04')}
          className={`classRoom ${isSelected('T04') ? 'selected' : ''}`}
        >
          <path
            d="M189.084671,385.5h36.726157c-.881459,17.006431-.678467,51.976619,5.431749,69.579987l-35.686352,10.19891c-6.777362-19.106295-7.312686-60.203014-6.471554-79.778897Z"
            transform="translate(.000001 0)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            strokeWidth="0"
            transform="translate(194 430)"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              T04
            </tspan>
          </text>
        </g>
        {/* T05 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('T05')}
          className={`classRoom ${isSelected('T05') ? 'selected' : ''}`}
        >
          <path
            d="M210.536771,607.156266c-8.95236-10.244195-23.307909-29.861084-28.936069-38.972342l-45.799196,29.725531c9.959006,15.197656,27.791542,38.506199,35.392687,46.180046l39.342578-36.933235Z"
            transform="matrix(.88383 0.467809-.467809 0.88383 238.197352-155.20719)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            strokeWidth="0"
            transform="translate(95 465)"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              T05
            </tspan>
          </text>
        </g>
        {/* T06 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('T06')}
          className={`classRoom ${isSelected('T06') ? 'selected' : ''}`}
        >
          <path d="M132.900095,431.925056l-54.384554,4.847048c-4.099336-28.608807-2.449949-86.175658,6.534544-116.869438l53.57151,11.607649c-8.670179,29.583261-8.787787,77.526784-5.7215,100.414741Z" />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            strokeWidth="0"
            transform="translate(90 390)"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              T06
            </tspan>
          </text>
        </g>
        {/*........................................:Lectura Mundi:.................................................. */}
        {/* Lectura Mundi - Coordinación */}
        <g
          style={{
            fill: mapColors.lecturaMundi.fill,
            stroke: mapColors.lecturaMundi.stroke,
            strokeWidth: mapColors.lecturaMundi.strokeWidth
          }}
        >
          <path
            d="M364.376435,604.764542c-12.799056-4.543638-40.762397-18.829981-56.733526-34.449722l-24.869612,29.443841c16.473654,12.511506,49.854622,31.813607,67.47506,38.701918l14.128078-33.696037Z"
            transform="translate(0 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(298 585) rotate(30)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lectura Mundi
            </tspan>
            <tspan y="10" x="0" fontWeight="400" strokeWidth="0">
              Coordinación
            </tspan>
          </text>
        </g>
        {/* Lectura Mundi Dirección */}
        <g
          style={{
            fill: mapColors.lecturaMundi.fill,
            stroke: mapColors.lecturaMundi.stroke,
            strokeWidth: mapColors.lecturaMundi.strokeWidth
          }}
        >
          <path
            d="M283.571379,670.087325c-5.305198-3.196616-16.584683-11.207046-22.601314-15.851484l-31.820886,43.112352c7.853285,5.623603,21.47811,14.845647,27.699114,18.129461l26.723086-45.390329Z"
            transform="translate(0 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(237 700) rotate(-55)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lectura
            </tspan>
            <tspan y="10" x="0" fontWeight="700" strokeWidth="0">
              Mundi
            </tspan>
            <tspan y="20" x="0" fontWeight="400" strokeWidth="0">
              Dirección
            </tspan>
          </text>
        </g>
        {/* Lectura Mundi Administración */}
        <g
          style={{
            fill: mapColors.lecturaMundi.fill,
            stroke: mapColors.lecturaMundi.stroke,
            strokeWidth: mapColors.lecturaMundi.strokeWidth
          }}
        >
          <path
            d="M260.970064,654.235841l-26.23921-20.613338-36.122927,39.542329c8.558428,7.5473,24.015107,19.628812,30.541251,24.183361l31.820886-43.112352Z"
            transform="translate(.000001 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(210 675) rotate(-50)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lectura
            </tspan>
            <tspan y="10" x="0" fontWeight="700" strokeWidth="0">
              Mundi
            </tspan>
            <tspan y="20" x="0" fontWeight="400" strokeWidth="0">
              Admin.
            </tspan>
          </text>
        </g>
        {/*.............................................:Baños:........................................................ */}
        <g
          style={{
            fill: mapColors.banios.fill,
            stroke: mapColors.banios.stroke,
            strokeWidth: mapColors.banios.strokeWidth
          }}
        >
          <path
            d="M681.209821,192.421313c-7.550082-8.040159-25.531668-24.976906-35.712953-33.9569l33.551013-40.69517c12.320097,9.698933,32.765397,29.797606,41.223247,40.111145l-39.061307,34.540925Z"
            transform="translate(.000002 0)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            transform="translate(665 147)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Baños
            </tspan>
          </text>
          <Toilet className="icon-common" x="668" y="150" size={25} />
        </g>
        <g
          style={{
            fill: mapColors.banios.fill,
            stroke: mapColors.banios.stroke,
            strokeWidth: mapColors.banios.strokeWidth
          }}
        >
          <path
            d="M140.243051,479.906512c2.606432,8.897058,10.824505,30.840506,15.954577,43.955691L107.159345,545.93634c-6.993615-11.522572-16.181696-37.437324-18.918368-51.791933l52.002074-14.237895Z"
            transform="translate(.000003 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            transform="translate(102 503)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Baños
            </tspan>
          </text>
          <Toilet className="icon-common" x="108" y="505" size={25} />
        </g>
        <g
          style={{
            fill: mapColors.banios.fill,
            stroke: mapColors.banios.stroke,
            strokeWidth: mapColors.banios.strokeWidth
          }}
        >
          <path
            d="M522.986755,702.690549c15.566842-4.063112,37.734003-11.480964,46.395453-15.022183l21.785078,48.452442c-12.490739,5.70342-40.099376,15.706914-54.467409,18.411711l-13.713122-51.84197Z"
            transform="translate(0 0.000003)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            transform="translate(534 711)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Baños
            </tspan>
          </text>
          <Toilet className="icon-common" x="540" y="713" size={25} />
        </g>
        <g
          style={{
            fill: mapColors.banios.fill,
            stroke: mapColors.banios.stroke,
            strokeWidth: mapColors.banios.strokeWidth
          }}
        >
          <path
            d="M276.418798,134.565986c12.477422-7.629901,34.274651-19.672545,43.421346-23.219733L297.914172,62.861582c-12.937651,4.121259-37.946633,17.773341-50.611558,26.506522l29.116184,45.197882Z"
            transform="translate(0 0.000004)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            transform="translate(265 90)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Baños
            </tspan>
          </text>
          <Toilet className="icon-common" x="271" y="93" size={25} />
        </g>
      </svg>
    </>
  )
}
