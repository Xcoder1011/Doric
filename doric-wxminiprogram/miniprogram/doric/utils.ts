
export function toRGBAString(color: number) {
  let strs = []
  for (let i = 0; i < 32; i += 8) {
      strs.push(((color >> i) & 0xff))
  }
  strs = strs.reverse()
  /// RGBAd
  return `rgba(${strs[1]},${strs[2]},${strs[3]},${strs[0] / 255})`
}

export function pixelString2Number(v: string) {
  return parseFloat(v.substring(0, v.indexOf("px")))
}

export function toPixelString(v: number) {
  return `${v}px`
}

const SPECIFIED = 1
const START = 1 << 1
const END = 1 << 2

const SHIFT_X = 0
const SHIFT_Y = 4

export const LEFT = (START | SPECIFIED) << SHIFT_X
export const RIGHT = (END | SPECIFIED) << SHIFT_X

export const TOP = (START | SPECIFIED) << SHIFT_Y
export const BOTTOM = (END | SPECIFIED) << SHIFT_Y

export const CENTER_X = SPECIFIED << SHIFT_X
export const CENTER_Y = SPECIFIED << SHIFT_Y

export const CENTER = CENTER_X | CENTER_Y