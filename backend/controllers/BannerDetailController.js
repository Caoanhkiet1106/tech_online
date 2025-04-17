import { Sequelize } from "sequelize";
const { Op } = Sequelize;
import db from "../models/index.js";

export async function getBannerDetails(req, res) {
    const { page = 1 } = req.query;
    const pageSize = 5;
    const offset = (page - 1) * pageSize;
    try {
        const [bannerDetails, totalBannerDetails] = await Promise.all([
            db.BannerDetail.findAll({
                include: [
                    {
                        model: db.Product,
                        attributes: ['name', 'price', 'image']
                    },
                    {
                        model: db.Banner,
                        attributes: ['name', 'image']
                    }
                ],
                limit: pageSize,
                offset: offset,
            }),
            db.BannerDetail.count()
        ]);

        res.status(200).json({
            message: "Get banner details successfully",
            data: bannerDetails,
            currentPage: parseInt(page, 10),
            totalPage: Math.ceil(totalBannerDetails / pageSize),
            totalBannerDetails
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get banner details",
            error: error.message
        });
    }
}

export async function getBannerDetailById(req, res) {
    const { id } = req.params;
    try {
        const bannerDetail = await db.BannerDetail.findByPk(id, {
            include: [
                {
                    model: db.Product,
                    attributes: ['name', 'price', 'image']
                },
                {
                    model: db.Banner,
                    attributes: ['name', 'image']
                }
            ]
        });

        if (!bannerDetail) {
            return res.status(404).json({
                message: "Banner detail not found",
            });
        }

        res.status(200).json({
            message: "Get banner detail by ID successfully",
            data: bannerDetail,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get banner detail",
            error: error.message
        });
    }
}

export async function insertBannerDetail(req, res) {
    const transaction = await db.sequelize.transaction();
    try {
        const { banner_id, product_id } = req.body;

        // Verify if banner and product exist
        const [banner, product] = await Promise.all([
            db.Banner.findByPk(banner_id, { transaction }),
            db.Product.findByPk(product_id, { transaction })
        ]);

        if (!banner || !product) {
            await transaction.rollback();
            return res.status(404).json({
                message: !banner ? "Banner not found" : "Product not found"
            });
        }

        // Create banner detail
        const bannerDetail = await db.BannerDetail.create({
            banner_id,
            product_id
        }, { transaction });

        await transaction.commit();

        const result = await db.BannerDetail.findByPk(bannerDetail.id, {
            include: [
                {
                    model: db.Product,
                    attributes: ['name', 'price', 'image']
                },
                {
                    model: db.Banner,
                    attributes: ['name', 'image']
                }
            ]
        });

        res.status(201).json({
            message: "Insert banner detail successfully",
            data: result,
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            message: "Insert banner detail failed",
            error: error.message,
        });
    }
}

export async function updateBannerDetail(req, res) {
    const { id } = req.params;
    const transaction = await db.sequelize.transaction();

    try {
        const { banner_id, product_id } = req.body;

        // Verify if banner and product exist
        const [banner, product] = await Promise.all([
            db.Banner.findByPk(banner_id, { transaction }),
            db.Product.findByPk(product_id, { transaction })
        ]);

        if (!banner || !product) {
            await transaction.rollback();
            return res.status(404).json({
                message: !banner ? "Banner not found" : "Product not found"
            });
        }

        const [updated] = await db.BannerDetail.update({
            banner_id,
            product_id
        }, {
            where: { id },
            transaction
        });

        if (updated === 0) {
            await transaction.rollback();
            return res.status(404).json({ message: "Banner detail not found" });
        }

        await transaction.commit();

        const updatedBannerDetail = await db.BannerDetail.findByPk(id, {
            include: [
                {
                    model: db.Product,
                    attributes: ['name', 'price', 'image']
                },
                {
                    model: db.Banner,
                    attributes: ['name', 'image']
                }
            ]
        });

        res.status(200).json({
            message: "Update banner detail successfully",
            data: updatedBannerDetail,
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            message: "Update banner detail failed",
            error: error.message,
        });
    }
}

export async function deleteBannerDetail(req, res) {
    const { id } = req.params;
    try {
        const deleted = await db.BannerDetail.destroy({
            where: { id }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: "Banner detail not found" });
        }

        res.status(200).json({
            message: "Delete banner detail successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Delete banner detail failed",
            error: error.message,
        });
    }
}