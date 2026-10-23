import express from "express";
import membersController from "../controllers/membersController.js";

const router = express.Router();

router.get("/", membersController.getAllMembersController);
router.get("/:id", membersController.getMemberController);
router.post("/", membersController.createMemberController);
router.put("/:id", membersController.editMemberController);

export default router;
