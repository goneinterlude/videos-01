import { VideoResolution } from "../videos/types/video";
import { VideoInputDto } from "../videos/dto/video-input.dto";
import { ValidationError } from "../videos/types/validationError";

export const videoInputDtoValidation = (
  data: VideoInputDto,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data || typeof data !== "object") {
    errors.push({ message: "Invalid title", field: "title" });
    errors.push({ message: "Invalid author name", field: "author" });
    errors.push({ message: "Invalid resolution", field: "availableResolutions" });
    return errors;
  }

  if (typeof data.title !== "string" || data.title.trim().length > 40 || data.title.trim().length === 0) {
    errors.push({ message: "Invalid title", field: "title" });
  }



  if (typeof data.author !== "string" || data.author.trim().length > 20 || data.author.trim().length === 0) {
    errors.push({ message: "Invalid author name", field: "author" });
  }



  if (!Array.isArray(data.availableResolutions)) {
    errors.push({
      message: "Invalid resolution",
      field: "availableResolutions",
    });
  } else if (data.availableResolutions.length === 0) {
    errors.push({
      message: "Invalid resolution",
      field: "availableResolutions",
    });
  } else {
    const allowedResolutions = Object.values(VideoResolution) as string[];

    const isValid = data.availableResolutions.every(
        (r) => typeof r === "string" && allowedResolutions.includes(r)
    );

    if (!isValid) {
      errors.push({
        message: "Invalid resolution",
        field: "availableResolutions",
      });
    }
  }
  return errors;
};
