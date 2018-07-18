import { LocationStrategy } from "@angular/common";
import { UrlSegmentGroup } from "@angular/router";
import { NavigationTransition } from "tns-core-modules/ui/frame";
import { FrameService } from "../platform-providers";
export interface NavigationOptions {
    clearHistory?: boolean;
    animated?: boolean;
    transition?: NavigationTransition;
}
export interface LocationState {
    state: any;
    title: string;
    queryParams: string;
    segmentGroup: UrlSegmentGroup;
    isRootSegmentGroup: boolean;
    isPageNavigation: boolean;
    isModalNavigation: boolean;
}
export declare class NSLocationStrategy extends LocationStrategy {
    private frameService;
    private statesByOutlet;
    private currentUrlTree;
    private currentOutlet;
    private popStateCallbacks;
    private _isPageNavigationBack;
    private _currentNavigationOptions;
    _isModalClosing: boolean;
    _isModalNavigation: boolean;
    constructor(frameService: FrameService);
    path(): string;
    prepareExternalUrl(internal: string): string;
    pushState(state: any, title: string, url: string, queryParams: string): void;
    pushStateInternal(state: any, title: string, url: string, queryParams: string): void;
    replaceState(state: any, title: string, url: string, queryParams: string): void;
    forward(): void;
    back(): void;
    canGoBack(): boolean;
    onPopState(fn: (_: any) => any): void;
    getBaseHref(): string;
    private callPopState(state, pop?);
    private peekState(name);
    toString(): string;
    _beginBackPageNavigation(name: string): void;
    _finishBackPageNavigation(): void;
    _isPageNavigatingBack(): boolean;
    _beginModalNavigation(): void;
    _beginCloseModalNavigation(): void;
    _finishCloseModalNavigation(): void;
    _beginPageNavigation(name: string): NavigationOptions;
    _setNavigationOptions(options: NavigationOptions): void;
    _getStates(): {
        [key: string]: Array<LocationState>;
    };
}
