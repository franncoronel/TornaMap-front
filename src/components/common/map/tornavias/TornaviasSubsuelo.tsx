import { BookOpenText, Toilet } from '@phosphor-icons/react'
import { mapColors } from '../../../pages/map/mapColors'

interface TornaviasSubsueloProps {
  selectedCode?: string // Cambiado de selectedClassRoomId
  handleOpen?: (classRoomId: string) => void
}

export default function TornaviasSubsuelo({
  selectedCode,
  handleOpen
}: TornaviasSubsueloProps) {
  const isSelected = (id: string) => id === selectedCode

  // !important: Si se quiere volver a la posición original, sacar el rotate y reemplazar las coordenadas comentadas por las actuales.
  // todo-> viewBox="minX minY width height"    (minX;minY) ancho alto
  return (
    <>
      <svg
        id="eBHsLTiXjpU1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 230 625 420"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        project-id="729e4ceae0ad41f0af0203ebbf87e174"
        export-id="66d7fd809be74a5a81a3926e2b015bee"
      >
        <g transform="rotate(180 312.5 440)">
          {/* Contorno exterior  */}
          <g
            style={{
              fill: mapColors.outline.fill,
              stroke: mapColors.outline.stroke,
              strokeWidth: mapColors.outline.strokeWidth
            }}
          >
            <path
              d="M212.143328,347.599413c19.099633,144.497161,213.686862,166.157509,271.658316,44.5419l141.835612,64.711542C508.108976,700.652917,101.945488,683.872221,56.067693,359.168237l156.075635-11.568824Z"
              transform="translate(-1.314856 0.986144)"
            />

            <path
              d="M170.253401,191.140267l-58.671007,91.646276"
              transform="matrix(.422702-.906269 0.906269 0.422702-135.866533 532.340949)"
            />
            <path
              d="M123.526099,287.05446l56.922426-89.741944"
              transform="matrix(.422702-.906269 0.906269 0.422702-135.866533 532.340949)"
            />
            <path
              d="M231.24261,601.122845l15.977745-14.179977c1.061258,1.145564,2.189604,2.318601,3.378225,3.514202c20.608867,20.729894,59.337712,48.24322,80.674972,56.956255l-9.349419,19.237647c-25.970083-11.204098-67.158688-41.127792-87.130707-61.713115-1.272938-1.312028-2.459688-2.58612-3.550816-3.815012Z"
              transform="matrix(.30885-.951111 0.951111 0.30885-202.896347 577.085546)"
            />
          </g>

          <g
            style={{
              fill: mapColors.ladder.fill,
              stroke: mapColors.outline.stroke,
              strokeWidth: mapColors.ladder.strokeWidthStep
            }}
          >
            <path
              d="M121.608924,266.949109l10.409367,6.752875l2.853766-4.517707-10.163226-6.845909l3.02351-4.867637l10.281913,6.807003l6.37482-10.130499-10.348012-6.42206l3.1-4.84l10.389,6.337813l2.750273-4.287407-10.230822-6.579776l2.879724-4.490857l10.401607,6.244946l2.714431-4.338691-10.56-5.94l6.7813-10.61493l10.145045,6.471817l2.902006-4.469324-10.196535-6.402499l3.04-4.76l10.257066,6.184201"
              transform="matrix(.422702-.906269 0.906269 0.422702-135.866533 532.340949)"
            />
            <path
              d="M318.000828,664.855625l9.262802-19.174452-4.588326-2.229948-9.689356,18.9644-4.26512-2.32l10.033188-18.765055-4.1-2.311817-10.471971,18.574217-4.36-2.6l10.720501-18.449721-4.18-2.62-10.676865,18.469308-4.62-2.9L302.261124,631.345l-3.812304-2.302247-11.51496,17.791395-4.160576-2.765281l11.895869-17.841925-4.014358-2.82-11.611849,17.923628-4.753228-3.337467l12.644142-17.206161-4.160576-3.118066-12.575682,17.115529-3.885168-2.564514l12.730512-17.295667-3.78-2.949762L262.3767,629.042753l-4.459943-3.36l13.55673-16.839106-3.38-2.635409-13.485359,16.608553-4.432196-3.677467l14.487161-15.791613-3.425149-2.971271-14.428149,16.013295-3.982647-3.675694l15.089609-15.255315-3.974734-3.665881-15.221415,15.050802-3.927196-3.905797l15.805154-14.480787"
              transform="matrix(.30885-.951111 0.951111 0.30885-202.896347 577.085546)"
            />
          </g>
          <g
            style={{
              fill: mapColors.arrow.fill,
              stroke: mapColors.arrow.stroke,
              strokeWidth: mapColors.arrow.strokeWidth
            }}
          >
            <g transform="matrix(-.051722-.167985 0.129282-.039805 430.999211 526.049973)">
              <line
                x1="50.06"
                y1="77.95"
                x2="50.06"
                y2="47.3"
                transform="matrix(-1 0 0-1 0 0)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="37.76,60.46 50.06,45.74 62.36,60.46"
                transform="matrix(-1 0 0-1 0 0)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <g transform="matrix(.145491-.098623 0.075901 0.11197 123.253141 452.916426)">
              <line
                x1="50.06"
                y1="77.95"
                x2="50.06"
                y2="47.3"
                transform="matrix(-1 0 0-1 0 0)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="37.76,60.46 50.06,45.74 62.36,60.46"
                transform="matrix(-1 0 0-1 0 0)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>

          {/* Biblioteca Central  */}
          <g
            className="libraryRestrictedZone"
            style={{
              fill: mapColors.library.fill,
              stroke: mapColors.library.stroke,
              strokeWidth: mapColors.library.strokeWidth
            }}
          >
            <path
              d="M2.826632,337c0,112.621305,58.627761,243.669928,216.740684,311.193148l19.308875-44.63483C83.807214,546.009954,52.979149,386.685276,52.979149,336h-50.152517"
              transform="translate(.000001 0)"
            />
            <text
              dx="0"
              dy="0"
              fontFamily='"eBHsLTiXjpU1:::Roboto"'
              fontSize="10"
              fontWeight="400"
              strokeWidth="0"
              transform="translate(90 510) rotate(180)" //transform="translate(131.444581 427.258449)
            >
              <tspan y="0" fontWeight="700" strokeWidth="0" dy="2em">
                Biblioteca
              </tspan>
              <tspan x="0" y="10" fontWeight="700" strokeWidth="0" dy="2em">
                Central
              </tspan>
              <tspan x="0" y="20" fontWeight="700" strokeWidth="0" dy="2em">
                Subsuelo
              </tspan>
            </text>
          </g>
          <BookOpenText
            className="icon-common"
            size={18}
            transform="translate(67 468) rotate(180)"
          />
          {/* Auditorio Lectura Mundi */}
          <g
            style={{
              fill: mapColors.lecturaMundi.fill,
              stroke: mapColors.lecturaMundi.stroke,
              strokeWidth: mapColors.lecturaMundi.strokeWidth
            }}
            onClick={() => handleOpen?.('ALM')}
            className={`classRoom ${isSelected('ALM') ? 'selected' : ''}`}
          >
            <path
              d="M152.40227,386.685275l-40.706687,11.247393c4.558881,20.985764,22.054315,58.70383,35.670348,75.189049l35.962754-23.500413c-10.682006-11.39414-27.052417-44.983517-30.926415-62.936029Z"
              transform="translate(.000001 0.000001)"
            />
            <text
              dx="0"
              dy="0"
              fontFamily='"eBHsLTiXjpU1:::Roboto"'
              fontSize="8"
              fontWeight="400"
              transform="translate(165 429) rotate(159)" //transform="translate(131.444581 427.258449)
              strokeWidth="0"
            >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                Auditorio
              </tspan>
              <tspan x="0" y="10" fontWeight="700" strokeWidth="0">
                Lectura
              </tspan>
              <tspan x="0" y="20" fontWeight="700" strokeWidth="0">
                Mundi
              </tspan>
            </text>
          </g>
          {/* Lectura Mundi Comunicación Identidad Visual */}
          <g
            style={{
              fill: mapColors.lecturaMundi.fill,
              stroke: mapColors.lecturaMundi.stroke,
              strokeWidth: mapColors.lecturaMundi.strokeWidth
            }}
            onClick={() => handleOpen?.('LMCIV')}
            transform="translate(.000001 0.000001)"
            className={`classRoom ${isSelected('LMCIV') ? 'selected' : ''}`}
          >
            <path
              d="M163.777204,367.564469c3.994251,27.061452,27.310193,73.710364,47.051268,93.109102l36.751213-32.672082c-13.962233-13.477412-31.78846-47.477558-34.827329-68.698472l-48.975152,8.261452Z"
              transform="translate(.000003 0)"
            />
            <text
              dx="0"
              dy="0"
              fontFamily='"eBHsLTiXjpU1:::Roboto"'
              fontSize="8"
              fontWeight="400"
              transform="translate(210 435) rotate(247)" //transform="translate(183.328686 398.816987)"
              strokeWidth="0"
            >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                Lectura Mundi
              </tspan>
              <tspan x="0" y="8" fontWeight="400" strokeWidth="0">
                Comunicación
              </tspan>
              <tspan x="0" y="16" fontWeight="400" strokeWidth="0">
                Identidad Visual
              </tspan>
            </text>
          </g>
          {/* SUM */}
          <g
            style={{
              fill: mapColors.library.fill,
              stroke: mapColors.library.stroke,
              strokeWidth: mapColors.library.strokeWidth
            }}
            onClick={() => handleOpen?.('SUM')}
            className={`classRoom ${isSelected('SUM') ? 'selected' : ''}`}
          >
            <path
              d="M261.614702,440.822361l-14.035014-12.820872-36.751213,32.672082c4.541811,4.585526,14.138451,12.989207,19.218025,16.782618l31.568202-36.633828Z"
              transform="translate(.000003 0)"
            />
            <text
              dx="0"
              dy="0"
              fontFamily='"eBHsLTiXjpU1:::Roboto"'
              fontSize="10"
              fontWeight="400"
              transform="translate(247 450) rotate(180)" //transform="translate(230.848786 454.462261)
              strokeWidth="0"
            >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                SUM
              </tspan>
            </text>
          </g>
          {/* ......................................................:Aulas:........................................................................... */}
          {/* A27 */}
          <g
            style={{
              fill: mapColors.classrooms.fill,
              stroke: mapColors.classrooms.stroke,
              strokeWidth: mapColors.classrooms.strokeWidth
            }}
            onClick={() => handleOpen?.('A27')}
            transform="translate(.000001 0)"
            className={`classRoom ${isSelected('A27') ? 'selected' : ''}`}
          >
            <path
              d="M336.686059,520.343505c16.195183,1.879988,49.658531-.84739,66.905777-5.161917l-12.963961-47.297694c-13.12237,3.271771-38.167049,5.333673-50.052251,3.901157l-3.889565,48.558454Z"
              transform="translate(.000001 0)"
            />
            <text
              dx="0"
              dy="0"
              fontFamily='"eBHsLTiXjpU1:::Roboto"'
              fontSize="10"
              fontWeight="400"
              transform="translate(375 495) rotate(180)" //transform="translate(364.104813 496.914308)"
              strokeWidth="0"
            >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                A27
              </tspan>
            </text>
          </g>
          {/* A26 */}
          <g
            style={{
              fill: mapColors.classrooms.fill,
              stroke: mapColors.classrooms.stroke,
              strokeWidth: mapColors.classrooms.strokeWidth
            }}
            onClick={() => handleOpen?.('A26')}
            transform="translate(.000001 0)"
            className={`classRoom ${isSelected('A26') ? 'selected' : ''}`}
          >
            <path
              d="M390.627876,467.883894l12.963961,47.297694c17.514813-5.107595,47.937744-18.736399,60.46326-27.892047l-28.689661-39.3772c-10.428627,7.307407-32.766706,17.369936-44.737562,19.971553"
              transform="translate(.000003 0)"
            />
            <text
              dx="0"
              dy="0"
              fontFamily='"eBHsLTiXjpU1:::Roboto"'
              fontSize="10"
              fontWeight="400"
              transform="translate(434 480) rotate(180)" //transform="translate(419.679074 483.327865)"
              strokeWidth="0"
            >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                A26
              </tspan>
            </text>
          </g>
          {/* A25 Lab. de Artes Digitales*/}
          <g
            style={{
              fill: mapColors.classrooms.fill,
              stroke: mapColors.classrooms.stroke,
              strokeWidth: mapColors.classrooms.strokeWidth
            }}
            onClick={() => handleOpen?.('A25')}
            className={`classRoom ${isSelected('A25') ? 'selected' : ''}`}
          >
            <path
              d="M464.0551,487.289541c22.515861-13.872036,54.947443-50.182526,63.920489-73.397303l-45.488801-20.764782c-7.012486,17.055566-30.99735,44.06238-47.121349,54.784883L464.0551,487.289538"
              transform="translate(0 0.000004)"
            />
            <text
              dx="0"
              dy="0"
              fontFamily='"eBHsLTiXjpU1:::Roboto"'
              fontSize="10"
              fontWeight="400"
              transform="translate(506 439) rotate(168)" //transform="translate(467.035782 434.691608)"
              strokeWidth="0"
            >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                A25
              </tspan>
              <tspan x="0" y="10" fontWeight="400" strokeWidth="0">
                Lab. de Artes
              </tspan>
              <tspan x="0" y="20" fontWeight="400" strokeWidth="0">
                Digitales
              </tspan>
            </text>
          </g>
          {/* A28 */}
          <g
            style={{
              fill: mapColors.classrooms.fill,
              stroke: mapColors.classrooms.stroke,
              strokeWidth: mapColors.classrooms.strokeWidth
            }}
            onClick={() => handleOpen?.('A28')}
            transform="translate(.000001 0)"
            className={`classRoom ${isSelected('A28') ? 'selected' : ''}`}
          >
            <path
              d="M525.726325,500.412891c-7.112962,6.961764-23.676242,20.402454-32.944045,27.063894l32.320559,44.533764c12.076082-8.271162,32.605996-24.303262,40.532965-32.274945l-39.909479-39.322713Z"
              transform="translate(.000002 0)"
            />
            <text
              dx="0"
              dy="0"
              fontFamily='"eBHsLTiXjpU1:::Roboto"'
              fontSize="10"
              fontWeight="400"
              transform="translate(538 532) rotate(180)" //transform="translate(522.602938 537.990165)"
              strokeWidth="0"
            >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                A28
              </tspan>
            </text>
          </g>
          {/* A29 */}
          <g
            style={{
              fill: mapColors.classrooms.fill,
              stroke: mapColors.classrooms.stroke,
              strokeWidth: mapColors.classrooms.strokeWidth
            }}
            onClick={() => handleOpen?.('A29')}
            transform="translate(.000001 0)"
            className={`classRoom ${isSelected('A29') ? 'selected' : ''}`}
          >
            <path
              d="M492.782282,527.476785c-8.507383,4.997561-26.605501,14.985215-36.198373,19.975308l23.12806,49.649023c12.979191-5.529502,35.841544-17.774334,45.390872-25.090568l-32.320559-44.533763Z"
              transform="translate(0 0.000001)"
            />
            <text
              dx="0"
              dy="0"
              fontFamily='"eBHsLTiXjpU1:::Roboto"'
              fontSize="10"
              fontWeight="400"
              transform="translate(498 560) rotate(180)" // transform="translate(484.370341 564.067532)
              strokeWidth="0"
            >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                A29
              </tspan>
            </text>
          </g>
          {/* Gerencia de Informática Soporte Técnico */}
          <g
            style={{
              fill: mapColors.commonAreas.fill,
              stroke: mapColors.commonAreas.stroke,
              strokeWidth: mapColors.commonAreas.strokeWidth
            }}
            onClick={() => handleOpen?.('GIST')}
            transform="translate(0 0.000001)"
            className={`classRoom ${isSelected('GIST') ? 'selected' : ''}`}
          >
            <path
              d="M573.606346,434.718077l-20.752469,34.760868l45.815688,31.628575c7.996447-10.747864,20.887156-32.37141,25.652834-43.268522l-50.716053-23.120921Z"
              transform="translate(.000001-.028904)"
              fill="#9699a1"
              stroke="#505050"
              strokeWidth="0.7"
            />
            <text
              dx="0"
              dy="0"
              fontFamily='"eBHsLTiXjpU1:::Roboto"'
              fontSize="5"
              fontWeight="400"
              transform="translate(615 463) rotate(-185)" //transform="translate(562.197946 463.181028)"
              strokeWidth="0"
            >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                Gerencia de Informática
              </tspan>
              <tspan x="0" y="5" fontWeight="400" strokeWidth="0">
                Soporte Técnico
              </tspan>
            </text>
          </g>
          {/* .........................................:IAMK:........................................................................*/}
          {/* IAMK */}
          <g
            style={{
              fill: mapColors.iAMK.fill,
              stroke: mapColors.iAMK.stroke,
              strokeWidth: mapColors.iAMK.strokeWidth
            }}
            onClick={() => handleOpen?.('IAMK')}
            transform="translate(0 0.000001)"
            className={`classRoom ${isSelected('IAMK') ? 'selected' : ''}`}
          >
            <path
              d="M552.853878,469.450041c-5.199325,6.945144-18.767134,22.428585-27.127554,30.962849l39.909481,39.322713c10.065025-9.651156,26.734904-28.9414,33.03376-38.656988l-45.815687-31.628574Z"
              transform="translate(.000001 0.000001)"
            />
            <text
              dx="0"
              dy="0"
              fontFamily='"eBHsLTiXjpU1:::Roboto"'
              fontSize="10"
              fontWeight="700"
              transform="translate(576 503.371962) rotate(180)" //transform="translate(556.824887 503.371962)"
              strokeWidth="0"
              className="text-common"
            >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                IAMK
              </tspan>
            </text>
          </g>
          {/* IAMK Servicios */}
          <g
            style={{
              fill: mapColors.iAMK.fill,
              stroke: mapColors.iAMK.stroke,
              strokeWidth: mapColors.iAMK.strokeWidth
            }}
            onClick={() => handleOpen?.('IAMKS')}
            transform="translate(0 0.000001)"
            className={`classRoom ${isSelected('IAMKS') ? 'selected' : ''}`}
          >
            <path d="M456.583909,547.452094c-9.774067,4.179228-29.597963,11.308888-39.669812,14.215282L430.42164,614.12842c13.015658-2.971658,37.650561-11.502414,49.290329-17.027303l-23.12806-49.649023Z" />
            <text
              dx="0"
              dy="0"
              fontFamily='"eBHsLTiXjpU1:::Roboto"'
              fontSize="10"
              fontWeight="400"
              transform="translate(465 582) rotate(180)" //transform="translate(438.190008 580.042774)"
              strokeWidth="0"
              className="text-common"
            >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                IAMK
              </tspan>
              <tspan x="0" y="10" fontWeight="400" strokeWidth="0">
                Servicios
              </tspan>
            </text>
          </g>
          {/* IAMK Decanato */}
          <g
            style={{
              fill: mapColors.iAMK.fill,
              stroke: mapColors.iAMK.stroke,
              strokeWidth: mapColors.iAMK.strokeWidth
            }}
            onClick={() => handleOpen?.('IAMKD')}
            transform="translate(0 0.000001)"
            className={`classRoom ${isSelected('IAMKD') ? 'selected' : ''}`}
          >
            <path
              d="M416.914097,561.667376c-11.052498,2.765574-31.966516,6.307018-42.064177,6.551575l4.119723,54.91027c13.045229-.839876,38.75822-5.389702,51.451995-9.000803l-13.507541-52.461042Z"
              transform="translate(.000002 0.000004)"
            />
            <text
              dx="0"
              dy="0"
              fontFamily='"eBHsLTiXjpU1:::Roboto"'
              fontSize="10"
              fontWeight="400"
              transform="translate(421 596) rotate(180)" //transform="translate(396.673075 590.013135)"
              strokeWidth="0"
              className="text-common"
            >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                IAMK
              </tspan>
              <tspan x="0" y="10" fontWeight="400" strokeWidth="0">
                Decanato
              </tspan>
            </text>
          </g>

          {/*......................................................:Baños:...................................................... */}
          <g
            transform="translate(.000001 0)"
            style={{
              fill: mapColors.banios.fill,
              stroke: mapColors.banios.stroke,
              strokeWidth: mapColors.banios.strokeWidth
            }}
          >
            <path
              d="M374.849922,568.218955c-10.749453.78454-32.279669.999543-43.060431.435108l-4.526401,54.915969c13.249275,1.059387,39.086713.957775,51.706554-.440808l-4.119722-54.910269Z"
              transform="translate(.000001 0.000001)"
            />
            <text
              dx="0"
              dy="0"
              fontFamily='"eBHsLTiXjpU1:::Roboto"'
              fontSize="10"
              fontWeight="400"
              transform="translate(365 603) rotate(180)" //transform="translate(345.673075 592.013135)"
              strokeWidth="0"
            >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                Baños
              </tspan>
            </text>
            <Toilet
              className="icon-common"
              transform="translate(362 601) rotate(180)"
              size={18}
            />{' '}
            //transform="translate(345.8 592.5)"
          </g>
          <g
            transform="matrix(1.015533 0.155046-.14689 0.962114-106.829819-47.308686)"
            style={{
              fill: mapColors.banios.fill,
              stroke: mapColors.banios.stroke,
              strokeWidth: mapColors.banios.strokeWidth
            }}
          >
            <path
              d="M242.704333,460.637516c0,0-16.344838-12.22501-16.344838-12.22501l19.13844-17.251778l14.600957,10.41137-17.394559,19.065418Z"
              transform="matrix(.853824 0.003904-.00414 0.905589 144.391316 68.324917)"
            />
            <text
              dx="0"
              dy="0"
              fontFamily='"eBHsLTiXjpU1:::Roboto"'
              fontSize="6.5"
              fontWeight="400"
              transform="translate(358 474) rotate(180)"
              strokeWidth="0"
            >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                Baños
              </tspan>
            </text>
            <Toilet
              className="icon-common"
              transform="translate(357 474) rotate(180)"
              size={10}
            />
          </g>
        </g>
      </svg>
    </>
  )
}
