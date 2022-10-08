import { Request, Response, Router, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validateMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/post/post.validation";
import PostService from "@/resources/post/post.service";
import Post from "@/resources/post/post.model";

class PostController implements Controller {
  public path = "/posts";
  public router = Router();
  private PostService = new PostService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}`,
      validateMiddleware(validate.create),
      this.create
    );
    this.router.get(
      `${this.path}`,
      validateMiddleware(validate.create),
      this.create
    );

    this.router.get(`${this.path}/:id`, this.getPost);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { title, body } = req.body;
      const post = await this.PostService.create(title, body);

      res.status(201).json({ post });
    } catch (error) {
      next(new HttpException(400, "Cannot create post"));
    }
  };

  private getPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const id = req.params.id;
      // const query = { _id: new ObjectId(id) };
      const post = await Post.findById(id).exec();

      if (!post) {
        return next(new HttpException(404, "post with this id does not exist"));
      }

      res.status(200).json({ post });
    } catch (error) {
      next(new HttpException(400, "Cannot create post"));
    }
  };
}

export default PostController;
