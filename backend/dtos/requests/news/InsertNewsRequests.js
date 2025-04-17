import Joi from 'joi';

class InsertNewsRequest {
  constructor(data = {}) {
    this.title = data.title;
    this.content = data.content;
    this.image = data.image; // Image là optional
    this.product_ids = data.product_ids; // product_ids là một danh sách các số nguyên
  }

  static validate(data) {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      image: Joi.string().uri().allow('').optional(), // Image là optional và có thể là chuỗi trống
      product_ids: Joi.array().items(Joi.number().integer()).optional(), // product_ids là mảng các số nguyên
    });

    return schema.validate(data, { abortEarly: false });
  }
}

export default InsertNewsRequest;
