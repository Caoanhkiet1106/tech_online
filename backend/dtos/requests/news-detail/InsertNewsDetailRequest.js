import Joi from 'joi';

class InsertNewsDetailRequest {
  constructor(data = {}) {
   
    this.product_id = data.product_id; // product_ids là một danh sách các số nguyên
    this.news_id = data.news_id; // news_id là một số nguyên
  }

  static validate(data) {
    const schema = Joi.object({
        product_id: Joi.number().integer().required(), // product_ids là mảng các số nguyên và bắt buộc
        news_id: Joi.number().integer().required(), // news_id là một số nguyên và bắt buộc
    });

    return schema.validate(data, { abortEarly: false });
  }
}

export default InsertNewsDetailRequest;
