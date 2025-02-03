import Joi from 'joi';

const create = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
});

const update = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
});


// export an OBJECT containing create. The idea of this file is that it contains all the validation we'd need to perform actions on the POST resource.
export default { create };
