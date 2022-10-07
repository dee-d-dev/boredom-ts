import { Request, Response, Router, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validateMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/post/post.validation";
import PostService from "@/resources/post/post.service";

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
  // private getPost = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response | void> => {
  //   try {
  //     const post = await 
  //     if(!req.params.id){
  //       return next(new HttpException(404, "no post"));
  //     }

  //     res.status(201).json({ post: req.post });
  //   } catch (error) {
  //     next(new HttpException(400, "Cannot create post"));
  //   }
  // };
}

export default PostController;
