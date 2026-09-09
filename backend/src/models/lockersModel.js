import { DataTypes } from "sequelize";
import database from "../database/db.js";
import Member from "./membersModel.js";

const Locker = database.define("Locker", {
    locker_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
    },
    member_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Member,
            key: "member_id",
        },
    },
    locker_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.ENUM("available", "occupied", "maintenance"),
        allowNull: false,
    },
});

export default Locker;
