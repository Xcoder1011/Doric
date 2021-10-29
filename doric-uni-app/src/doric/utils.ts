import { NativeViewModel } from "doric"

export interface DoricModel {
  nativeViewModel: NativeViewModel
  contextId: string
  cssStyle: Record<string, string>
  idList: string[]
}

export function toCSSStyle(css: Record<string, any>) {
  return Object.entries(css).map(e => `${e[0]}:${e[1]}`).join(";")
}

export function getChildren(doricModel: DoricModel): DoricModel[] {
  if (doricModel.nativeViewModel.props.children) {
    const childrenViewIds = doricModel.nativeViewModel.props.children as string[]
    const subviews = doricModel.nativeViewModel.props.subviews as NativeViewModel[]
    if (childrenViewIds.length != subviews.length) {
      return []
    }
    return childrenViewIds.map(e => {
      const nativeViewModel = subviews.find(subview => subview.id === e) as NativeViewModel;
      return {
        contextId: doricModel.contextId,
        nativeViewModel: nativeViewModel,
        cssStyle: {},
        idList: [...doricModel.idList, nativeViewModel.id]
      }
    })
  }
  return []
}


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