import { DataTypes } from "sequelize";
import database from "../database/db.js";
import Member from "./membersModel.js";

const Membership = database.define("Membership", {
    membership_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
    },
    member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Member,
            key: "member_id",
        },
    },
    type: {
        type: DataTypes.ENUM(
            "singleDay",
            "threeDaysAWeek",
            "fourDaysAWeek",
            "fiveDaysAWeek",
            "sixDaysAWeek",
        ),
        allowNull: false,
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("active", "expired", "suspended"),
    },
});

export default Membership;
