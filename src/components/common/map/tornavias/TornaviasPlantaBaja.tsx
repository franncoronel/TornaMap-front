import { Toilet, File, BookOpenText, ForkKnife } from '@phosphor-icons/react'
import { mapColors } from '../../../pages/map/mapColors'

interface TornaviasPlantaBajaProps {
  selectedCode?: string // Cambiado de selectedClassRoomId
  onClassRoomClick?: (id: number) => void
  handleOpen?: (classRoomId: string) => void
}

export default function TornaviasPlantaBaja({
  selectedCode,
  handleOpen
}: TornaviasPlantaBajaProps) {
  const isSelected = (id: string) => id === selectedCode
  return (
    <>
      <svg
        id="ez5G7WgO1Yc1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 850 800"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        project-id="e064b5b78f4a437ab47f81641934d1d6"
        export-id="a378b810c994404b89b533e30eb5e29c"
      >
        {/* Contorno */}
        <g
          style={{
            fill: mapColors.outline.fill,
            stroke: mapColors.outline.stroke,
            strokeWidth: mapColors.outline.strokeWidth
          }}
        >
          <path
            d="M393.434967,622.45109L361.389955,761.014188c-12.045056-2.500702-36.914015-10.167163-50.639109-16.622548-28.188266-11.761275-76.134169-38.146761-96.860674-56.841456-11.675318-10.002699-31.112229-29.383215-39.952712-39.396642s-31.316615-37.927674-37.738749-48.903556c-7.769695-11.375661-20.899771-37.348463-26.881886-51.754302-7.524262-16.006505-16.57747-43.512173-18.379217-54.826672-11.876921-37.076588-15.25497-119.360862-6.526565-164.664187l13.885113-49.964157c7.656464-21.419613,23.527679-57.353022,33.495407-72.302356c14.804805-21.647051,41.476481-56.781657,56.729003-69.14066c12.188595-13.145862,41.565076-37.048251,58.94766-48.158481c10.797487-6.907936,23.693782-13.888204,27.483814-15.269471c5.262795-2.966242,16.909923-8.288678,23.24501-10.792612c7.631781-3.878977,34.856084-13.581672,55.418094-19.573997c9.161356-3.529385,36.020294-8.769998,55.043665-9.490287c28.76484-2.042811,51.877312-2.255701,57.683908-1.256636c17.392439.50452,47.043968,4.527408,58.770122,8.507653c18.59274,4.504702,44.347489,12.195765,50.332495,15.637497l-18.764596,50.12741l13.549898,6.201291l7.087006-13.828307l30.578999,15.464616-51.974018,90.849854-30.809784-14.566451-8.371684,20.273489c-6.378755-2.402063-20.642842-6.642001-28.453168-8.526031-8.300412-2.062085-24.314807-4.590762-32.385984-4.843037-6.243546-.904545-22.789836-.508648-32.632525.478329-6.239656-.011875-21.023145,2.739168-29.453731,4.898115-9.343639,2.138684-23.696326,7.412689-31.08797,10.54801-16.436847,6.366003-42.037981,23.11009-52.284151,33.101789l-6.965518-6.709724c-23.453592,20.293213-48.36493,59.248585-56.64333,79.407625-5.139925,9.664688-11.503671,26.711802-11.254495,33.989013l9.845535,1.758311c-6.484372,27.844591-6.52878,77.462859,2.042407,98.684327c1.749958,7.062727,6.844911,21.1356,10.107866,28.166256c2.120821,6.673762,10.23231,21.18799,15.534955,30.404498c8.815689,14.90961,24.451077,32.268614,42.263239,46.648422c19.484774,15.730113,40.530364,28.895902,53.343154,32.309266l-7.327484,20.743791l32.045012,10.66891Z"
            transform="translate(.000007 0.000023)"
          />
          <path
            d="M473.357306,731.960946l-9.956914-105.150299c9.869602-1.359224,27.696067-4.185619,35.652929-5.814657l-5.205344-21.745981c8.622728-2.35532,23.910316-7.73612,30.377302-11.025432c6.651028-2.567053,18.984655-9.055635,24.943967-12.838807c5.810937-3.229857,17.756227-12.264616,24.266612-17.77757c15.437934-14.032125,38.097556-40.315829,43.700744-52.843631c4.566201-7.623632,11.834609-22.133013,14.30839-29.018763c2.884691-8.301313,7.504456-24.005743,9.1826-31.987689c4.260468-10.992258,4.748471-42.776022,3.467692-61.742856-1.15308-16.69885-7.266078-46.624774-14.382679-60.271667-6.312569-14.904709-23.895406-43.224239-35.759528-56.169204l17.302296-15.618051c-5.567837-5.450061-17.996025-16.77237-24.779083-22.65651l89.188461-108.573193c13.2394,11.313853,33.923492,29.566031,39.715411,36.504357c22.920836,23.485462,53.084932,74.471787,63.413497,101.97265c5.947514,12.107483,14.629158,40.201808,18.546623,56.18865c3.785983,11.207328,7.361447,37.758805,8.942481,53.658211c1.80319,11.811663,1.55905,40.051235.671495,56.479144-.430906,14.075897-4.593964,42.72973-8.185416,57.307667-1.500894,12.396573-9.759066,39.477812-15.690118,54.162479-5.089247,14.355482-17.946986,41.360513-25.992051,54.033459-5.599409,10.975351-25.967169,37.855763-38.637724,53.513211-8.007977,9.866033-27.89281,29.936384-39.940122,40.166926-7.35038,7.153762-29.93386,23.603083-44.340737,32.743724-7.252635,5.142585-29.914149,17.247729-44.016314,24.373628-4.709507,2.464197-18.824256,7.468781-27.59247,10.07287-6.968432,2.482475-20.944767,6.473355-28.148173,7.835136l-12.662721-49.604982c-5.878874,1.184188-14.157885,2.890342-16.745223,3.225112l2.253972,15.779416-33.899855,4.822652Z"
            transform="translate(.000006 0.000005)"
          />
          <path d="M98.296163,278.040692l50.928912,18.208544c12.244624-44.483163,58.784276-108.742515,89.429102-133.840488" />
        </g>
        <g
          style={{
            fill: mapColors.outline.fill,
            stroke: mapColors.outline.strokeRestrictedArea,
            strokeWidth: mapColors.outline.strokeWidth
          }}
        >
          <path
            d="M216.419544,586.531969c-14.464825-18.725684-29.300011-42.353266-36.643867-59.308591q19.70906-9.646336,19.70906-9.646336c0,0,8.863192,18.992353,33.995651,54.647163l-17.060844,14.307764Z"
            transform="translate(0 0.000003)"
          />
          <path
            d="M628.83023,599.139475l15.205409,16.145616c15.140753-14.901925,41.466586-45.431808,56.69469-75.474026l-19.665218-10.647747c-8.690629,19.534701-35.267687,54.158915-52.234881,69.976157Z"
            transform="translate(.000004 0.000001)"
          />
          <path
            d="M710.232435,363.459095l22.189237-2.969563c-2.345144-17.591707-11.629836-51.652568-18.795399-68.096608l-20.226284,7.272371c6.834378,15.863328,15.214098,47.760228,16.832446,63.7938Z"
            transform="translate(.000001 0.000001)"
          />
        </g>
        {/*Entradas*/}
        <g style={{ fill: mapColors.entry.fill }}>
          <polygon
            points="50,23.15 19,76.85 81,76.85 50,23.15"
            transform="matrix(.029599-.139461 0.137739 0.029234 367.403998 685.431392)"
          />
          <polygon
            points="50,23.15 19,76.85 81,76.85 50,23.15"
            transform="matrix(.009224 0.142268-.140512 0.00911 479.349355 678.358042)"
          />
          <polygon
            points="50,23.15 19,76.85 81,76.85 50,23.15"
            transform="matrix(-.041435 0.136413-.134729-.040923 649.226357 456.33057)"
          />
          <polygon
            points="50,23.15 19,76.85 81,76.85 50,23.15"
            transform="matrix(-.087297 0.112715-.111323-.086219 637.128031 182.59285)"
          />
          <polygon
            points="50,23.15 19,76.85 81,76.85 50,23.15"
            transform="matrix(.07182-.123155 0.121635 0.070933 573.89858 151.315804)"
          />
          <polygon
            points="50,23.15 19,76.85 81,76.85 50,23.15"
            transform="matrix(.135544-.044194 0.043648 0.133871 368.139972 199.287295)"
          />
          <polygon
            points="50,23.15 19,76.85 81,76.85 50,23.15"
            transform="matrix(.047529-.134411 0.132752 0.046942 226.557317 340.061638)"
          />
          <polygon
            points="50,23.15 19,76.85 81,76.85 50,23.15"
            transform="matrix(-.064974-.1269 0.125334-.064172 257.711395 507.403326)"
          />
        </g>
        {/* Escaleras y Rampla */}
        <g
          style={{
            fill: mapColors.ladder.fill,
            stroke: mapColors.outline.stroke,
            strokeWidth: mapColors.ladder.strokeWidth
          }}
        >
          {/* Rampla */}
          <path
            d="M496.192999,111.659785c-42.846197-9.94209-112.444355-3.164017-142.509187,9.438721l6.540964,19.474088c23.707733-10.239713,84.909576-17.582524,132.186167-9.009367"
            transform="matrix(.999983-.005794 0.005794 0.999983-.842092 1.69671)"
          />
          <path
            d="M495.078007,119.682185c-38.732323-9.099701-102.75822-3.519551-131.420241,6.978778"
            transform="matrix(.999983-.005794 0.005794 0.999983-.824957 1.722331)"
          />
          <path
            d="M493.74183,123.731865c-33.315014-7.873513-98.015663-4.513634-129.365394,7.28525"
            transform="matrix(.999983-.005794 0.005794 0.999983-.849316 1.720608)"
          />
          {/* Escaleras*/}
          <path
            d="M170.253401,191.140267l-58.671007,91.646276l11.943705,4.267917l56.922426-89.741944"
            transform="translate(0 0.000002)"
          />
          <path
            d="M309.018721,139.339292c7.637049-4.976207,25.742844-12.73794,36.559039-15.777786l7.428261,19.439918c-9.290352,2.367382-25.273557,10.141115-34.123488,14.650496l-9.863812-18.312628Z"
            transform="translate(0 0.000003)"
          />
          <path
            d="M244.542851,586.267732c6.848,7.186274,20.927867,20.071717,28.232859,26.09995l-12.851361,16.47663c-7.91767-6.02195-22.485599-19.591285-29.726453-27.279458l14.344955-15.297122Z"
            transform="translate(0 0.000003)"
          />
          <path
            d="M290.336534,626.013412c10.925412,6.878169,31.738106,18.960895,41.064619,23.351154l-9.319505,20.30243c-12.951172-6.082853-35.074527-18.784399-43.920633-25.51722l12.175519-18.136364Z"
            transform="translate(0 0.000001)"
          />
          <path
            d="M615.035762,611.77207l14.326317,16.795656c-15.131234,13.286408-44.081485,30.741334-59.550651,38.66321L559.669054,647.97601q40.406719-23.097929,55.366708-36.20394Z"
            transform="translate(.000002 0)"
          />
          <path
            d="M648.753144,222.699226l16.027493-13.355384c12.838075,14.451139,31.826652,44.378562,38.048719,59.845305l-18.989578,10.058835c-7.233235-14.358773-24.807688-42.625965-35.086634-56.548756Z"
            transform="translate(.000001 0.000001)"
          />
          <path
            d="M707.48608,452.483539l21.049481,4.059859c3.968386-15.690768,6.041212-50.801003,5.672502-70.390121h-21.901317c1.288059,16.778372.012733,49.574819-4.820666,66.330262Z"
            transform="translate(.000001 0)"
          />
          <path
            d="M473.345245,731.958453l2.089055,23.764452-36.648843,2.374681-1.024526-24.232258l35.584314-1.906875Z"
            transform="translate(.000001 0)"
          />
          <path
            d="M473.345245,731.958453l2.089055,23.764452-36.648843,2.374681-1.024526-24.232258l35.584314-1.906875Z"
            transform="matrix(.612096 0.385465-.520674 0.8268 733.569399-682.973719)"
          />
          <path
            d="M231.24261,601.122845l15.977745-14.179977c1.061258,1.145564,2.189604,2.318601,3.378225,3.514202c20.608867,20.729894,59.337712,48.24322,80.674972,56.956255l-9.349419,19.237647c-25.970083-11.204098-67.158688-41.127792-87.130707-61.713115-1.272938-1.312028-2.459688-2.58612-3.550816-3.815012Z"
            transform="matrix(.666526 0.745482-.745482 0.666526 445.314557-198.414788)"
          />
        </g>
        {/* Escalones */}
        <g
          style={{
            fill: mapColors.ladder.fill,
            stroke: mapColors.outline.stroke,
            strokeWidth: mapColors.ladder.strokeWidthStep
          }}
        >
          <path
            d="M121.608924,266.949109l10.409367,6.752875l2.853766-4.517707-10.163226-6.845909l3.02351-4.867637l10.281913,6.807003l6.37482-10.130499-10.348012-6.42206l3.1-4.84l10.389,6.337813l2.750273-4.287407-10.230822-6.579776l2.879724-4.490857l10.401607,6.244946l2.714431-4.338691-10.56-5.94l6.7813-10.61493l10.145045,6.471817l2.902006-4.469324-10.196535-6.402499l3.04-4.76l10.257066,6.184201"
            transform="translate(0 0.000003)"
          />
          <path
            d="M291.487172,649.596672l11.245056-17.735453-4.282123-3.018653-11.408532,17.873013-4.506053-3.135962l11.975522-17.403803-3.856247-2.768872-12.319124,17.106284-4.203347-3.262887l12.573421-16.676888-3.525375-2.809632-12.993688,16.342402-3.440231-3.090925l12.938359-16.326294"
            transform="matrix(-.501856 0.864951-.864951-.501856 1021.274862 210.805899)"
          />
          <path
            d="M283.012316,617.574928l-12.32295,17.004268-3.873284-2.783551l12.32031-17.127571-4.064183-3.082083-12.426295,17.084088-4.406627-3.473773l13.169955-16.499264-3.853523-3.122442-13.090526,16.505579-4.118591-3.370009l13.394191-16.260808-3.723637-3.087794-13.522243,16.060243"
            transform="matrix(.997148 0.075466-.075466 0.997148 33.706332-27.752802)"
          />
          <path
            d="M299.528255,628.379483L286.93386,646.834148l-4.160576-2.765281l13.064862-18.107882-3.701565-2.628389-12.905793,18.375162-4.556078-3.101905l13.044793-18.326948-3.770481-2.736328-13.194773,18.200435-4.303198-3.15872l13.706259-17.824097-4.040337-2.990207-13.807135,17.707228-4.109687-3.265005l13.856556-17.458552-3.664676-2.785346-14.037041,17.077205"
            transform="matrix(.994334-.106304 0.106304 0.994334-36.8902 54.564098)"
          />
          <path
            d="M322.831872,643.140415l-9.983554,19.648323-4.821172-2.582772l10.498225-19.524045-4.277096-2.397693-10.832408,19.286378-4.183863-2.561647l11.305673-18.995592-4.165645-2.624482-11.545474,18.845977-4.313239-2.643001l11.952824-18.754089-3.718369-2.557445-11.934879,18.656-4.955722-3.275307l12.93393-18.014584-3.950383-2.678993-13.146109,17.793069-4.24939-3.013684l13.632474-17.479812-3.838379-2.980987-13.689901,17.622498-4.19437-3.095876l13.92741-17.162884-3.776205-2.974942-14.20306,16.951017"
            transform="matrix(.401187-.915996 0.915996 0.401187-107.201232 652.541854)"
          />
          <path
            d="M322.704327,643.444607l-9.597593,18.870942-4.855184-2.435573l10.194965-18.985083-4.19824-2.610665-10.402936,19.054465-4.556376-2.542823l11.248714-18.782503-4.165645-2.624482-11.491337,18.817075-4.285179-2.738461l11.870627-18.629727-3.718369-2.557445-12.180028,18.574722-4.823184-3.158516l13.124199-18.135781-4.032134-2.654187-13.147186,18.036429-4.301098-3.103253l13.689352-17.572725-4.043174-2.885722-13.556845,17.534526-4.141831-3.179218l13.94661-17.086835-3.935172-2.918286-13.925093,16.836383"
            transform="matrix(-.911134-.412109 0.412109-.911134 680.353019 945.71197)"
          />
          <path
            d="M299.772901,655.07508l11.113089-18.568044-4.523444-2.583787-11.058658,18.477099-4.155853-2.487304l11.058658-18.477098-4.459485-2.669029-10.813349,18.067231-4.23832-2.536661l11.309799-17.770105-4.304284-3.004656-11.121331,17.726755-4.632383-2.772509l11.349225-17.59036-3.759931-2.931406-11.375796,17.634757-4.001714-2.935432l11.663655-17.445317-3.994952-2.953146-12.005784,17.181719-3.888742-3.004076l12.26778-17.068932-3.351532-2.860919-13.062885,16.786162-3.432521-3.050858l13.377867-16.646848"
            transform="matrix(-.513553-.858058 0.858058-.513553 326.064971 984.516247)"
          />
          <path
            d="M438.785458,753.693269l36.314535-2.5-.348555-3.399618-36.351445,2.314054-.15-3.443861l36.15-2.214983-.3-3.7-35.909387,2.312295-.190613-3.729482l35.811183-2.138909-.311183-3.32744-35.739068,2.05635"
            transform="translate(.000007 0.806731)"
          />
          <path
            d="M438.785458,753.693269l36.314535-2.5-.348555-3.399618-36.351445,2.314054-.15-3.443861l36.15-2.214983-.3-3.7-35.909387,2.312295-.190613-3.729482l35.811183-2.138909-.311183-3.32744-35.739068,2.05635"
            transform="matrix(.612096 0.385465-.520674 0.8268 732.837024-682.097836)"
          />
          <path
            d="M318.000828,664.855625l9.262802-19.174452-4.588326-2.229948-9.689356,18.9644-4.26512-2.32l10.033188-18.765055-4.1-2.311817-10.471971,18.574217-4.36-2.6l10.720501-18.449721-4.18-2.62-10.676865,18.469308-4.62-2.9L302.261124,631.345l-3.812304-2.302247-11.51496,17.791395-4.160576-2.765281l11.895869-17.841925-4.014358-2.82-11.611849,17.923628-4.753228-3.337467l12.644142-17.206161-4.160576-3.118066-12.575682,17.115529-3.885168-2.564514l12.730512-17.295667-3.78-2.949762L262.3767,629.042753l-4.459943-3.36l13.55673-16.839106-3.38-2.635409-13.485359,16.608553-4.432196-3.677467l14.487161-15.791613-3.425149-2.971271-14.428149,16.013295-3.982647-3.675694l15.089609-15.255315-3.974734-3.665881-15.221415,15.050802-3.927196-3.905797l15.805154-14.480787"
            transform="matrix(.666526 0.745482-.745482 0.666526 445.314557-198.414788)"
          />
        </g>
        {/* Flechas */}
        <g
          style={{
            fill: mapColors.arrow.fill,
            stroke: mapColors.arrow.stroke,
            strokeWidth: mapColors.arrow.strokeWidth
          }}
        >
          <g transform="matrix(-.170625-.096442 0.086213-.152529 109.852169 277.20303)">
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
          <g transform="matrix(-.020642 0.194905-.174234-.018453 489.329685 125.094061)">
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
          <g transform="matrix(-.10329-.166569 0.148903-.092335 310.484334 138.751522)">
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
          <g transform="matrix(.111677-.161066 0.143984 0.099833 293.830444 628.778914)">
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
          <g transform="matrix(-.116917 0.157304-.140621-.104517 256.982875 625.879725)">
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
          <g transform="matrix(-.078138-.179745 0.160682-.069851 559.405392 649.761943)">
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
          <g transform="matrix(-.195985 0.001948-.001741-.175199 447.871394 755.424221)">
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
          <g transform="matrix(-.19256-.036531 0.032656-.172138 708.288864 451.305877)">
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
          <g transform="matrix(.139781-.137387 0.122816 0.124956 665.324112 209.871577)">
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
          <g transform="matrix(.175385 0.087489-.07821 0.156784 640.320253 105.026695)">
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
          <g transform="matrix(.194472 0.024385-.021798 0.173847 172.017484 380.774509)">
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
        {/* Biblioteca */}
        <g
          style={{
            fill: mapColors.library.fill,
            stroke: mapColors.library.stroke,
            strokeWidth: mapColors.library.strokeWidth
          }}
        >
          <path
            d="M186.821487,136.90078c45.944934-44.180658,65.391363-52.399969,86.431474-63.427951L243.726743,17.521958C89.993867,93.325833,23.699056,265.91059,21.799023,316.239435q-.007861.208217,60.912941,12.068518c5.536115-22.277901,15.563544-59.41054,22.866899-73.697439v0l10.009729-21.746533v0c4.634362-8.465639,12.226161-24.163364,18.160404-32.040339c0,0,0,0,0,0s7.440345-10.012112,13.801238-19.072856c9.233262-13.16609,27.5368-35.591093,39.271253-44.850006"
            transform="translate(1.699082-.303122)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            strokeWidth="0"
            transform="translate(90 170)"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Biblioteca
            </tspan>
            <tspan x="0" y="12" fontWeight="700" strokeWidth="0">
              Central
            </tspan>
          </text>
          <BookOpenText
            className="icon-common"
            size={25}
            x="95"
            y="185"
            /*  transform="translate(95 185)" */
          />
        </g>
        {/* Biblioteca - Zona restringida */}
        <g className="libraryRestrictedZone">
          <path
            d="M213.047798,305.285803l33.786987,13.792516c8.684855-22.65273,38.395474-64.610225,56.643328-79.407624l-24.691738-27.600226c-25.057535,19.955566-57.815585,66.60455-65.738577,93.215334Z"
            transform="translate(.000001 0)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            strokeWidth="0"
            transform="translate(225 305) rotate(-52)"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Biblioteca Central
            </tspan>
            <tspan x="0" y="12" fontWeight="700" strokeWidth="0">
              Zona Restringida
            </tspan>
          </text>
        </g>
        {/* .......................................................:Aulas:......................................................... */}
        {/* A1 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A1')}
          className={`classRoom ${isSelected('A1') ? 'selected' : ''}`}
        >
          <path
            d="M512.928028,93.672453c11.944716,2.700362,33.777158,9.044196,43.752717,12.656299l18.764596-50.127411c-8.200311-4.278074-34.013126-11.725643-50.332496-15.637496L512.928028,93.672453Z"
            transform="translate(.000001 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(535 78)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A1
            </tspan>
          </text>
        </g>
        {/* A2 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A2')}
          className={`classRoom ${isSelected('A2') ? 'selected' : ''}`}
        >
          <path
            d="M500.31631,149.081046c7.487088,1.447509,23.304624,6.225106,36.478944,11.277523l-20.054092,50.364672c-6.084496-2.321571-20.384546-6.492754-28.453168-8.526029l12.028316-53.116166Z"
            transform="translate(0 0.000003)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(501 185)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A2
            </tspan>
          </text>
        </g>
        {/* A3 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A3')}
          className={`classRoom ${isSelected('A3') ? 'selected' : ''}`}
        >
          <path
            d="M462.940163,86.346184c13.500263.914865,38.542423,4.508335,49.987862,7.326267l12.184821-53.108607c-12.061925-4.018794-41.301389-8.09695-58.770125-8.507654l-3.402558,54.289994Z"
            transform="translate(.000003 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(484 69)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A3
            </tspan>
          </text>
        </g>
        {/* A4 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A4')}
          className={`classRoom ${isSelected('A4') ? 'selected' : ''}`}
        >
          <path
            d="M488.287993,202.197212l12.028315-53.116164c-8.528883-2.155273-29.141575-5.194721-41.299114-6.09872l-3.115184,54.371848c8.891574.462243,25.003016,2.993172,32.385983,4.843036Z"
            transform="translate(.000002 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(468 177)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A4
            </tspan>
          </text>
        </g>
        {/* A5 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A5')}
          className={`classRoom ${isSelected('A5') ? 'selected' : ''}`}
        >
          <path
            d="M414.02035,87.281622c15.191994-1.305193,39.09013-1.427763,48.919812-.935439l3.402561-54.289992c-9.272594-1.564911-38.654138.022679-57.683908,1.256636l5.361535,53.968795Z"
            transform="translate(.000001 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(429 64)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A5
            </tspan>
          </text>
        </g>
        {/* A6 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A6')}
          className={`classRoom ${isSelected('A6') ? 'selected' : ''}`}
        >
          <path
            d="M319.565748,111.604373c5.835238-2.746279,17.436838-7.337733,23.233501-9.336112L325.27775,51.909095c-7.582971,2.530409-21.144366,7.63813-27.080693,10.468016l21.368691,49.227262Z"
            transform="translate(.000002 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(310 84)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A6
            </tspan>
          </text>
        </g>
        {/* A6 BIS */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A6BIS')}
          className={`classRoom ${isSelected('A6BIS') ? 'selected' : ''}`}
        >
          <path
            d="M342.799247,102.268263c6.875444-2.239378,18.985974-6.002836,24.402775-7.43606L353.61515,42.803115c-6.272459,1.739658-20.398462,6.360967-28.337402,9.105982l17.521499,50.359166Z"
            transform="translate(.000004 0)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="14.5"
            fontWeight="400"
            transform="translate(337 75)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A6
            </tspan>
            <tspan y="15" x="2" fontWeight="400" strokeWidth="0">
              BIS
            </tspan>
          </text>
        </g>
        {/* A7 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A7')}
          className={`classRoom ${isSelected('A7') ? 'selected' : ''}`}
        >
          <path d="M367.202026,94.832203c12.128687-3.332884,35.343102-6.854257,46.818324-7.550581l-5.361534-53.968794c-15.444814.626046-42.958866,4.702859-55.043662,9.490287l13.586872,52.029088Z" />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(379 67)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A7
            </tspan>
          </text>
        </g>
        {/* A8 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A8')}
          className={`classRoom ${isSelected('A8') ? 'selected' : ''}`}
        >
          <path d="M274.022341,206.945029l36.421292,39.43539c12.009296-11.719406,39.171505-28.241097,52.284151-33.101789l-21.052872-49.627238c-20.489948,7.526624-54.173738,29.397889-67.652571,43.293637Z" />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(310 209)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A8
            </tspan>
          </text>
        </g>
        {/* A9 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A9')}
          className={`classRoom ${isSelected('A9') ? 'selected' : ''}`}
        >
          <path
            d="M678.508829,300.299481c-6.750477-18.250848-28.604657-53.927891-44.340733-71.400199l-40.215014,36.675111c14.542258,16.666771,32.101285,46.469553,35.759525,56.169205l48.796222-21.444117Z"
            transform="translate(.000004 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(625 280)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A9
            </tspan>
          </text>
        </g>
        {/* A10 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A10')}
          className={`classRoom ${isSelected('A10') ? 'selected' : ''}`}
        >
          <path
            d="M644.09529,382.015267c-1.143131-16.660468-7.247018-46.999495-14.38268-60.27167l48.796222-21.444117c8.528969,16.897166,16.931624,55.142991,19.204673,76.566629q-53.618214,5.14916-53.618215,5.149158Z"
            transform="translate(.000001 0.000003)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(650 353)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A10
            </tspan>
          </text>
        </g>
        {/* A11 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A11')}
          className={`classRoom ${isSelected('A11') ? 'selected' : ''}`}
        >
          <path
            d="M678.508834,607.669105c10.83975-11.924186,26.232385-34.621776,32.556889-46.200462l46.020955,27.564616c-8.038058,15.057455-29.171153,41.719859-38.637724,53.513214l-39.94012-34.877368Z"
            transform="translate(.000001 0)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(705 607)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A11
            </tspan>
          </text>
        </g>
        {/* A12 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A12')}
          className={`classRoom ${isSelected('A12') ? 'selected' : ''}`}
        >
          <path
            d="M644.095295,642.546472c10.865644-10.141861,28.540689-27.642982,34.413538-34.877368l39.940122,34.877366c-8.605296,10.437152-28.384119,30.520616-39.940121,40.166927l-34.413539-40.166925Z"
            transform="translate(0 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(665 650)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A12
            </tspan>
          </text>
        </g>
        {/* A13 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A13')}
          className={`classRoom ${isSelected('A13') ? 'selected' : ''}`}
        >
          <path
            d="M606.976976,669.871815c9.99314-5.75313,27.663689-19.641026,37.118317-27.325345l34.413539,40.166925c-9.094788,8.601062-31.479735,24.638633-44.340732,32.743725l-27.191124-45.585305Z"
            transform="translate(.000002 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(629 683)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A13
            </tspan>
          </text>
        </g>
        {/* A14 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A14')}
          className={`classRoom ${isSelected('A14') ? 'selected' : ''}`}
        >
          <path
            d="M568.624129,690.619306c9.952047-4.587485,29.083602-14.993279,38.352847-20.747493l27.191125,45.585307c-8.810896,5.985619-30.994482,17.909293-44.016319,24.373626l-21.527653-49.21144Z"
            transform="translate(0 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(588 708)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A14
            </tspan>
          </text>
        </g>
        {/* A15 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A15')}
          className={`classRoom ${isSelected('A15') ? 'selected' : ''}`}
        >
          <path
            d="M617.136608,504.764575l46.100119,27.544393c-7.646298,13.91578-34.708485,48.088947-55.340079,66.941042l-34.460787-41.641807c15.506934-14.894561,38.840897-40.351288,43.700747-52.843628Z"
            transform="translate(.000003 0.000003)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(605 555)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A15
            </tspan>
          </text>
        </g>
        {/* A16 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A16')}
          className={`classRoom ${isSelected('A16') ? 'selected' : ''}`}
        >
          <path
            d="M546.215801,638.271223c4.743694-1.705548,15.928883-7.090259,31.101849-17.275224l-28.148399-45.610223c-5.938943,3.846215-18.418792,10.238881-24.943969,12.838807l21.990519,50.04664Z"
            transform="translate(.000003 0)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(538 613)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A16
            </tspan>
          </text>
        </g>
        {/* A17 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A17')}
          className={`classRoom ${isSelected('A17') ? 'selected' : ''}`}
        >
          <path d="M506.683509,651.420698c12.746688-3.315106,33.15614-9.511429,39.532292-13.149475l-21.990516-50.04664c-6.930454,3.36937-21.745469,8.808824-30.377302,11.025427l12.835526,52.170688Z" />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(505 625)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A17
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
            d="M350.016558,641.5878c-21.031572-9.02946-55.435434-28.160415-67.135151-40.127471l32.492885-42.731182c14.19937,12.084084,40.952526,29.634505,53.343151,32.309266L350.016558,641.5878Z"
            transform="translate(.000003 0)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(312 605)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A18
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
            d="M273.111053,512.080725c7.415474,13.710616,29.198574,36.776487,42.263239,46.648422l-32.492883,42.731182c-16.481705-10.310838-41.869802-41.583753-54.170306-60.848775l44.39995-28.530829Z"
            transform="translate(.000003 0)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(260 560)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A19
            </tspan>
          </text>
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
            d="M196.602536,465.685617l50.865693-12.175648c1.435027,6.533366,6.728039,20.357491,10.107866,28.166256l-48.033844,21.352206c-5.056943-8.523918-11.310316-27.238622-12.939715-37.342814Z"
            transform="translate(.000003 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(215 480)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A20
            </tspan>
          </text>
        </g>
        {/* A21 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A21')}
          className={`classRoom ${isSelected('A21') ? 'selected' : ''}`}
        >
          <path
            d="M330.122036,695.331972c-22.285376-7.317999-63.381103-32.18658-82.6538-48.795675l-33.578057,41.01391c18.882655,17.399928,68.1131,44.809819,96.860671,56.841456l19.371186-49.059691Z"
            transform="translate(.000003 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(263 703)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A21
            </tspan>
          </text>
        </g>
        {/* A22 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A22')}
          className={`classRoom ${isSelected('A22') ? 'selected' : ''}`}
        >
          <path
            d="M213.890178,687.550207l33.578054-41.013909c-11.556562-9.838524-28.950623-26.267106-35.213015-34.320464l-38.31775,35.937731c8.938435,10.011457,28.902021,29.599324,39.952711,39.396642Z"
            transform="translate(.000002 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(197 658)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A22
            </tspan>
          </text>
        </g>
        {/* A23 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A23')}
          className={`classRoom ${isSelected('A23') ? 'selected' : ''}`}
        >
          <path
            d="M173.937466,648.153564l38.317752-35.937731c-9.149931-9.618086-25.062728-30.766437-31.832377-42.291372l-44.224124,29.325548c6.823715,11.321972,25.667713,35.145244,37.738749,48.903555"
            transform="translate(.000001 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(160 618)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A23
            </tspan>
          </text>
        </g>
        {/* A24 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('A24')}
          className={`classRoom ${isSelected('A24') ? 'selected' : ''}`}
        >
          <path
            d="M180.422842,569.924463c-6.675661-9.907866-18.062322-31.719714-23.152769-43.393871l-47.953242,20.965115c5.261847,12.984189,18.343033,39.000345,26.881885,51.754301l44.224126-29.325545Z"
            transform="translate(.000003 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(130 568)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              A24
            </tspan>
          </text>
        </g>
        {/* //!Aulas Nuevas averiguar el nombre  -> Verificar si están bien diseñadas en el plano */}
        {/* T01 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('T01')}
          className={`classRoom ${isSelected('T01') ? 'selected' : ''}`}
        >
          <path
            d="M188.542523,385.461567L225.810828,385.5c-.881459,17.006431,1.614107,56.807516,7.724323,74.410884l-38.110792,8.605507c-6.029744-19.316402-7.60134-63.513123-6.881836-83.054824Z"
            transform="matrix(1.336062-.027544 0.02583 1.252917-182.263316-88.960178)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(95 447)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              T01
            </tspan>
          </text>
        </g>
        {/* T02 */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('T02')}
          className={`classRoom ${isSelected('T02') ? 'selected' : ''}`}
        >
          <path
            d="M206.728211,601.544616c-9.097845-10.027013-19.662447-23.690339-24.771094-33.577133L137.358318,596.66205c9.959006,15.197656,23.748828,33.087613,31.349973,40.76146l38.01992-35.878894Z"
            transform="matrix(.733845 0.679317-.679317 0.733845 497.727602-185.580932)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(197 380)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              T02
            </tspan>
          </text>
        </g>
        {/*  */}
        <g
          style={{
            fill: mapColors.classrooms.fill,
            stroke: mapColors.classrooms.stroke,
            strokeWidth: mapColors.classrooms.strokeWidth
          }}
          onClick={() => handleOpen?.('T0??')}
          className={`classRoom ${isSelected('T0??') ? 'selected' : ''}`}
        >
          <path
            d="M196.60254,465.68562l50.865688-12.17565c-5.105963-11.43358-7.718256-40.273648-6.673792-57.216493l-52.27387.501955c-.189533,17.245473,3.132068,51.609567,8.081974,68.890188Z"
            transform="translate(.000004 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="15"
            fontWeight="400"
            transform="translate(207 432)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              T0?
            </tspan>
          </text>
        </g>
        {/* .......................................................:Laboratorios:......................................................................................... */}
        {/* Laboratorio de Física */}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('LF')}
          className={`classRoom ${isSelected('LF') ? 'selected' : ''}`}
        >
          <path d="M644.09529,382.015267l53.618216-5.149157c1.870369,18.730835-1.177904,58.107014-5.036627,78.911346l-52.049281-12.019333c4.238038-13.417239,4.905592-44.175459,3.467692-61.742856Z" />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(650 410)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="0" y="10" fontWeight="700" strokeWidth="0">
              Física
            </tspan>
          </text>
        </g>
        {/* Laboratorio de Química */}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('LQ')}
          className={`classRoom ${isSelected('LQ') ? 'selected' : ''}`}
        >
          <path
            d="M729.848675,278.040692l48.94499-20.837043c-9.462383-25.487248-39.384806-77.18636-63.413498-101.97265l-39.715411,35.671472c19.331483,21.545873,46.764892,65.068423,54.183919,87.138221Z"
            transform="translate(.000003 0)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(715 220)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="0" y="10" fontWeight="700" strokeWidth="0">
              Química
            </tspan>
          </text>
        </g>
        {/* Laboratorio de Biología */}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('LBI')}
          className={`classRoom ${isSelected('LBI') ? 'selected' : ''}`}
        >
          <path d="M746.031684,326.011547l51.308606-12.619248c-2.866748-11.853755-11.084149-40.174065-18.546625-56.18865l-48.944987,20.837043c4.31331,8.225915,11.748444,32.619197,16.183006,47.970855Z" />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(745 295)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="0" y="10" fontWeight="700" strokeWidth="0">
              Biología
            </tspan>
          </text>
        </g>
        {/* Laboratorio de Biología */}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('LBII')}
          className={`classRoom ${isSelected('LBII') ? 'selected' : ''}`}
        >
          <path
            d="M753.495865,371.627002l52.786904-4.576492c-1.383803-13.661818-4.626156-40.553235-8.942481-53.658211l-51.308606,12.619245c3.302905,11.848883,6.68986,34.641635,7.464183,45.615458Z"
            transform="translate(.000002 0.000003)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(758 345)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="0" y="10" fontWeight="700" strokeWidth="0">
              Biología
            </tspan>
          </text>
        </g>
        {/* Laboratorio de Neuroingeniería */}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('LN')}
          className={`classRoom ${isSelected('LN') ? 'selected' : ''}`}
        >
          <path
            d="M753.495866,420.365744c.866196-11.731911,1.126698-36.204853,0-48.738742l52.786903-4.576493c1.894257,10.955076,1.385946,39.068081.671495,56.479143l-53.458398-3.163908Z"
            transform="translate(.000001 0.000003)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(758 393)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="0" y="10" fontWeight="700" strokeWidth="0">
              Neuroing.
            </tspan>
          </text>
        </g>
        {/* Laboratorio de Electrónica II*/}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('LE2')}
          className={`classRoom ${isSelected('LE2') ? 'selected' : ''}`}
        >
          <path
            d="M806.954264,423.529654l-53.458398-3.163908c-.183917,9.706394-3.47723,34.08643-6.41688,48.847472l51.689861,11.624104c3.768401-15.776431,7.844646-44.125494,8.185417-57.307668Z"
            transform="translate(.000001 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(756 445)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="-5" y="10" fontWeight="700" strokeWidth="0">
              Electrónica
            </tspan>
            <tspan x="16" y="20" fontWeight="700" strokeWidth="0">
              II
            </tspan>
          </text>
        </g>
        {/* Laboratorio de Termodinámica*/}{' '}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('LT')}
          className={`classRoom ${isSelected('LT') ? 'selected' : ''}`}
        >
          <path
            d="M783.07873,534.9998c5.932501-15.033337,14.360219-42.04395,15.690118-54.162479l-51.689863-11.624103c-1.893856,7.781901-8.059372,30.423946-13.686508,45.907206L783.07873,534.9998Z"
            transform="translate(.000002 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(743 500)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="-5" y="10" fontWeight="700" strokeWidth="0">
              Termodiná.
            </tspan>
          </text>
        </g>
        {/* Laboratorio de Computación IV */}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('LC4')}
          className={`classRoom ${isSelected('LC4') ? 'selected' : ''}`}
        >
          <path
            d="M711.065724,561.468643c7.928198-14.428356,19.708134-38.131889,22.326755-46.34822L783.07873,534.9998c-3.919149,11.468931-16.242515,38.379238-25.992051,54.033457l-46.020955-27.564614Z"
            transform="translate(0 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(730 548)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Lab. de
            </tspan>
            <tspan x="-5" y="10" fontWeight="700" strokeWidth="0">
              Comp. IV
            </tspan>
          </text>
        </g>
        {/* Ingeniería en Energía */}
        <g
          style={{
            fill: mapColors.lab.fill,
            stroke: mapColors.lab.stroke,
            strokeWidth: mapColors.lab.strokeWidth
          }}
          onClick={() => handleOpen?.('IEN')}
          className={`classRoom ${isSelected('IEN') ? 'selected' : ''}`}
        >
          <path d="M549.169254,575.385776c7.898751-4.666319,19.759674-13.837344,24.26661-17.77757l34.460785,41.641804c-8.888181,7.251522-23.190236,18.453662-30.578996,21.745986" />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(564 565) rotate(55)"
            strokeWidth="0"
          >
            <tspan y="0" x="3" fontWeight="700" strokeWidth="0">
              Ingeniería
            </tspan>
            <tspan x="0" y="10" fontWeight="700" strokeWidth="0">
              {' '}
              en Energía
            </tspan>
          </text>
        </g>
        {/* ...........................................:Bedelía:................................................................. */}
        {/* Bedelía CyT */}
        <g
          style={{
            fill: mapColors.bedelia.fill_CyT,
            stroke: mapColors.bedelia.stroke_CyT,
            strokeWidth: mapColors.bedelia.strokeWidth
          }}
          onClick={() => handleOpen?.('BCYT')}
          className={`classRoom ${isSelected('BCYT') ? 'selected' : ''}`}
        >
          <path
            d="M471.780968,715.457118c8.228336-.095124,24.952529-2.622144,33.222227-4.098234l2.253972,15.779415-33.899855,4.822651-1.576344-16.503832Z"
            transform="translate(0 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="9"
            fontWeight="400"
            transform="translate(474 726) rotate(-7)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Bedelía
            </tspan>
          </text>
        </g>
        {/* Bedelía AyP */}
        <g
          style={{
            fill: mapColors.bedelia.fill_ExHumanidades,
            stroke: mapColors.bedelia.stroke_ExHumanidades,
            strokeWidth: mapColors.bedelia.strokeWidth
          }}
          onClick={() => handleOpen?.('BAYP')}
          className={`classRoom ${isSelected('BAYP') ? 'selected' : ''}`}
        >
          <path
            d="M570.230642,112.530043c8.056228,3.876982,22.968092,11.55762,29.754353,15.384401l7.911652-13.748092-30.578999-15.464616-7.087006,13.828307Z"
            transform="translate(.000001 0)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="9"
            fontWeight="400"
            transform="translate(573 109) rotate(25)"
            strokeWidth="0"
            className="text-common"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Bedelía
            </tspan>
          </text>
        </g>
        {/* ..................................AyP //! Hay que actualizar los datos de la sección de ex-Humanidades */}
        {/* Sala de Prof AyP */}
        <g
          style={{
            fill: mapColors.humanidades.fill,
            stroke: mapColors.humanidades.stroke,
            strokeWidth: mapColors.humanidades.strokeWidth
          }}
        >
          <path
            d="M525.112846,190.449754l30.809784,14.566452l16.085864-28.032859c-7.029046-5.013683-24.83861-13.608648-35.213244-16.624776l-11.682404,30.091183Z"
            transform="translate(.000004 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            transform="translate(534 181)"
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
        {/* Departamento de servicios académicos EH */}
        <g
          style={{
            fill: mapColors.humanidades.fill,
            stroke: mapColors.humanidades.stroke,
            strokeWidth: mapColors.humanidades.strokeWidth
          }}
        >
          <path
            d="M459.017196,142.982326c-11.98079-.941199-31.695726-.447048-40.60859.534947l4.860879,54.315229c8.598158-.948591,24.775352-1.450442,32.632527-.478327l3.115184-54.371849Z"
            transform="translate(0 0.000003)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(433 195) rotate(-92)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Depto. de
            </tspan>
            <tspan y="10" x="0" fontWeight="700" strokeWidth="0">
              Servicios
            </tspan>
            <tspan y="20" x="0" fontWeight="700" strokeWidth="0">
              Academi.
            </tspan>
          </text>
        </g>
        {/* Cámara Gesell*/}
        <g
          style={{
            fill: mapColors.humanidades.fill,
            stroke: mapColors.humanidades.stroke,
            strokeWidth: mapColors.humanidades.strokeWidth
          }}
          onClick={() => handleOpen?.('CGES')}
          className={`classRoom ${isSelected('CGES') ? 'selected' : ''}`}
        >
          <path
            d="M418.408606,143.517274c-8.253008.539874-26.610644,3.298821-38.512331,6.416424l13.919479,52.79692c7.804107-2.107954,22.325769-4.690337,29.453731-4.898115"
            transform="translate(0 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(405 195) rotate(-92)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Cámara
            </tspan>
            <tspan y="10" x="0" fontWeight="700" strokeWidth="0">
              Gesell
            </tspan>
          </text>
        </g>
        {/* ..........................................:Consultorías:.......................................... */}
        {/* Información estudiantil */}
        <g
          style={{
            fill: mapColors.consultancy.fill,
            stroke: mapColors.consultancy.stroke,
            strokeWidth: mapColors.consultancy.strokeWidth
          }}
        >
          <path
            d="M611.255379,249.956345l22.912717-21.057066c-5.249803-6.594222-18.944855-19.660462-27.191123-26.168659l-20.500679,24.569214l24.779085,22.656511Z"
            transform="translate(.000002 0.000003)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(590 220)"
            strokeWidth="0"
          >
            <tspan y="0" x="9" fontWeight="700" strokeWidth="0">
              Info.
            </tspan>
            <tspan y="10" x="0" fontWeight="700" strokeWidth="0">
              estudia.
            </tspan>
          </text>
        </g>
        {/* Becas Unsam o algo así  */}
        {/* //todo: Fijarse el nombre de esta aula.... lo cambiaron hace poco */}
        <g
          style={{
            fill: mapColors.consultancy.fill,
            stroke: mapColors.consultancy.stroke,
            strokeWidth: mapColors.consultancy.strokeWidth
          }}
        >
          <path
            d="M617.136611,504.764578c4.524517-7.497886,11.742026-22.010435,14.308387-29.018766l50.42274,19.884001c-2.903436,8.247081-12.515773,26.58666-18.631011,36.679158l-46.100116-27.544393Z"
            transform="translate(.000003 0)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(635 500)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              PEUN
            </tspan>
            <tspan y="10" x="0" fontWeight="700" strokeWidth="0">
              CTS
            </tspan>
          </text>
        </g>
        {/* Punto Bienestar */}
        <g
          style={{
            fill: mapColors.consultancy.fill,
            stroke: mapColors.consultancy.stroke,
            strokeWidth: mapColors.consultancy.strokeWidth
          }}
        >
          <path
            d="M330.122037,695.331971c11.404956,4.134074,33.007349,11.189303,43.357359,13.332271l-12.089435,52.349969c-8.548164-2.158496-24.903146-5.585735-50.63911-16.622549l19.371186-49.059691Z"
            transform="translate(.000002 0.000002)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(325 740) rotate (-50)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Punto
            </tspan>
            <tspan y="10" x="0" fontWeight="700" strokeWidth="0">
              Bienestar
            </tspan>
          </text>
        </g>
        {/* .............................................Areas Comunes............................................................... */}
        {/* Buffet */}
        <g
          style={{
            fill: mapColors.commonAreas.fill,
            stroke: mapColors.commonAreas.stroke,
            strokeWidth: mapColors.commonAreas.strokeWidth
          }}
        >
          <path
            d="M360.984406,611.7822l-10.967845,29.805596c7.53233,4.331224,25.865205,9.397064,36.363173,11.365568l7.05524-30.502252L360.984406,611.7822Z"
            transform="translate(0 0.000004)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            transform="translate(355 634)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Buffet
            </tspan>
          </text>
          <ForkKnife
            className="icon-common"
            x="365"
            y="634"
            weight="fill"
            size={12}
          />
        </g>
        {/* Kiosco */}
        <g
          style={{
            fill: mapColors.commonAreas.fill,
            stroke: mapColors.commonAreas.stroke,
            strokeWidth: mapColors.commonAreas.strokeWidth
          }}
        >
          <path
            d="M615.067323,611.782202l14.175661-12.532189l14.852308,16.039949-14.382681,12.97438-14.645288-16.48214Z"
            transform="translate(0 0.000002)"
          />
        </g>
        {/* Fotocopiadora */}
        <g
          style={{
            fill: mapColors.commonAreas.fill,
            stroke: mapColors.commonAreas.stroke,
            strokeWidth: mapColors.commonAreas.strokeWidth
          }}
        >
          <path
            d="M690.000441,511.480927l20.515895,9.674161-9.590763,18.764541-20.349099-10.174553l9.423967-18.264149Z"
            transform="translate(.000002 0.000003)"
          />
          <File
            className="icon-common"
            x="688"
            y="517"
            weight="duotone"
            size={15}
          />
        </g>
        {/* Banco Patagonia */}
        <g
          style={{
            fill: mapColors.commonAreas.fill,
            stroke: mapColors.commonAreas.stroke,
            strokeWidth: mapColors.commonAreas.strokeWidth
          }}
        >
          <path
            d="M463.400398,626.810653l35.652929-5.814657l7.630179,30.424699c-25.899028,4.874683-39.567478,6.784805-40.340785,6.217712q0,0-2.942323-30.827754Z"
            transform="translate(.000003 0.000003)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="8"
            fontWeight="400"
            transform="translate(468 633) rotate(13)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Banco
            </tspan>
            <tspan y="10" x="0" fontWeight="700" strokeWidth="0">
              Patagonia
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
            d="M141.633724,480.441825c1.885297,11.342377,9.962114,34.31286,15.636347,46.088764l-47.95324,20.965119c-5.538477-11.306019-15.226386-37.736472-18.379217-54.826673l50.69611-12.22721Z"
            transform="translate(.000002 0.000003)"
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
            d="M521.748418,708.133772c5.632961-1.255523,17.503405-4.934538,23.649727-7.360303l17.161167,49.130148c-7.63957,2.659333-21.703674,6.716664-28.148173,7.835136l-12.662721-49.604981Z"
            transform="translate(0 0.000001)"
          />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="10"
            fontWeight="400"
            transform="translate(525 717) rotate(28)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Baños
            </tspan>
          </text>
          <Toilet className="icon-common" x="533" y="733" size={20} />
        </g>
        <g
          style={{
            fill: mapColors.banios.fill,
            stroke: mapColors.banios.stroke,
            strokeWidth: mapColors.banios.strokeWidth
          }}
        >
          <path d="M675.664757,118.726642c10.847813,9.265866,31.588695,27.302753,39.715411,36.504357l-39.715411,35.671472c-7.871394-8.863929-23.811064-25.405033-32.135423-33.060867l32.135423-39.114962Z" />
          <text
            dx="0"
            dy="0"
            fontFamily='"eBHsLTiXjpU1:::Roboto"'
            fontSize="12"
            fontWeight="400"
            transform="translate(660 147)"
            strokeWidth="0"
          >
            <tspan y="0" fontWeight="700" strokeWidth="0">
              Baños
            </tspan>
          </text>
          <Toilet className="icon-common" x="664" y="150" size={25} />
        </g>
        <g
          style={{
            fill: mapColors.banios.fill,
            stroke: mapColors.banios.stroke,
            strokeWidth: mapColors.banios.strokeWidth
          }}
        >
          <path
            d="M276.591796,133.990803c10.127024-6.183884,31.540262-17.410616,42.97395-22.38643L298.197057,62.377112c-13.641752,4.98679-38.272417,18.65979-50.728824,26.062083l29.123563,45.551608Z"
            transform="translate(.000002 0)"
          />
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
          <Toilet className="icon-common" x="272" y="95" size={25} />
        </g>
        <g className="maintenance">
          {/* Depósito */}
          <g>
            <path d="M238.654176,162.408747c8.314391-7.606929,27.219311-21.83379,37.937622-28.417944L247.468231,88.439194c-11.019304,6.538185-32.348185,23.971702-43.978162,34.022472l35.164107,39.947081Z" />
            <text
              dx="0"
              dy="0"
              fontFamily='"eBHsLTiXjpU1:::Roboto"'
              fontSize="12"
              fontWeight="400"
              transform="translate(215 129)"
              strokeWidth="0"
            >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                Depósito
              </tspan>
            </text>
          </g>
          {/* Limpieza */}
          <g>
            <path
              d="M545.398145,700.77347c8.721971-2.993329,19.984774-8.696205,23.225983-10.154164l21.527653,49.211442c-2.752341,1.595955-14.168785,5.958494-27.59247,10.07287L545.398145,700.77347Z"
              transform="translate(.000001 0)"
            />
            <text
              dx="0"
              dy="0"
              fontFamily='"eBHsLTiXjpU1:::Roboto"'
              fontSize="10"
              fontWeight="400"
              transform="translate(551 709) rotate(45)"
              strokeWidth="0"
            >
              <tspan y="0" fontWeight="700" strokeWidth="0">
                Limpieza
              </tspan>
            </text>
          </g>
        </g>
      </svg>
    </>
  )
}
