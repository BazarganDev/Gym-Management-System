import { DataTypes } from "sequelize";
import database from "../database/db.js";
import Member from "./membersModel.js";
import Locker from "./lockersModel.js";

const lockerAssignment = database.define("Locker_Assignments", {
    assignment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Member,
            key: "member_id",
        },
    },
    locker_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Locker,
            key: "locker_id",
        },
    },
    assigned_at: { type: DataTypes.DATE, allowNull: false },
    released_at: { type: DataTypes.DATE },
});

export default lockerAssignment;
