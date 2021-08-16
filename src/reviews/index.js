import express from "express";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import bodyValidation from "../validation.js";
import { validationResult } from "express-validator";
import { productsJSONPath } from "../utils/fs-utils.js";
import fs from "fs-extra";
import { id } from "../utils/fs-utils.js";

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

routerReviews.get("/:reviewId/reviews", async (req, res, next) => {
  try {
    const reviews = await readReviews();
    reviews = reviews.filter(
      (review) => review.productId === req.params.reviewId
    );
    if (reviews) {
      res.send(reviews);
    } else {
      res.send({
        message: `no reviews for the product with id:${req.params.reviewId} `,
      });
    }
  } catch (error) {
    throw error;
  }
});

routerReviews.post("/", bodyValidation, async (req, res, next) => {
  try {
    const listError = validationResult(req);
    //const productJSON = await fs.readJSON(productsJSONPath)
    //console.log(productJSON)

    console.log(req.body.productId);
    if (!listError.isEmpty()) {
      next(createHttpError(400), { listError });
    } else {
      const reviews = await readReviews();
      // productJSON.slice(0, 1).map(async(product) => {
      if (req.body.productId) {
        const newReview = {
          ...req.body,
          id: uniqid(),
          createdAt: new Date(),
        };
        reviews.push(newReview);
        await writeReviews(reviews);
        res.status(201).send({ id: newReview.id });
        //})
      } else {
        const reviews = await readReviews();
        // productJSON.slice(0, 1).map(async(product) => {
        const newReview = {
          ...req.body,
          id: uniqid(),
          createdAt: new Date(),
          productId: id,
        };
        reviews.push(newReview);
        await writeReviews(reviews);
        res.status(201).send({ id: newReview.id });
      }
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
