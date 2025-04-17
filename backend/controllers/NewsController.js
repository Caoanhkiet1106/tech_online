import { Sequelize, where } from "sequelize";
const { Op } = Sequelize;
import db from "../models/index.js";

export async function getNews(req, res) {
    const { search = '', page = 1 } = req.query;
    const pageSize = 5;
    const offset = (page - 1) * pageSize;
    let whereClause = {};
    if (search.trim() !== '') {
        whereClause = {
            [Op.or]: [
                { title: { [Op.like]: `%${search}%` } },
                { content: { [Op.like]: `%${search}%` } },
            ]
        };
    }
    const [news, totalNews] = await Promise.all([
        db.News.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset,
        }),
        db.News.count({
            where: whereClause,
        })
    ]);
    res.status(200).json({
        message: "Get news successfully",
        data: news,
        currentPage: parseInt(page, 10),
        totalPage: Math.ceil(totalNews / pageSize),
        totalNews
    });
}

export async function getNewsById(req, res) {
    const { id } = req.params;
    const news = await db.News.findByPk(id);
    if (!news) {
        res.status(404).json({
            message: "News not found",
        });
    } else {
        res.status(200).json({
            message: "Get news by ID successfully",
            data: news,
        });
    }
}

export async function insertNews(req, res) {
    const transaction = await db.sequelize.transaction();
    try {
        // Tạo news với transaction
        const news = await db.News.create(req.body, { transaction });
        const productid = req.body.product_ids;

        if (productid && productid.length) {
            // Lọc các product hợp lệ
            const Validproducts = await db.Product.findAll({
                where: { id: productid },
                transaction
            });

            const ValidproductsIds = Validproducts.map((product) => product.id);
            const filteredProductIds = productid.filter((id) => ValidproductsIds.includes(id));

            // Tạo liên kết trong bảng NewsDetail
            const newsProduct = filteredProductIds.map((productId) =>
                db.NewsDetail.create({
                    product_id: productId,
                    news_id: news.id,
                }, { transaction })
            );

            await Promise.all(newsProduct);
        }

        await transaction.commit();

        res.status(201).json({
            message: "Insert news successfully",
            data: news,
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            message: "Insert news failed",
            error: error.message,
        });
    }
}



export async function updateNews(req, res) {
    const { id } = req.params;
    const [updated] = await db.News.update(req.body, {
        where: { id }
    });
    if (updated === 0) {
        return res.status(404).json({ message: "News not found" });
    }
    const updatedNews = await db.News.findByPk(id);
    res.status(200).json({
        message: "Update news successfully",
        data: updatedNews,
    });
}

export async function deleteNews(req, res) {
    const { id } = req.params;
    const deleted = await db.News.destroy({
        where: { id }
    });
    if (deleted === 0) {
        return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json({
        message: "Delete news successfully",
    });
}
