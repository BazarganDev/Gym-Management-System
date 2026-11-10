import { DataTypes } from "sequelize";
import database from "../database/db.js";

const Member = database.define(
    "Member",
    {
        member_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        gender: {
            type: DataTypes.ENUM("male", "female"),
            allowNull: false,
        },
        join_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.ENUM("active", "inactive", "suspended"),
            allowNull: false,
        },
    },
    { paranoid: true },
);

export default Member;
