import { VideoResolution } from "../types/video";

export type VideoInputDto = {
  title: string;
  author: string;
  availableResolutions: VideoResolution[];
};

  export type VideoUpdateDto = {
  title: string;
  author: string;
  availableResolutions: VideoResolution[];
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  publicationDate: string;
};

