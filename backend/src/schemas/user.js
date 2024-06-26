import joi from "joi";

const userSchema = joi.object().keys({
  name: joi.string().required(),
  email: joi.string().email(),
  password: joi.string().required(),
});

export default userSchema;
