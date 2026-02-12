import { Request, Response, Router } from "express";
import { VideoInputDto } from "../dto/video-input.dto";
import { videoInputDtoValidation } from "../../vlalidation/videoInputDtoValidator";
import { Video, VideoResolution } from "../types/video";
import { HttpStatus } from "../../core/types/http-statuses";
import { createErrorMessages } from "../../core/utils/error.utils";
import { db } from "../../db/mock-db";
import { setupSwagger } from "../../setup-swagger";

export const videosRouter = Router({});

videosRouter

  .get("", (req, res) => {
    // возвращаем всех водителей
    res.status(HttpStatus.Ok).json(db.videos);
  })

  .get("/:id", (req, res) => {
    // ищем водителя в бд по id
    const videoId = +req.params.id;

    if (Number.isNaN(videoId) || !Number.isFinite(videoId)) {
      return res.status(HttpStatus.BadRequest).json({
        errorsMessages: [{ message: "Invalid video id", field: "id" }],
      });
    }

    const video = db.videos.find((d) => d.id === videoId);
    if (!video) {
      return res.sendStatus(HttpStatus.NotFound);
    }

    // возвращаем ответ
    return res.status(HttpStatus.Ok).json(video);
  })

  .post("", (req: Request<{}, {}, VideoInputDto>, res) => {
    //1) проверяем приходящие данные на валидность
    const errors = videoInputDtoValidation(req.body);
    //2) создаем newDriver

    if (errors.length > 0) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
      return;
    }

    const createdAtDate = new Date();
    const publicationDateDate = new Date(createdAtDate);
    publicationDateDate.setDate(publicationDateDate.getDate() + 1);

    const createdAt = createdAtDate.toISOString();
    const publicationDate = publicationDateDate.toISOString();

    const newVideo: Video = {
      id: Date.now(),
      title: req.body.title,
      author: req.body.author,
      availableResolutions: req.body.availableResolutions,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: createdAt,
      publicationDate: publicationDate,
    };
    //3) добавляем newVideo в БД
    db.videos.push(newVideo);
    //4) возвращаем ответ
    res.status(HttpStatus.Created).json(newVideo);
  })

  .put("/:id", (req, res) => {
    const videoId = Number(req.params.id);
    const video = db.videos.find((d) => d.id === videoId);

    if (!video) {
      return res.sendStatus(404);
    }

    const errors = videoInputDtoValidation(req.body);

    if (errors.length > 0) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
      return;
    }

    // const video = db.videos[index];

    video.title = req.body.title;
    video.author = req.body.author;
    video.availableResolutions = req.body.availableResolution;
    video.canBeDownloaded = req.body.canBeDownloaded;
    video.minAgeRestriction = req.body.minAgeRestriction;
    video.publicationDate = req.body.publicationDate;

    res.sendStatus(HttpStatus.NoContent);
  })
  .delete("/:id", (req, res) => {
    const videoId = Number(req.params.id);
    const index = db.videos.findIndex((v) => v.id === videoId);

    if (index === -1) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: "id", message: "Vehicle not found" }]),
        );
      return;
    }

    db.videos.splice(index, 1);
    res.sendStatus(HttpStatus.NoContent);
  });

// app.get("/testing", (req, res) => {
//     res.status(HttpStatus.Ok).send("testing url");
// });
//
// app.delete("/testing/all-data", (req, res) => {
//     db.videos = [];
//     res.sendStatus(HttpStatus.NoContent);
// });
// setupSwagger(app);
