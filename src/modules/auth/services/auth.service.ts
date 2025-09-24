import { inject, injectable } from "inversify";
import type { IAuthService } from "../../../shared/interfaces/auth/AuthService.ts";
import type { User } from "../../../shared/types/users/user.types.ts";
import type { LoginInput } from "../schemas/auth.schema.ts";
import type { IUserRepository } from "../../../shared/interfaces/users/UserRepository.ts";
import { verify } from "argon2";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(Symbol.for("UserRepository"))
    private userRepository: IUserRepository
  ) {}
  async validateUser(credentials: LoginInput): Promise<User | null> {
    const user = await this.userRepository.findByEmail(credentials.email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await verify(
      user.passwordHash,
      credentials.password
    );

    if (!isPasswordValid) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
}
