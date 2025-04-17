import { Sequelize, where } from "sequelize";
const { Op } = Sequelize;
import db from "../models/index.js";
export async function getProducts(req, res) {
    const { search = '', page = 1 } = req.query
    const pageSize = 6
    const offset = (page - 1) * pageSize
    let WhereClause = {}
    if (search.trim() !== '') {
        WhereClause = {
            [Op.or]: [
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } },
                { specification: { [Op.like]: `%${search}%` } },
            ]
        };
    }
    const [products, totalProducts] = await Promise.all([
        db.Product.findAll({
            where: WhereClause,
            limit: pageSize,
            offset: offset,
        }),
        db.Product.count({
            where: WhereClause,
        })
    ]);
    res.status(200).json({
        message: "Get products sussessfully",
        data: products,
        currentPage: parseInt(page, 10),
        totalPage: Math.ceil(totalProducts / pageSize),
        totalProducts
    })
}
export async function getProductById(req, res) {
    const { id } = req.params
    const product = await db.Product.findByPk(id);
    if (!product) return res.status(404).json({
        message: "Product not found",
    })
    res.status(200).json({
        message: "Get products by id sussessfully",
        data: product
    })
}
export async function insertProducts(req, res) {
    const product = await db.Product.create(req.body)
    return res.status(201).json({
        message: "Insert products sussessfully",
        data: product
    })
}
export async function updateProducts(req, res) {
    const { id } = req.params;
    const [updated] = await db.Product.update(req.body, {
        where: { id }
    });
    if (updated === 0) {
        return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await db.Product.findByPk(id);
    return res.status(200).json({
        message: "Update products successfully",
        data: updatedProduct
    });
}
export async function deleteProducts(req, res) {
    const { id } = req.params;
    const deleted = await db.Product.destroy({
        where: { id }
    });
    if (deleted === 0) {
        return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({
        message: "Delete products successfully",
        data: { id }
    });
}

/**
[
  {
    "name": "iPhone 15 Pro Max",
    "image": "",
    "price": 29990000,
    "oldprice": 32990000,
    "description": "iPhone 15 Pro Max với thiết kế titan đẳng cấp, chip A17 Pro mạnh mẽ và camera zoom 5x, mang đến trải nghiệm đỉnh cao.",
    "specification": "Màn hình Super Retina XDR 6.7 inch, A17 Pro, 8GB RAM, 256GB bộ nhớ trong, camera chính 48 MP, pin 4852 mAh.",
    "buyturn": 4300,
    "quantity": 80,
    "brand_id": 3,
    "category_id": 1
  },
  {
    "name": "Xiaomi 13 Ultra",
    "image": "",
    "price": 19900000,
    "oldprice": 21900000,
    "description": "Xiaomi 13 Ultra là mẫu flagship với cụm camera Leica cao cấp, hiệu năng mạnh và thiết kế sang trọng.",
    "specification": "Màn hình AMOLED 6.73 inch, Snapdragon 8 Gen 2, 12GB RAM, 512GB ROM, camera chính 50 MP, pin 5000 mAh.",
    "buyturn": 3200,
    "quantity": 60,
    "brand_id": 4,
    "category_id": 1
  },
  {
    "name": "Samsung Galaxy A54 5G",
    "image": "",
    "price": 8990000,
    "oldprice": 9990000,
    "description": "Galaxy A54 5G nổi bật với màn hình đẹp, hiệu năng ổn và hỗ trợ phần mềm lâu dài trong phân khúc tầm trung.",
    "specification": "Màn hình Super AMOLED 6.4 inch, Exynos 1380, 8GB RAM, 128GB ROM, camera chính 50 MP, pin 5000 mAh.",
    "buyturn": 5100,
    "quantity": 150,
    "brand_id": 1,
    "category_id": 1
  },
  {
    "name": "iPhone 13",
    "image": "",
    "price": 15800000,
    "oldprice": 17900000,
    "description": "iPhone 13 vẫn là lựa chọn đáng giá với hiệu năng mạnh mẽ và thiết kế thời thượng.",
    "specification": "Màn hình Super Retina XDR 6.1 inch, A15 Bionic, 4GB RAM, 128GB ROM, camera kép 12 MP, pin 3240 mAh.",
    "buyturn": 7200,
    "quantity": 120,
    "brand_id": 3,
    "category_id": 1
  },
  {
    "name": "LG Velvet",
    "image": "",
    "price": 7490000,
    "oldprice": 8900000,
    "description": "LG Velvet gây ấn tượng với thiết kế mảnh mai, camera tốt và màn hình P-OLED rực rỡ.",
    "specification": "Màn hình P-OLED 6.8 inch, Snapdragon 845, 6GB RAM, 128GB ROM, camera chính 48 MP, pin 4300 mAh.",
    "buyturn": 900,
    "quantity": 70,
    "brand_id": 5,
    "category_id": 1
  },
  {
    "name": "Samsung Galaxy Z Fold5",
    "image": "",
    "price": 41990000,
    "oldprice": 44990000,
    "description": "Galaxy Z Fold5 – điện thoại màn hình gập tiên phong, mang lại trải nghiệm gập mở mượt mà và đa nhiệm tối ưu.",
    "specification": "Màn hình chính AMOLED 7.6 inch, Snapdragon 8 Gen 2, 12GB RAM, 256GB ROM, camera chính 50 MP, pin 4400 mAh.",
    "buyturn": 1800,
    "quantity": 50,
    "brand_id": 1,
    "category_id": 1
  },
  {
    "name": "iPhone SE 2022",
    "image": "",
    "price": 9990000,
    "oldprice": 10990000,
    "description": "iPhone SE 2022 nhỏ gọn, mạnh mẽ với chip A15 Bionic – lựa chọn lý tưởng cho người yêu thích sự tối giản.",
    "specification": "Màn hình Retina 4.7 inch, A15 Bionic, 4GB RAM, 64GB ROM, camera 12 MP, pin 2018 mAh.",
    "buyturn": 2500,
    "quantity": 90,
    "brand_id": 3,
    "category_id": 1
  },
  {
    "name": "Xiaomi Redmi Note 13 Pro+ 5G",
    "image": "",
    "price": 10900000,
    "oldprice": 11900000,
    "description": "Redmi Note 13 Pro+ 5G với camera 200MP và màn hình AMOLED cong đỉnh cao trong tầm giá.",
    "specification": "Màn hình AMOLED 6.67 inch, Dimensity 7200 Ultra, 12GB RAM, 256GB ROM, camera chính 200 MP, pin 5000 mAh.",
    "buyturn": 3900,
    "quantity": 110,
    "brand_id": 4,
    "category_id": 1
  },
  {
    "name": "LG Wing 5G",
    "image": "",
    "price": 10990000,
    "oldprice": 13990000,
    "description": "LG Wing 5G với thiết kế xoay độc đáo, nâng tầm trải nghiệm đa nhiệm và giải trí.",
    "specification": "Màn hình P-OLED 6.8 inch + G-OLED phụ 3.9 inch, Snapdragon 765G, 8GB RAM, 128GB ROM, camera chính 64 MP, pin 4000 mAh.",
    "buyturn": 600,
    "quantity": 40,
    "brand_id": 5,
    "category_id": 1
  },
  {
    "name": "Samsung Galaxy M54 5G",
    "image": "",
    "price": 8490000,
    "oldprice": 9490000,
    "description": "Galaxy M54 5G pin trâu, camera tốt, hiệu năng ổn định – lựa chọn lý tưởng cho người dùng phổ thông.",
    "specification": "Màn hình Super AMOLED+ 6.7 inch, Exynos 1380, 8GB RAM, 256GB ROM, camera 108 MP, pin 6000 mAh.",
    "buyturn": 2100,
    "quantity": 130,
    "brand_id": 1,
    "category_id": 1
  },
  {
    "name": "Xiaomi Poco X6 Pro",
    "image": "",
    "price": 8990000,
    "oldprice": 9990000,
    "description": "POCO X6 Pro với hiệu năng mạnh mẽ, màn hình AMOLED 120Hz mượt mà trong phân khúc giá rẻ.",
    "specification": "Màn hình AMOLED 6.67 inch, Dimensity 8300-Ultra, 12GB RAM, 256GB ROM, camera 64 MP, pin 5000 mAh.",
    "buyturn": 2700,
    "quantity": 115,
    "brand_id": 4,
    "category_id": 1
  },
  {
    "name": "iPhone 14",
    "image": "",
    "price": 19900000,
    "oldprice": 22900000,
    "description": "iPhone 14 mang đến hiệu năng mạnh mẽ, camera cải tiến và thời lượng pin lâu hơn so với thế hệ trước.",
    "specification": "Màn hình Super Retina XDR 6.1 inch, A15 Bionic, 6GB RAM, 128GB ROM, camera kép 12 MP, pin 3279 mAh.",
    "buyturn": 3700,
    "quantity": 100,
    "brand_id": 3,
    "category_id": 1
  }
]
 
 */