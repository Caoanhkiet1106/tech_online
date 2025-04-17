import {Sequelize} from "sequelize";
const { Op } = Sequelize;
import db from "../models/index.js";

export async function getCategories(req, res) {
    const { search = '', page = 1 } = req.query;
    const pageSize = 5;
    const offset = (page - 1) * pageSize;
    let whereClause = {};
    if (search.trim() !== '') {
        whereClause = {
            name: { [Op.like]: `%${search}%` }
        };
    }
    const [categories, totalCategories] = await Promise.all([
        db.Category.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset,
        }),
        db.Category.count({
            where: whereClause,
        })
    ]);
    res.status(200).json({
        message: "Get categories successfully",
        data: categories,
        currentPage: parseInt(page, 10),
        totalPage: Math.ceil(totalCategories / pageSize),
        totalCategories
    });
}

export async function getCategoryById(req, res) {
    const {id} = req.params
    const category = await db.Category.findByPk(id);
    if(!category){
        res.status(200).json({
            message: "Category not found",
        });
    }
    res.status(200).json({
        message: "Get category by ID successfully",
        data: category,
    });
}

export async function insertCategory(req, res) {
    const category = await db.Category.create(req.body);
    res.status(201).json({
        message: "Insert category successfully",
        data: category,

    });
}

export async function updateCategory(req, res) {
    const { id } = req.params;
    const [updated] = await db.Category.update(req.body, {
        where: { id }
    });
    if (updated === 0) {
        return res.status(404).json({ message: "Category not found" });
    }
    const updatedCategory = await db.Category.findByPk(id);
    res.status(200).json({
        message: "Update category successfully",
    });
}

export async function deleteCategory(req, res) {
    const { id } = req.params;
    const deleted = await db.Category.destroy({
        where: { id }
    });
    if (deleted === 0) {
        return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
        message: "Delete category successfully",
    });
}
