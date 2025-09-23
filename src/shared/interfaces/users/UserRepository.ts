import type { User } from "../../types/users/user.types.ts";
import type { UpdateUserInput } from "../../../modules/users/schemas/update.schema.ts";
import type { CreateUserInput } from "../../../modules/users/schemas/create.schema.ts";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findMany(limit: number, offset: number): Promise<User[]>;
  countAll(): Promise<number>;
  create(data: CreateUserInput): Promise<User>;
  update(id: string, data: UpdateUserInput): Promise<User | null>;
  delete(id: string): Promise<void>;
}
