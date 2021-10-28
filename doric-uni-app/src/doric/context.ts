import { BridgeContext, Panel, ClassType, registerViewTreeObserver } from "doric";

const gContexts: Map<string, Context> = new Map

const updator = () => {
  gContexts.forEach(context => {
    context.hookAfter?.()
  })
  updatorTask = undefined
}

let updatorTask: number | undefined = undefined

registerViewTreeObserver(() => {
  if (updatorTask !== undefined) {
    return
  }
  updatorTask = setTimeout(updator, 0)
})

export function callResponse(contextId: string, idList: string[], funcId: string, args?: any) {
  return callEntityMethod(contextId, "__response__", idList, funcId, args);
}

export function callEntityMethod(contextId: string, methodName: string, ..._: any) {
  const context = gContexts.get(contextId)
  if (context === undefined) {
    console.error(`Cannot find context for context id:${contextId}`)
    return
  }
  if (context.entity === undefined) {
    console.error(`Cannot find holder for context id:${contextId}`)
    return
  }

  if (Reflect.has(context.entity, methodName)) {
    const argumentsList: any = []
    for (let i = 2; i < arguments.length; i++) {
      argumentsList.push(arguments[i])
    }
    return Reflect.apply(Reflect.get(context.entity, methodName), context.entity, argumentsList)
  } else {
    console.error(`Cannot find method for context id:${contextId},method name is:${methodName}`)
  }
}

export function createContext(contextId: string, clz: ClassType<Panel>) {
  const context = new Context(contextId, clz)
  gContexts.set(contextId, context)
  return context;
}

export function destroyContext(contextId: string) {
  gContexts.delete(contextId)
}
export function obtainContext(contextId: string) {
  return gContexts.get(contextId)
}

export class Context implements BridgeContext {
  id: string;
  entity: Panel;
  hookAfter: Function | undefined

  constructor(id: string, clz: ClassType<Panel>) {
    this.id = id;
    this.entity = new clz
    this.entity.context = this
  }
  callNative(namespace: string, method: string, args?: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  function2Id(func: Function): string {
    throw new Error("Method not implemented.");
  }
  removeFuncById(funcId: string): void {
    throw new Error("Method not implemented.");
  }

}