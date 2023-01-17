import bcrypt from "bcrypt";

const PasswordHashing = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

const PasswordCompare = async (password: string, passwordHash: string): Promise<boolean> => {
    return await bcrypt.compare(password, passwordHash);
};

export default { PasswordHashing, PasswordCompare };