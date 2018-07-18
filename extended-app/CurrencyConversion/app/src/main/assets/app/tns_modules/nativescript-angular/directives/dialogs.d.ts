import { NgModuleRef, Type, ViewContainerRef } from "@angular/core";
import { NSLocationStrategy } from "../router/ns-location-strategy";
export interface ModalDialogOptions {
    context?: any;
    fullscreen?: boolean;
    animated?: boolean;
    stretched?: boolean;
    viewContainerRef?: ViewContainerRef;
    moduleRef?: NgModuleRef<any>;
}
export declare class ModalDialogParams {
    context: any;
    closeCallback: (...args) => any;
    constructor(context: any, closeCallback: (...args) => any);
}
export declare class ModalDialogService {
    private location;
    constructor(location: NSLocationStrategy);
    showModal(type: Type<any>, {viewContainerRef, moduleRef, context, fullscreen, animated, stretched}: ModalDialogOptions): Promise<any>;
    private _showDialog({containerRef, context, doneCallback, fullscreen, animated, stretched, pageFactory, parentView, resolver, type});
}
export declare class ModalDialogHost {
    constructor();
}
