import Joi from 'joi';
class InsertProductRequest {
  constructor(data = {}) {
    this.name = data.name;
    this.price = data.price;
    this.oldprice = data.oldprice;
    this.image = data.image;
    this.decription = data.description;
    this.specification = data.specification;
    this.buyturn = data.buyturn;
    this.quantity = data.quantity;
    this.category_id = data.category_id;
    this.brand_id = data.brand_id;
  }
  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required().positive(),
      oldprice: Joi.number().positive(),
      image: Joi.string().uri().allow(""),
      description: Joi.string().optional(),
      specification: Joi.string().required(),
      buyturn: Joi.number().min(0).integer(),
      quantity: Joi.number().integer().min(0),
      category_id: Joi.number().integer().required(),
      brand_id: Joi.number().integer().required(),
    });
    return schema.validate(data);
  }
}
export default InsertProductRequest;