import {Sequelize} from "sequelize";
const { Op } = Sequelize;
import db from "../models/index.js";

export async function getBrands(req, res) {
    const { search = '', page = 1 } = req.query;
    const pageSize = 5;
    const offset = (page - 1) * pageSize;
    let whereClause = {};

    if (search.trim() !== '') {
        whereClause = {
            name: { [Op.like]: `%${search}%` }
        };
    }
    const [brands, totalBrands] = await Promise.all([
        db.Brand.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset,
        }),
        db.Brand.count({
            where: whereClause,
        })
    ]);

    res.status(200).json({
        message: "Get brands successfully",
        data: brands,
        currentPage: parseInt(page, 10),
        totalPage: Math.ceil(totalBrands / pageSize),
        totalBrands
    });

}

export async function getBrandById(req, res) {
    const {id} = req.params;
    const brand = await db.Brand.findByPk(id);
    if (!brand) {
        return res.status(404).json({
            message: "Brand not found",
        });
    }
    res.status(200).json({
        message: "Get brand by id successfully",
        data: brand,
    });
}

export async function insertBrand(req, res) {
    const brand = await db.Brand.create(req.body);
    res.status(201).json({
        message: "Insert brand successfully",
        data: brand,
    });
}

export async function updateBrand(req, res) {
    const { id } = req.params;
    const [updated] = await db.Brand.update(req.body, {
        where: { id }
    });
    if (updated === 0) {
        return res.status(404).json({ message: "Brand not found" });
    }
    const updatedBrand = await db.Brand.findByPk(id);
    res.status(200).json({
        message: "Update brand successfully",
    });
}

export async function deleteBrand(req, res) {
    const { id } = req.params;
    const deleted = await db.Brand.destroy({
        where: { id }
    });
    if (deleted === 0) {
        return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json({
        message: "Delete brand successfully",
    });
}