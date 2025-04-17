import {Sequelize } from "sequelize";
const { Op } = Sequelize;
import db, { sequelize } from "../models/index.js";

// Lấy danh sách Newsdetail (có tìm kiếm và phân trang)
export async function getNewsdetails(req, res) {
    const { search = '', page = 1 } = req.query;
    const pageSize = 5;
    const offset = (page - 1) * pageSize;
    let whereClause = {};
    if (search.trim() !== '') {
        whereClause = {
            [Op.or]: [
                { product_id: { [Op.like]: `%${search}%` } },
                { news_id: { [Op.like]: `%${search}%` } }
            ]
        };
    }
    const [newsdetails, totalNewsdetails] = await Promise.all([
        db.NewsDetail.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset,
        //  include: [{model: db.News}, {model : db.Product}] // Thêm include để lấy thông tin từ bảng News và Product
        }),
        db.NewsDetail.count({
            where: whereClause,
        })
    ]);
    res.status(200).json({
        message: "Get newsdetails successfully",
        data: newsdetails,
        currentPage: parseInt(page, 10),
        totalPage: Math.ceil(totalNewsdetails / pageSize),
        totalNewsdetails
    });
}

// Lấy Newsdetail theo ID
export async function getNewsdetailById(req, res) {
    const { id } = req.params;
    const newsdetail = await db.NewsDetail.findByPk(id,{include: [{model: db.News}, {model : db.Product}]});
    if (!newsdetail) {
        return res.status(404).json({
            message: "Newsdetail not found",
        });
    }
    res.status(200).json({
        message: "Get newsdetail by ID successfully",
        data: newsdetail,
    });
}

// Thêm mới Newsdetail
export async function insertNewsdetail(req, res) {
    const { product_id, news_id } = req.body;
    const checkProduct = await db.Product.findByPk(product_id);
    if (!checkProduct) {
        return res.status(404).json({
            message: "Product not found",
        });
    }
    const checknews = await db.News.findByPk(news_id);
    if (!checknews) {
        return res.status(404).json({
            message: "News not found",
        });
    }
    const duplicateNewsdetail = await db.NewsDetail.findOne({
        where: { product_id, news_id }
    });
    if (duplicateNewsdetail) {
        return res.status(409).json({
            message: "Newsdetail already exists",
        });
    }
    const newsdetail = await db.NewsDetail.create({product_id, news_id});
    res.status(201).json({
        message: "Insert newsdetail successfully",
        data: newsdetail,
    });
}

// Cập nhật Newsdetail
export async function updateNewsdetail(req, res) {
    const { id } = req.params;
    const { product_id, news_id } = req.body;
    const checkduplicateNewsdetail = await db.NewsDetail.findOne({
        where: {product_id, news_id, id:{[Sequelize.Op.ne]:id} }
    });
    if (checkduplicateNewsdetail) {
        return res.status(409).json({
            message: "Newsdetail already exists",
        });
    }
    const [updated] = await db.NewsDetail.update({product_id,news_id}, {
        where: { id }
    });
    if (updated === 0) {
        return res.status(404).json({ message: "Newsdetail not found" });
    }
    const updatedNewsdetail = await db.NewsDetail.findByPk(id);
    res.status(200).json({
        message: "Update newsdetail successfully",
        data: updatedNewsdetail,
    });
}

// Xóa Newsdetail
export async function deleteNewsdetail(req, res) {
    const { id } = req.params;
    const deleted = await db.NewsDetail.destroy({
        where: { id }
    });
    if (deleted === 0) {
        return res.status(404).json({ message: "Newsdetail not found" });
    }
    res.status(200).json({
        message: "Delete newsdetail successfully",
    });
}