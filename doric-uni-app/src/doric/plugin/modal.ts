import { callReject, callResolve, Context, DoricPlugin } from "../context";

export class Modal extends DoricPlugin {
  constructor(context: Context) {
    super(context);
  }

  public toast(callbackId: string, args: any) {
    console.log(callbackId);
    console.log(args);
  }

  public alert(callbackId: string, args: any) {
    callResolve(this.context.id, callbackId, "123");
    console.log(callbackId);
    console.log(args);
  }
}
