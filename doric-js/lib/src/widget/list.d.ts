import { View, Superview, NativeViewModel } from "../ui/view";
import { Stack } from "./layouts";
import { BridgeContext } from "../runtime/global";
import { Color } from "../util/color";
export declare class ListItem extends Stack {
    /**
     * Set to reuse native view
     */
    identifier?: string;
    actions?: {
        title: string;
        backgroundColor?: Color;
        callback: () => void;
    }[];
}
export declare class List extends Superview {
    private cachedViews;
    allSubviews(): ListItem[];
    itemCount: number;
    renderItem: (index: number) => ListItem;
    batchCount: number;
    onLoadMore?: () => void;
    loadMore?: boolean;
    loadMoreView?: ListItem;
    onScroll?: (offset: {
        x: number;
        y: number;
    }) => void;
    onScrollEnd?: (offset: {
        x: number;
        y: number;
    }) => void;
    scrolledPosition?: number;
    scrollable?: boolean;
    /**
     * Take effect only on iOS
     */
    bounces?: boolean;
    scrollToItem(context: BridgeContext, index: number, config?: {
        animated?: boolean;
    }): Promise<any>;
    /**
     * @param context
     * @returns Returns array of visible view's index.
     */
    findVisibleItems(context: BridgeContext): Promise<number[]>;
    /**
     * @param context
     * @returns Returns array of completely visible view's index.
     */
    findCompletelyVisibleItems(context: BridgeContext): Promise<number[]>;
    reset(): void;
    private getItem;
    private renderBunchedItems;
    toModel(): NativeViewModel;
}
export declare function list(config: Partial<List>): List;
export declare function listItem(item: View | View[], config?: Partial<ListItem>): ListItem;
