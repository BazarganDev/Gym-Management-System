import Member from "../models/membersModel.js";
import { Op } from "sequelize";

async function getAllMembers() {
    const members = await Member.findAll();
    return members;
}

async function getMember(id) {
    const member = await Member.findByPk(id);
    return member;
}

async function checkMemberExists(phone, email, memberId) {
    const conditions = [];
    if (phone != null && phone !== "") {
        conditions.push({ phone });
    }
    if (email != null && email !== "") {
        conditions.push({ email });
    }
    if (conditions.length === 0) {
        return false;
    }
    const where = { [Op.or]: conditions };
    if (memberId != null) {
        where.member_id = { [Op.ne]: memberId };
    }
    const match = await Member.findOne({
        attributes: ["member_id"],
        where: where,
        raw: true,
    });
    return match !== null;
}

async function createMember(data) {
    const newMember = await Member.create(data);
    return newMember;
}

async function editMember(id, data) {
    const member = await Member.findByPk(id);
    if (!member) {
        return null;
    }
    await member.update(data);
    return member;
}

export default {
    getAllMembers,
    getMember,
    checkMemberExists,
    createMember,
    editMember,
};
