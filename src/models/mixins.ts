import { DataTypes } from "sequelize";

export function phone() {
    const defaultValue = {
        dialCode: "",
        number: "",
    };
    return {
        type: DataTypes.JSONB,
        defaultValue,
    };
}