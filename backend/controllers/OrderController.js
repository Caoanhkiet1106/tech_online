import {Sequelize} from "sequelize";
import db from "../models/index.js";
export async function getOrders(req, res) {
    res.status(200).json({
        message: "Get orders successfully",
    });
}

export async function getOrderById(req, res) {
    res.status(200).json({
        message: "Get order by id successfully",
    });
}

export async function insertOrder(req, res) {
    const { user_id } = req.body;
    // Kiểm tra xem user có tồn tại hay không
    const user = await db.User.findByPk(user_id);
    if (!user) {
        return res.status(404).json({
            message: `User with ID ${user_id} not found`,
        });
    }
    // Tạo đơn hàng
    const newOrder = await db.Order.create(req.body);
    // Kiểm tra kết quả tạo đơn hàng
    if (newOrder) {
        return res.status(201).json({
            message: "Insert order successfully",
            data: newOrder,
        });
    }
    return res.status(400).json({
        message: "Insert order failed",
    });
}

  

export async function updateOrder(req, res) {
    const { id } = req.params;
    const [updated] = await db.Order.update(req.body, {
        where: { id }
    });
    if (updated === 0) {
        return res.status(404).json({ message: "Order not found" });
    }
    const updatedOrder = await db.Order.findByPk(id);
    res.status(200).json({
        message: "Update order successfully",
    });
}

export async function deleteOrder(req, res) {
    const { id } = req.params;
    const deleted = await db.Order.destroy({
        where: { id }
    });
    if (deleted === 0) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({
        message: "Delete order successfully",
    });
}