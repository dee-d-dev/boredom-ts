import UserModel from "@/resources/user/user.model";
import token from "@/utils/token";

class UserService {
  private user = UserModel;

  //register a new user

  public async register(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<string | Error> {
    try {
      const user = await this.user.create({
        name,
        email,
        password,
        role,
      });

      const accessToken = token.createToken(user);
      return accessToken;
    } catch (err) {
      throw new Error("Unable to create user");
    }
  }

  //login a user
  public async login(email: string, password: string): Promise<string | Error> {
    try {
      const user = await this.user.findOne({ email });

      if (!user) {
        throw new Error("User witih this email doesn't exist");
      }

      if (await user.isValidPassword(password)) {
        return token.createToken(user);
      } else {
        throw new Error("Wrong credentials given");
      }
    } catch (err) {
      throw new Error("Unable to login");
    }
  }
}

export default UserService