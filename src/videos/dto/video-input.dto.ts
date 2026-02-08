import { VideoResolution } from "../types/video";

export type VideoInputDto = {
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    availableResolutions: VideoResolution[];

}