import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import UserService from "@/resources/user/user.service";
import validate from "@/resources/user/user.validation";
import authenticatedMiddleware from "@/middleware/authenticated.middleware";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private UserService = new UserService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validate.register),
      this.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login),
      this.login
    );
    this.router.get(
      `${this.path}/getUsers`,
      authenticatedMiddleware,
      this.getUser
    );
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { name, email, password } = req.body;

      const token = await this.UserService.register(
        name,
        email,
        password,
        "user"
      );

      return res.status(201).json({ token });
    } catch (e: any) {
      next(new HttpException(400, e.message));
    }
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;

      const token = await this.UserService.login(email, password);

      res.status(200).json({ token });
    } catch (e: any) {
      next(new HttpException(400, e.message));
    }
  };

  private getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      if (!req.user) {
        return next(new HttpException(404, "User not logged in"));
      }

      res.status(200).json({ user: req.user });
    } catch (e: any) {
      next(new HttpException(400, e.message));
    }
  };
}

export default UserController;
