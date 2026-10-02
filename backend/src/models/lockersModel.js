import { DataTypes } from "sequelize";
import database from "../database/db.js";

const Locker = database.define("Locker", {
    locker_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
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
