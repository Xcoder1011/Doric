import { BridgeContext, Panel, ClassType } from "doric";

const gContexts: Map<string, Context> = new Map

export function createContext(contextId: string, clz: ClassType<Panel>) {
  const context = new Context(contextId, clz)
  gContexts.set(contextId, context)
  return context;
}

export function destroyContext(contextId: string) {
  gContexts.delete(contextId)
}
export function obtainContext(contextId:string){
  return gContexts.get(contextId)
}

export class Context implements BridgeContext {
  id: string;
  entity: Panel;
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