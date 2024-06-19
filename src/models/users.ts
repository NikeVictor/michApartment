import Phone from "@src/types/phone";
import { DataTypes, Model, Sequelize } from "sequelize";
import { phone } from "./mixins";

type UserType = "Administrator" | "Subscriber"
interface UserAttributes {
    id?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    phone?: Phone;
    gender?: string;
    password?: string;
    accountType?: UserType;
    image?: string;
    lastActive?: Date
}

class User extends Model<UserAttributes> implements UserAttributes {
    id?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    phone?: Phone;
    gender?: string;
    password?: string;
    accountType?: UserType;
    image?: string;
    lastActive?: Date
}

function connectModelAttrs(sequelize: Sequelize) {
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            firstName: {
                type: new DataTypes.STRING,
                allowNull: false,
            },
            middleName: {
                type: new DataTypes.STRING,
                allowNull: false,
                defaultValue: "",
            },
            lastName: {
                type: new DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "unknown",
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            lastActive: {
                type: DataTypes.DATEONLY,
                get() {
                    const raw = this.getDataValue("lastActive");
                    if (!raw) return;
                    return new Date(raw);
                },
                set(value: Date | string) {
                    this.setDataValue("lastActive", new Date(value));
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            accountType: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "Subscriber",
            },
            phone: phone(),
        },
        {
            sequelize,
            tableName: "users",
            timestamps: true
        }
    )
}
function connectModelAssocs() {}
const init = {
    connectModelAttrs,
    connectModelAssocs,
};
export { User, init, UserAttributes };