import membersService from "../services/membersService.js";
import vine from "@vinejs/vine";

async function getAllMembersController(req, res) {
    const members = await membersService.getAllMembers();
    res.status(200).json(members);
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
    try {
        const output = await vine.validate({ schema, data });
    } catch (error) {
        res.status(400).json({ message: error.messages[0].message });
        return;
    }
    // Check if member with the given phone number already exists on the database
    const member = await membersService.getMember(req.body.phone);
    if (member !== null) {
        res.status(409).json({message: "Member already exists."});
        return;
    }
    const newMember = await membersService.createMember(data);
    res.status(201).json(newMember);
}

export default { getAllMembersController, createMemberController };
