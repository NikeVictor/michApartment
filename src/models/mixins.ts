import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

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


export async function encryptPassword(password: string): Promise<string> {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Failed to hash password');
    }
}

export async function decryptPassword(
    hashedPassword: string, 
    password: string
): Promise<boolean> {
    try {
        const validPassword = await bcrypt.compare(hashedPassword, password);
        return validPassword;
    } catch (error) {
        throw new Error('Invalid password');
    }
}