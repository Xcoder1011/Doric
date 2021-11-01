import { callReject, callResolve, Context, DoricPlugin } from "../context";
import { BOTTOM, TOP, CENTER_Y } from "../utils";

export class Modal extends DoricPlugin {
  constructor(context: Context) {
    super(context);
  }

  public toast(callbackId: string, args: { msg: string; gravity: number }) {
    let position = "bottom";
    const gravity = args.gravity || BOTTOM;
    if ((gravity & TOP) == TOP) {
      position = "top";
    } else if ((gravity & BOTTOM) == BOTTOM) {
      position = "bottom";
    } else if ((gravity & CENTER_Y) == CENTER_Y) {
      position = "center";
    }

    uni.showToast({
      title: args.msg,
      position: position as "top" | "center" | "bottom",
      duration: 2000,
      icon: "none",
      success: () => {
        callResolve(this.context.id, callbackId);
      },
      fail: () => {
        callReject(this.context.id, callbackId);
      },
    });
  }

  public alert(callbackId: string, args: any) {}
}
