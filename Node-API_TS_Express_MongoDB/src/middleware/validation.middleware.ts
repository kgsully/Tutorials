import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';      // Joi is a validation library

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const validationOptions = {
            abortEarly: false,   // on first validation failure, it will stop and return to the user the error. However, it will only provide the 1st error encountered
            allowUnknown: true,  // allows values that aren't part of the schema. won't fail if something passed through isn't part of the schema
            stripUnknown: true,  // allows data submittal that isn't part of the schema, but it will be removed from the schema if it isn't part of the schema
        };

        try {
            const value = await schema.validateAsync(req.body, validationOptions);
            console.log(req.body);
            req.body = value;  // value should be = to the data that is passed through after being compared to the Schema and applying all these options - SHOULD be valid data
            next();
        } catch (e: any) {      // had to specify type any as would produce an error in line where e.details.forEach is present stating that type of e is 'unknown'
            const errors: string[] = [];
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            errors.push(req.body);
            res.status(400).send({ errors: errors });
        }
    }
}

export default validationMiddleware;
