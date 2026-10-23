import express from "express";
import membersController from "../controllers/membersController.js";

const router = express.Router();

router.get("/", membersController.getAllMembersController);
router.post("/", membersController.createMemberController);

export default router;
