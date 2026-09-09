import { DataTypes } from "sequelize";
import database from "../database/db.js";
import Member from "./membersModel.js";

const Attendance = database.define(
    "Attendance",
    {
        attendance_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        },
        member_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Member,
                key: "member_id",
            },
        },
        check_in: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        check_out: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    { updatedAt: false },
);

export default Attendance;
