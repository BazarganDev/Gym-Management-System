import Member from "../models/membersModel.js";

async function getAllMembers() {
    const members = Member.findAll();
    return members;
}

async function getMember(id) {
    const member = Member.findByPk(id);
    return member;
}

async function checkMemberExists(phone) {
    // Check if the member with the given phone number exists on the DB
    // If yes, return the member
    // If no, return null
    const member = Member.findOne({
        where: { phone: phone },
    });
    return member;
}

async function createMember(data) {
    const newMember = Member.create(data);
    return newMember;
}

async function editMember(data) {
    const member = Member.update(data);
    return member;
}

export default {
    getAllMembers,
    getMember,
    checkMemberExists,
    createMember,
    editMember,
};
