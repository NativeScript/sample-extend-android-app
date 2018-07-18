import { Router, UrlTree, NavigationExtras } from "@angular/router";
import { NSLocationStrategy, NavigationOptions } from "./ns-location-strategy";
import { FrameService } from "../platform-providers";
export declare type ExtendedNavigationExtras = NavigationExtras & NavigationOptions;
export declare class RouterExtensions {
    router: Router;
    locationStrategy: NSLocationStrategy;
    frameService: FrameService;
    constructor(router: Router, locationStrategy: NSLocationStrategy, frameService: FrameService);
    navigate(commands: any[], extras?: ExtendedNavigationExtras): Promise<boolean>;
    navigateByUrl(url: string | UrlTree, options?: NavigationOptions): Promise<boolean>;
    back(): void;
    canGoBack(): boolean;
    backToPreviousPage(): void;
    canGoBackToPreviousPage(): boolean;
}
