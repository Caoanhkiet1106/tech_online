import Joi from 'joi';

class UpdateNewsRequest {
  constructor(data = {}) {
    this.title = data.title;
    this.content = data.content;
    this.image = data.image; // Image là optional
   
  }

  static validate(data) {
    const schema = Joi.object({
      title: Joi.string().optional().allow(null), // title là optional
      content: Joi.string().optional().allow(null), // content là optional
      image: Joi.string().uri().allow('',null).optional(), // Image là optional và có thể là chuỗi trống
    });

    return schema.validate(data, { abortEarly: false });
  }
}

export default UpdateNewsRequest;
