import Joi from 'joi';
// import bcrypt from 'bcryptjs';

class InsertUserRequest {
  constructor(data = {}) {
    this.email = data.email;
    this.password = data.password;  
    this.name = data.name;
    this.role = data.role;
    this.avatar = data.avatar;
    this.phone = data.phone;
  }


  static validate(data) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),  // Validate password length
      name: Joi.string().required(),
      role: Joi.number().integer().min(1).required(),
      avatar: Joi.string().uri().optional(),
      phone: Joi.string().optional(),
    });

    return schema.validate(data, { abortEarly: false });
  }
}

export default InsertUserRequest;
