import express from "express";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import bodyValidation from "../validation.js";
import { validationResult } from "express-validator";

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

routerReviews.post("/", bodyValidation, async (req, res, next) => {
  try {
    const listError = validationResult(req);

    if (!listError.isEmpty()) {
      next(createHttpError(400), { listError });
    } else {
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
    }
  } catch (error) {
    next(error);
  }
});

routerReviews.put("/:reviewId", async (req, res, next) => {
  try {
    const reviews = await readReviews();

    const filterReviws = reviews.filter(
      (review) => review.id !== req.params.reviewId
    );

    console.log(filterReviws);

    const upgradeReview = {
      ...req.body,
      id: req.params.reviewId,
      upgradedAT: new Date(),
    };

    filterReviws.push(upgradeReview);

    await writeReviews(filterReviws);

    res.send(filterReviws);
  } catch (error) {
    next(error);
  }
});

routerReviews.delete("/:reviewId", async (req, res, next) => {
  try {
    const reviews = await readReviews();

    const remainReviews = reviews.filter(
      (review) => review.id !== req.params.reviewId
    );

    await writeReviews(remainReviews);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default routerReviews;
