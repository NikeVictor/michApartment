import Phone from "@src/types/phone";
import { DataTypes, Model, Sequelize } from "sequelize";
import { phone} from "./mixins";

type UserType = "Administrator" | "Subscriber"
interface UserAttributes {
    id?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    phone?: Phone;
    gender?: string;
    password: string;
    confirmPassword: string;
    accountType?: UserType;
    image?: string;
    lastActive?: Date;
    state?: string;
    country?: string;
    address?: string;
    token?: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
    id?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    phone?: Phone;
    gender?: string;
    password!: string;
    confirmPassword!: string;
    accountType?: UserType;
    image?: string;
    lastActive?: Date;
    state?: string;
    country?: string;
    address?: string;
    token?: string;
}

function connectModelAttrs(sequelize: Sequelize) {
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
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
                allowNull: false,
            },
            confirmPassword: {
                type: DataTypes.STRING,
                allowNull: false
              },
            accountType: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "Subscriber",
            },
            phone: phone(),
            address: DataTypes.STRING,
            state: DataTypes.STRING,
            country: DataTypes.STRING,
            token: DataTypes.STRING
        },
        {
            sequelize,
            tableName: "users",
            timestamps: true
        }
    )
}
function connectModelAssocs() {
    User.addScope("defaultScope", {
        order: [["createdAt", "DESC"]]
    })
}
const init = {
    connectModelAttrs,
    connectModelAssocs,
};
export { User, init, UserAttributes };