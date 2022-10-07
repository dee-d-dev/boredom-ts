import PostModel from "@/resources/post/post.model";
import Post from "@/resources/post/post.interface";

class PostService {
  private post = PostModel;

  /*Create a new post*/
  public async create(title: string, body: string): Promise<Post> {
    try {
      const post = await this.post.create({ title, body });
      return post;
    } catch (error) {
      throw new Error("unable to create post");
    }
  }

  // public async getPost (
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
export default PostService;
