import { forwardRef, ReactElement } from 'react'
import { Icon, IconBase, IconWeight } from '@phosphor-icons/react'

const weights = new Map<IconWeight, ReactElement>([
  ['thin', <></>],
  ['light', <></>],
  [
    'regular',
    <>
      <path
        d="M0,11.968446l73.998103-.052212l54.001896,17.236168l53.217207-16.982695l74.782792-.253473v213.994668l-74.782792-.459995-47.9536,16.111949h-10.667264l-48.598239-15.38884L0,226.258482L0,11.968446Z 
    M25.42677,38.455754L25.403768,200.54531l50.580257.026212L128,217.524829l51.231265-16.979519h51.240832v-162.089556h-51.240832L128.000001,53.858176L75.984025,38.455754h-50.557255Z"
        fill-rule="evenodd"
      />

      <path
        d="M0,11.968446l73.998103-.052212l54.001896,17.236168l53.217207-16.982695l74.782792-.253473v213.994668l-74.782792-.459995-47.9536,16.111949h-10.667264l-48.598239-15.38884L0,226.258482L0,11.968446Z 
  M25.42677,38.455754L25.403768,200.54531l50.580257.026212L128,217.524829l51.231265-16.979519h51.240832v-162.089556h-51.240832L128.000001,53.858176L75.984025,38.455754h-50.557255Z"
        fill-rule="evenodd"
      />
    </>
  ],
  ['bold', <></>],
  ['fill', <></>],
  ['duotone', <></>]
])

const UnsamIcon: Icon = forwardRef((props, ref) => (
  <IconBase ref={ref} {...props} weights={weights} />
))

UnsamIcon.displayName = 'CustomIcon'

export default UnsamIcon
