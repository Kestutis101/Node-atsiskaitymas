import express from "express";
import {
  getAllPostsWithNames,
  getPostsWithEmails,
  getPostsWithAddress,
  createNewPost,
  getAllPostsFromMongoDb,
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/api/users/names", getAllPostsWithNames);
router.get("/api/users/emails", getPostsWithEmails);
router.get("/api/users/address", getPostsWithAddress);
router.post("/api/users", createNewPost);
router.get("/api/users", getAllPostsFromMongoDb);

export default router;
