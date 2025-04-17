import Joi from 'joi';

class InsertBannerRequest {
  constructor(data = {}) {
    this.name = data.name;
    this.image = data.image;
    this.status = data.status;
  }
  static validate(data) {
    const schema = Joi.object({
        name: Joi.string().required(),
        image: Joi.string().uri().allow('',null),
        status: Joi.number().integer().min(1).required(),
    });

    return schema.validate(data, { abortEarly: false });
  }
}

export default InsertBannerRequest;
