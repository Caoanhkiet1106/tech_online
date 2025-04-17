import Joi from 'joi';

class UpdateProductRequest {
  constructor(data = {}) {
    // Tất cả các trường có thể nullable
    this.name = data.name;
    this.price = data.price;
    this.oldprice = data.oldprice;
    this.image = data.image;
    this.description = data.description; // Fix lỗi chính tả: "decription"
    this.specification = data.specification;
    this.buyturn = data.buyturn;
    this.quantity = data.quantity;
    this.category_id = data.category_id;
    this.brand_id = data.brand_id;
  }

  static validate(data) {
    // Nếu có giá trị thì phải hợp lệ, nếu không thì có thể undefined
    const schema = Joi.object({
      name: Joi.string().optional(),
      price: Joi.number().positive().optional(),
      oldprice: Joi.number().positive().optional(),
      image: Joi.string().uri().allow("").optional(),
      description: Joi.string().optional(),
      specification: Joi.string().optional(),
      buyturn: Joi.number().integer().min(0).optional(),
      quantity: Joi.number().integer().min(0).optional(),
      category_id: Joi.number().integer().optional(),
      brand_id: Joi.number().integer().optional(),
    });

    return schema.validate(data, { abortEarly: false });
  }
}

export default UpdateProductRequest;
