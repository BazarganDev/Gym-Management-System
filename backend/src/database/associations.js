// Import Models
import Member from "../models/membersModel.js";
import Locker from "../models/lockersModel.js";
import Membership from "../models/membershipsModel.js";
import Payment from "../models/paymentsModel.js";
import Attendance from "../models/attendancesModel.js";
import lockerAssignment from "../models/lockerAssignmentsModel.js";

function setupAssociations() {
    // Associations
    Member.hasMany(Membership, { foreignKey: "member_id" });
    Membership.belongsTo(Member, { foreignKey: "member_id" });

    Member.hasMany(Payment, { foreignKey: "member_id" });
    Payment.belongsTo(Member, { foreignKey: "member_id" });

    Member.hasMany(Attendance, { foreignKey: "member_id" });
    Attendance.belongsTo(Member, { foreignKey: "member_id" });

    Member.hasMany(lockerAssignment, { foreignKey: "member_id" });
    lockerAssignment.belongsTo(Member, { foreignKey: "member_id" });

    Locker.hasMany(lockerAssignment, { foreignKey: "locker_id" });
    lockerAssignment.belongsTo(Locker, { foreignKey: "locker_id" });

    Membership.hasMany(Payment, { foreignKey: "membership_id" });
    Payment.belongsTo(Membership, { foreignKey: "membership_id" });
}

export default setupAssociations;
