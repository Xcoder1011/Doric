import { View, Group } from "./view";
import { Root } from '../widget/layouts';
import { BridgeContext } from '../runtime/global';
export declare function NativeCall(target: Panel, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor;
export declare abstract class Panel {
    private destroyed;
    context: BridgeContext;
    onCreate(): void;
    onDestroy(): void;
    onShow(): void;
    onHidden(): void;
    onEnvChanged(): void;
    /**
     * Build view of the current Panel
     * This could be called any times at any time when necessary.
     * @param rootView root view of this panel
     */
    abstract build(rootView: Group): void;
    private __data__?;
    private __root__;
    private headviews;
    private onRenderFinishedCallback;
    private __rendering__;
    addHeadView(type: string, v: View): void;
    allHeadViews(): IterableIterator<Map<string, View>>;
    removeHeadView(type: string, v: View | string): void;
    clearHeadViews(type: string): void;
    getRootView(): Root;
    getInitData(): object | undefined;
    private __init__;
    private __onCreate__;
    private __onDestroy__;
    private __onShow__;
    private __onHidden__;
    private __build__;
    private __onEnvChanged__;
    private __response__;
    private retrospectView;
    private snapshotEnabled;
    private renderSnapshots;
    private __renderSnapshotDepth__;
    private __restoreRenderSnapshot__;
    private __enableSnapshot__;
    private nativeRender;
    private hookBeforeNativeCall;
    private hookAfterNativeCall;
    onRenderFinished(): void;
    addOnRenderFinishedCallback(cb: () => void): void;
}
