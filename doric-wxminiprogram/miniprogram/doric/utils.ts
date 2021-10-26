
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