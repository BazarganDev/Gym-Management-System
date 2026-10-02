import { DataTypes } from "sequelize";
import database from "../database/db.js";
import Member from "./membersModel.js";
import Membership from "./membershipsModel.js";

const Payment = database.define(
    "Payment",
    {
        payment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        },
        member_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Member,
                key: "member_id",
            },
        },
        membership_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Membership,
                key: "membership_id",
            },
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.ENUM("cash", "card", "bankTransfer"),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("completed", "pending", "failed", "refunded"),
            allowNull: false,
        },
        paid_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    { updatedAt: false },
);

export default Payment;
