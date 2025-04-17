import { Sequelize } from "sequelize";
const { Op } = Sequelize;
import db from "../models/index.js";

export async function getBanners(req, res) {
    const { search = '', page = 1 } = req.query;
    const pageSize = 5;
    const offset = (page - 1) * pageSize;
    let whereClause = {};

    if (search.trim() !== '') {
        whereClause = {
            name: { [Op.like]: `%${search}%` }
        };
    }

    const [banners, totalBanners] = await Promise.all([
        db.Banner.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset,
        }),
        db.Banner.count({
            where: whereClause,
        })
    ]);

    res.status(200).json({
        message: "Get banners successfully",
        data: banners,
        currentPage: parseInt(page, 10),
        totalPage: Math.ceil(totalBanners / pageSize),
        totalBanners
    });
}

export async function getBannerById(req, res) {
    const { id } = req.params;
    const banner = await db.Banner.findByPk(id);

    if (!banner) {
        res.status(404).json({
            message: "Banner not found",
        });
    } else {
        res.status(200).json({
            message: "Get banner by ID successfully",
            data: banner,
        });
    }
}

export async function insertBanner(req, res) {
    const {name} = req.body;
    const exitsbanners = await db.Banner.findOne({
        where: { name: name.trim() },
    });
    if (exitsbanners) {
        return res.status(400).json({
            message: "Banner already exists",
        });
    }

    const banner = await db.Banner.create(req.body);


    res.status(201).json({
        message: "Insert banner successfully",
        data: banner,
    });
}

export async function updateBanner(req, res) {
    const { id } = req.params;
    const [updated] = await db.Banner.update({
        name: req.body.name,
        image: req.body.image,
        status: req.body.status
    }, {
        where: { id }
    });

    if (updated === 0) {
        return res.status(404).json({ message: "Banner not found" });
    }

    const updatedBanner = await db.Banner.findByPk(id);
    res.status(200).json({
        message: "Update banner successfully",
        data: updatedBanner,
    });
}

export async function deleteBanner(req, res) {
    const { id } = req.params;
    const deleted = await db.Banner.destroy({
        where: { id }
    });

    if (deleted === 0) {
        return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({
        message: "Delete banner successfully",
    });
}