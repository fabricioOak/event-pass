import type { User } from "../../types/users/user.types.ts";
import type { UpdateUserInput } from "../../../modules/users/schemas/update.schema.ts";
import type { CreateUserInput } from "../../../modules/users/schemas/create.schema.ts";
import type {
  PaginatedUsers,
  PaginationQuery,
} from "../../../modules/users/schemas/pagination.schema.ts";

export interface IUserService {
  createUser(
    input: CreateUserInput
  ): Promise<Omit<User, "passwordHash"> | null>;
  findManyUsers(query: PaginationQuery): Promise<PaginatedUsers>;
  findUserById(id: string): Promise<User | undefined>;
  updateUser(id: string, data: UpdateUserInput): Promise<User | null>;
  deleteUser(id: string): Promise<void>;
}
