export enum VideoResolution {
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
}

export type Video = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: null;
    createdAt: Date;
    publicationDate: Date;
    availableResolutions: VideoResolution[];
};