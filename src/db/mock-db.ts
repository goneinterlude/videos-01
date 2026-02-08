import {Video, VideoResolution} from "../videos/types/video";

export const db = {
 videos: <Video[]>[
     {
         id: 0,
         title: "Driving",
         author: "John Snow",
         canBeDownloaded: true,
         minAgeRestriction: null,
         createdAt: new Date(),
         publicationDate: new Date(),
         availableResolutions: [VideoResolution.P360],
     },
     {
         id: 1,
         title: "Listening",
         author: "James Brown",
         canBeDownloaded: false,
         minAgeRestriction: null,
         createdAt: new Date(),
         publicationDate: new Date(),
         availableResolutions: [VideoResolution.P720],
     },
     {
         id: 2,
         title: "Jumping",
         author: "Sugar Brown",
         canBeDownloaded: false,
         minAgeRestriction: null,
         createdAt: new Date(),
         publicationDate: new Date(),
         availableResolutions: [VideoResolution.P144],
     }
 ]
}
