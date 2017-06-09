import { KeyframeInfo } from "tns-core-modules/ui/animation/keyframe-animation";
export interface Keyframe {
    [key: string]: string | number;
}
export declare function getAnimationCurve(value: string): any;
export declare function parseAnimationKeyframe(styles: Keyframe): KeyframeInfo;
