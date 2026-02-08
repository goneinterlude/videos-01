import express, { Express } from "express";

import { db } from "./db/mock-db"

import { HttpStatus } from "./core/http-statuses"
import {Video} from "./videos/types/video";
import {VideoInputDto} from "./videos/dto/video-input.dto";
export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса

  // основной роут
  app.get("/", (req, res) => {
    res.status(HttpStatus.Ok).send("Hello world!");
  });


  app.get("/videos", (req, res) => {
    // возвращаем всех водителей
    res.status(HttpStatus.Ok).json(db.videos);
  });

  app.get("/videos/:id", (req, res) => {
    // ищем водителя в бд по id
    const video = db.videos.find((d) => d.id === +req.params.id);
    if (!video) {
      return res.status(HttpStatus.NotFound).send({ message: "Video not found" });
    }
    // возвращаем ответ
    res.status(HttpStatus.Ok).send(video);
  });

  app.post("/videos", (req, res) => {
    //1) проверяем приходящие данные на валидность
    //2) создаем newDriver
    const body = req.body as VideoInputDto;

    const newVideo: Video = {
      id: Date.now(),
      title: body.title,
      author: body.author,
      availableResolutions: body.availableResolutions,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date(),
      publicationDate: new Date(),
    };
    //3) добавляем newDriver в БД
    db.videos.push(newVideo);
    //4) возвращаем ответ
    res.status(201).send(newVideo);
  });
  return app;
};
