import { Sequelize } from "sequelize";
const { Op } = Sequelize;
import db from "../models/index.js";
import InsertUserRequest from "../dtos/requests/users/InsertUserRequests.js";
import ResponeseUser from "../dtos/responeses/user/ResoponseUser.js";
import argon2 from "argon2";

export async function insertUser(req, res) {
    // Kiểm tra xem người dùng với email đã tồn tại hay chưa
    const existingUser = await db.User.findOne({ where: { email: req.body.email } });

    if (existingUser) {
        return res.status(409).json({
            message: "Email is already in use",
        });
    }
    const hashedPassword = await argon2.hash(req.body.password);
    const user = await db.User.create({...req.body, password: hashedPassword});
    if (user) {
        return res.status(201).json({
            message: "Insert user successfully",
            data: new ResponeseUser(user),
        });
    } else {
        return res.status(400).json({
            message: "Insert user failed",
        });
    }
}

export async function updateUser(req, res) {
        const { id } = req.params;
        const [updated] = await db.User.update(req.body, {
            where: { id }
        });
        if (updated) {
            return res.status(200).json({
                message: "Update user successfully",
                data: updatedUser
            });
        } else {
            return res.status(404).json({
                message: "User not found",
            });
        }
}
