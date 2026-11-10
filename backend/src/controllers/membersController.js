import membersService from "../services/membersService.js";
import vine from "@vinejs/vine";

async function getAllMembersController(req, res) {
    const members = await membersService.getAllMembers();
    res.status(200).json(members);
}

async function getMemberController(req, res) {
    const member = await membersService.getMember(req.params.id);
    if (member === null) {
        res.status(404).json({ message: "No member with the given ID." });
        return;
    }
    res.status(200).json(member);
}

async function createMemberController(req, res) {
    const data = req.body;
    // Schema for form data validation
    const schema = vine.object({
        first_name: vine.string(),
        last_name: vine.string(),
        phone: vine.string().mobile({ locale: ["fa-IR"] }),
        email: vine.string().email(),
        birth_date: vine.date(),
        gender: vine.enum(["male", "female"]),
        join_date: vine.date(),
        status: vine.enum(["active", "inactive", "suspended"]),
    });
    // Validate
    let validatedData = {};
    try {
        const output = await vine.validate({ schema: schema, data: data });
        validatedData = output;
    } catch (error) {
        res.status(400).json({ message: error.messages[0].message });
        return;
    }
    // Check if member with the given phone number and/or email already exists on the database
    const checkMember = await membersService.checkMemberExists(
        validatedData.phone,
        validatedData.email,
        req.params.id,
    );
    if (checkMember) {
        res.status(409).json({
            message: "Member already exists.",
            cause: "Phone or email already been used.",
        });
        return;
    }
    const newMember = await membersService.createMember(validatedData);
    res.status(201).json(newMember);
}

async function editMemberController(req, res) {
    const data = req.body;
    // Schema for form data validation
    const schema = vine.object({
        first_name: vine.string().optional(),
        last_name: vine.string().optional(),
        phone: vine
            .string()
            .mobile({ locale: ["fa-IR"] })
            .optional(),
        email: vine.string().email().optional(),
        birth_date: vine.date().optional(),
        gender: vine.enum(["male", "female"]).optional(),
        join_date: vine.date().optional(),
        status: vine.enum(["active", "inactive", "suspended"]).optional(),
    });
    // Validate
    let validatedData = {};
    try {
        const output = await vine.validate({ schema: schema, data: data });
        validatedData = output;
    } catch (error) {
        res.status(400).json({ message: error.messages[0].message });
        return;
    }
    // Find member
    const member = await membersService.getMember(req.params.id);
    if (member === null) {
        res.status(404).json({ message: "No member with the given ID." });
        return;
    }
    // At least one field is required
    if (Object.keys(validatedData).length === 0) {
        res.status(400).json({
            message: "At least one field must be provided.",
        });
        return;
    }
    // Check if member with the given phone number and/or email already exists on the database
    const checkMember = await membersService.checkMemberExists(
        validatedData.phone,
        validatedData.email,
        req.params.id,
    );
    if (checkMember) {
        res.status(409).json({
            message: "Phone or email already been used.",
        });
        return;
    }
    const editedMember = await membersService.editMember(
        req.params.id,
        validatedData,
    );
    res.status(200).json(editedMember);
}

async function softDeleteMemberController(req, res) {
    // Find member
    const member = await membersService.getMember(req.params.id);
    if (member === null) {
        res.status(404).json({ message: "No member with the given ID." });
        return;
    }
    const deleted = await membersService.softDeleteMember(req.params.id);
    if (deleted === true) {
        res.status(204).json({ message: "Member deleted." });
    } else {
        res.status(500).json(deleted);
    }
}

export default {
    getAllMembersController,
    getMemberController,
    createMemberController,
    editMemberController,
    softDeleteMemberController,
};
