import express from "express";
import uniqid from "uniqid";
import createHttpError from "http-errors";

import { readReviews, writeReviews } from "../readAndWrite/readAndWrite.js";
const routerReviews = express();

routerReviews.get("/", async (req, res, next) => {
  try {
    const reviews = await readReviews();

    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

routerReviews.get("/:reviewId", async (req, res, next) => {
  try {
    const reviews = await readReviews();

    const reviewUni = reviews.find(
      (review) => review.id === req.params.reviewId
    );

    if (reviewUni) {
      res.send(reviewUni);
    } else {
      next(createHttpError(404), `not found id ${req.params.reviewId}`);
    }
  } catch (error) {
    next(error);
  }
});

routerReviews.post("/", async (req, res, next) => {
  try {
    const reviews = await readReviews();

    const newReview = {
      ...req.body,
      id: uniqid(),
      createdAt: new Date(),
      productId: uniqid(),
    };
    reviews.push(newReview);

    await writeReviews(reviews);

    res.status(201).send({ id: newReview.id });
  } catch (error) {
    next(error);
  }
});

routerReviews.put("/:reviewId", async (req, res, next) => {
  const reviews = await readReviews();

  const upgradeReview = { ...req.body, id: req.id };

  const filterReviws = reviews.filter(
    (review) => review.id !== req.params.reviewId
  );

  console.log(filterReviws);

  res.send();
});

export default routerReviews;
