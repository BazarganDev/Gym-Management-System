import Member from "../models/membersModel.js";

async function getAllMembers() {
    const members = Member.findAll();
    return members;
}

async function getMember(phone) {
    const member = Member.findOne({
        where: { phone: phone },
    });
    return member;
}

async function createMember(data) {
    const newMember = Member.create(data);
    return newMember;
}

export default { getAllMembers, getMember, createMember };
