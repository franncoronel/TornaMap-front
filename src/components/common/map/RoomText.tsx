interface RoomTextLine {
  text: string
  fontWeight?: '400' | '700'
  dx?: number
}

interface RoomTextProps {
  x: number
  y: number
  lines: RoomTextLine[]
  rotate?: number
  fontSize?: number
  color?: string
  lineHeight?: number
  className?: string
}

/** Devuelve '#FFFFFF' o '#000000' según el contraste con el fondo */
export function getContrastTextColor(hexBg: string): string {
  const hex = hexBg.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

export default function RoomText({
  x,
  y,
  lines,
  rotate = 0,
  fontSize = 12,
  color,
  lineHeight,
  className,
}: RoomTextProps) {
  const leading = lineHeight ?? fontSize

  const transform = rotate
    ? `translate(${x} ${y}) rotate(${rotate})`
    : `translate(${x} ${y})`

  return (
    <text
      dx="0"
      dy="0"
      fontFamily='"eBHsLTiXjpU1:::Roboto"'
      fontSize={fontSize}
      fontWeight="400"
      fill={color}
      strokeWidth="0"
      transform={transform}
      className={className}
    >
      {lines.map((line, i) => (
        <tspan
          key={i}
          x={line.dx ?? 0}
          y={i * leading}
          fontWeight={line.fontWeight ?? '700'}
          strokeWidth="0"
        >
          {line.text}
        </tspan>
      ))}
    </text>
  )
}