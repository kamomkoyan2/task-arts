import {Request, Response} from "express";

import User from "../db/models/User";
import Helper from "../helpers/Helper";
import PasswordHash from "../helpers/PasswordHash";

const Register = async(req: Request, res: Response): Promise<Response> => {
    try {
        const {email, password, confirmPassword} = req.body;

        const hashed = await PasswordHash.PasswordHashing(password);


        const user = await User.create({
            email,
            password: hashed,
            active: true,
            verified: true,
        });
        return res.status(201).send(Helper.ResponseData(201, "Created", null, user));


    }
    catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}

export default {Register}