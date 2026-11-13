import express from "express";
import membersController from "../controllers/membersController.js";

const router = express.Router();

router.get("/", membersController.getAllMembersController);
router.get("/:id", membersController.getMemberController);
router.post("/", membersController.createMemberController);
router.patch("/:id", membersController.editMemberController);
router.delete("/:id", membersController.softDeleteMemberController);
router.patch("/:id/restore", membersController.restoreMemberController);

export default router;
