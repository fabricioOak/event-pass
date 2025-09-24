import type { LoginInput } from "../../../modules/auth/schemas/auth.schema.ts";
import type { User } from "../../types/users/user.types.ts";

export interface IAuthService {
  validateUser(credentials: LoginInput): Promise<User | null>;
}
