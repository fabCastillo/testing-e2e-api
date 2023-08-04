const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const priceMin = Joi.number().integer();
const priceMax = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductDto = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductDto = Joi.object({
  name,
  price,
  image,
  description,
  categoryId,
});

const getProductDto = Joi.object({
  id: id.required(),
});

const queryProductDto = Joi.object({
  limit,
  offset,
  price,
  priceMin,
  priceMax: Joi.when('price_min', {
    is: Joi.exist(),
    then: priceMax.required(),
  }),
});

module.exports = {
  createProductDto, updateProductDto, getProductDto, queryProductDto,
};
