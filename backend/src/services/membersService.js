import Member from "../models/membersModel.js";
import { Op } from "sequelize";

async function getAllMembers(request) {
    const { phone } = request.query;
    if (phone !== undefined) {
        const results = await Member.findOne({
            where: { phone: phone },
            paranoid: false,
        });
        if (!results) {
            return {
                search_parameter: phone,
                matches: 0,
                data: [],
            };
        }
        if (results.deletedAt !== null) {
            return {
                search_parameter: phone,
                matches: 1,
                message: "This record has been marked as deleted record.",
                data: [results],
            };
        }
        return {
            search_parameter: phone,
            matches: 1,
            data: [results],
        };
    }
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

async function softDeleteMember(id) {
    const member = await Member.findByPk(id);
    if (!member) {
        return null;
    }
    try {
        if (member.status === "active") {
            await member.update({ status: "inactive" });
        }
        await member.destroy();
        return member;
    } catch (error) {
        throw error;
    }
}

async function restoreMember(id) {
    const member = await Member.findOne({
        where: { member_id: id },
        paranoid: false,
    });
    if (!member) {
        return null;
    }
    if (!member.deletedAt) {
        return {
            code: 409,
            message: "Cannot restore a member that already exists.",
            data: [],
        };
    }
    await member.restore();
    return {
        code: 200,
        message: "Member successfully restored.",
        data: [member],
    };
}

export default {
    getAllMembers,
    getMember,
    checkMemberExists,
    createMember,
    editMember,
    softDeleteMember,
    restoreMember,
};
