import { Request, Response } from "express-serve-static-core";
import { CreateUserDto } from "../dtos/CreateUser.dto";

export function getUsers(req: Request, res: Response) {
    res.send({users: []});
}

export function getUserById(req: Request, res: Response) {
    res.send({user: {id: req.params.id}});
}

export function createUser(req: Request<{}, {}, CreateUserDto>, res: Response) {
    // Request body should be validated prior to this (e.g. by using a middleware, etc)
    res.send(
        {
            id: req.body.id,
            name: req.body.name,
        }
    )

}
