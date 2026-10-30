import Member from "../models/membersModel.js";
import { Op } from "sequelize";

async function getAllMembers() {
    const members = Member.findAll();
    return members;
}

async function getMember(id) {
    const member = Member.findByPk(id);
    return member;
}

async function checkMemberExists(phone, email, memberId) {
    const conditions = [];
    if (phone) conditions.push({ phone });
    if (email) conditions.push({ email });
    const member = Member.findOne({
        where: {
            [Op.and]: [
                { member_id: { [Op.ne]: memberId } },
                { [Op.or]: conditions },
            ],
        },
    });
    return member;
}

async function createMember(data) {
    const newMember = Member.create(data);
    return newMember;
}

async function editMember(id, data) {
    const member = await Member.findByPk(id);
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
