import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/post/post.validation';    // NOTE: default export is an OBJECT with Joi objects: Therefore, validate is an object containing those Joi objects
import PostService from '@/resources/post/post.service';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();   // this could also have been done in the constructor

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}`, validationMiddleware(validate.create), this.create);
    }

    // originally in the tutorial, this stated to set the return type as 'Promise<Request | void>', however that caused an error in the
    // initialize routes method by generating an error on the this.create reference that no overload matches the call and that the type
    // RequestHandler is not assignable to type Promise<void> or void. As such modified the return type to Promise<any>
    private create = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { title, body } = req.body;

            const post = await this.PostService.create(title, body);

            res.status(201).json({ post });

        } catch (error: any) { // need to specify type any, otherwise we receive an error that it is of type 'unknown'. Not sure what the specific error type needs to be otherwise besides any...
            // next(new HttpException(400, 'Cannot create post'));  // this could also be set to error.message to used the passed through message from the service
            const { title, body } = req.body;
            next(new HttpException(400, error.message));

        }

    };

}

export default PostController;
