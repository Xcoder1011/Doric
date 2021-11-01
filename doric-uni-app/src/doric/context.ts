import {
  BridgeContext,
  Panel,
  ClassType,
  registerViewTreeObserver,
  uniqueId,
} from "doric";

const gContexts: Map<string, Context> = new Map();

const updator = () => {
  gContexts.forEach((context) => {
    context.hookAfter?.();
  });
  updatorTask = undefined;
};

let updatorTask: number | undefined = undefined;

registerViewTreeObserver(() => {
  if (updatorTask !== undefined) {
    return;
  }
  updatorTask = setTimeout(updator, 0);
});

export function callResponse(
  contextId: string,
  idList: string[],
  funcId: string,
  args?: any
) {
  return callEntityMethod(contextId, "__response__", idList, funcId, args);
}

export function callEntityMethod(
  contextId: string,
  methodName: string,
  ..._: any
) {
  const context = gContexts.get(contextId);
  if (context === undefined) {
    console.error(`Cannot find context for context id:${contextId}`);
    return;
  }
  if (context.entity === undefined) {
    console.error(`Cannot find holder for context id:${contextId}`);
    return;
  }

  if (Reflect.has(context.entity, methodName)) {
    const argumentsList: any = [];
    for (let i = 2; i < arguments.length; i++) {
      argumentsList.push(arguments[i]);
    }
    return Reflect.apply(
      Reflect.get(context.entity, methodName),
      context.entity,
      argumentsList
    );
  } else {
    console.error(
      `Cannot find method for context id:${contextId},method name is:${methodName}`
    );
  }
}

export function createContext(contextId: string, clz: ClassType<Panel>) {
  const context = new Context(contextId, clz);
  gContexts.set(contextId, context);
  return context;
}

export function destroyContext(contextId: string) {
  gContexts.delete(contextId);
}
export function obtainContext(contextId: string) {
  return gContexts.get(contextId);
}

let nativeBridge = function (
  contextId: string,
  namespace: string,
  method: string,
  callbackId?: string,
  args?: any
) {
  let context = obtainContext(contextId);

  if (context) {
    let plugin = context.plugins.get(namespace);
    if (plugin != null) {
      const argumentsList: any = [];
      for (let i = 3; i < arguments.length; i++) {
        argumentsList.push(arguments[i]);
      }
      let fun = Reflect.get(plugin, method);
      Reflect.apply(fun, plugin, argumentsList);
    }
  }
};

export function callResolve(contextId: string, callbackId: string, args?: any) {
  const context = gContexts.get(contextId);
  if (context === undefined) {
    console.error(`Cannot find context for context id:${contextId}`);
    return;
  }
  const callback = context.callbacks.get(callbackId);
  if (callback === undefined) {
    console.error(
      `Cannot find call for context id:${contextId},callback id:${callbackId}`
    );
    return;
  }
  const argumentsList: any = [];
  for (let i = 2; i < arguments.length; i++) {
    argumentsList.push(arguments[i]);
  }
  Reflect.apply(callback.resolve, context, argumentsList);
}

export function callReject(contextId: string, callbackId: string, args?: any) {
  const context = gContexts.get(contextId);
  if (context === undefined) {
    console.error(`Cannot find context for context id:${contextId}`);
    return;
  }
  const callback = context.callbacks.get(callbackId);
  if (callback === undefined) {
    console.error(
      `Cannot find call for context id:${contextId},callback id:${callbackId}`
    );
    return;
  }
  const argumentsList: any = [];
  for (let i = 2; i < arguments.length; i++) {
    argumentsList.push(arguments[i]);
  }
  Reflect.apply(callback.reject, context.entity, argumentsList);
}

export class Context implements BridgeContext {
  id: string;
  entity: Panel;
  hookAfter: Function | undefined;

  callbacks: Map<string, { resolve: Function; reject: Function }> = new Map();
  plugins: Map<string, object>;

  constructor(id: string, clz: ClassType<Panel>) {
    this.id = id;
    this.entity = new clz();
    this.entity.context = this;
    this.plugins = new Map();
  }
  callNative(namespace: string, method: string, args?: any): Promise<any> {
    const callbackId = uniqueId("callback");
    return new Promise((resolve, reject) => {
      this.callbacks.set(callbackId, {
        resolve,
        reject,
      });
      nativeBridge(this.id, namespace, method, callbackId, args);
    });
  }
  function2Id(func: Function): string {
    throw new Error("Method not implemented.");
  }
  removeFuncById(funcId: string): void {
    throw new Error("Method not implemented.");
  }
}

export type DoricPluginClass = { new (...args: any[]): {} };
export class DoricPlugin {
  context: Context;
  constructor(context: Context) {
    this.context = context;
  }
  onTearDown() {}
}
