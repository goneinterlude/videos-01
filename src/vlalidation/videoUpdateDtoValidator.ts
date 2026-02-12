import { VideoResolution } from "../videos/types/video";
import { VideoUpdateDto } from "../videos/dto/video-input.dto";
import { ValidationError } from "../videos/types/validationError";

export const videoUpdateDtoValidation = (
    data: VideoUpdateDto,
): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (
        typeof data?.title !== "string" ||
        data.title.trim().length === 0 ||
        data.title.trim().length > 40
    ) {
        errors.push({ message: "Invalid title", field: "title" });
    }

    // author*
    if (
        typeof data?.author !== "string" ||
        data.author.trim().length === 0 ||
        data.author.trim().length > 20
    ) {
        errors.push({ message: "Invalid author name", field: "author" });
    }

    // availableResolutions*
    if (!Array.isArray(data?.availableResolutions)) {
        errors.push({ message: "Invalid resolution", field: "availableResolutions" });
    } else if (data.availableResolutions.length === 0) {
        errors.push({ message: "Invalid resolution", field: "availableResolutions" });
    } else {
        const allowed = Object.values(VideoResolution) as string[];
        const ok = data.availableResolutions.every(
            (r: any) => typeof r === "string" && allowed.includes(r)
        );
        if (!ok) {
            errors.push({ message: "Invalid resolution", field: "availableResolutions" });
        }
    }

    // canBeDownloaded*
    if (typeof data?.canBeDownloaded !== "boolean") {
        errors.push({ message: "Invalid canBeDownloaded", field: "canBeDownloaded" });
    }

    // minAgeRestriction* (1..18) or null
    if (data?.minAgeRestriction !== null) {
        if (
            typeof data?.minAgeRestriction !== "number" ||
            !Number.isInteger(data.minAgeRestriction) ||
            data.minAgeRestriction < 1 ||
            data.minAgeRestriction > 18
        ) {
            errors.push({ message: "Invalid minAgeRestriction", field: "minAgeRestriction" });
        }
    }

    // publicationDate* (ISO date-time)
    if (
        typeof data?.publicationDate !== "string" ||
        Number.isNaN(Date.parse(data.publicationDate))
    ) {
        errors.push({ message: "Invalid publicationDate", field: "publicationDate" });
    }

    return errors;
};
