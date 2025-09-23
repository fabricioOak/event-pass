import type { IUserRepository } from "../../../shared/interfaces/users/UserRepository.ts";
import type { IUserService } from "../../../shared/interfaces/users/UserService.ts";
import { inject, injectable } from "inversify";
import type { User } from "../../../shared/types/users/user.types.ts";
import { hash } from "argon2";
import type { UpdateUserInput } from "../schemas/update.schema.ts";
import type { CreateUserInput } from "../schemas/create.schema.ts";
import type {
  PaginatedUsers,
  PaginationQuery,
} from "../schemas/pagination.schema.ts";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(Symbol.for("UserRepository"))
    private userRepository: IUserRepository
  ) {}
  async findManyUsers({
    limit = 10,
    page = 1,
  }: PaginationQuery): Promise<PaginatedUsers> {
    const offset = (page - 1) * limit;

    const [allUsers, total] = await Promise.all([
      this.userRepository.findMany(limit, offset),
      this.userRepository.countAll(),
    ]);

    const usersWithoutPasswod = allUsers.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ passwordHash, ...user }) => user
    );
    const totalPages = Math.ceil(total / limit);

    return {
      data: usersWithoutPasswod,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }
  async findUserById(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findById(id);
    return user;
  }
  async updateUser(id: string, data: UpdateUserInput): Promise<User | null> {
    const updatedUser = await this.userRepository.update(id, data);
    return updatedUser;
  }
  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
  async createUser(
    input: CreateUserInput
  ): Promise<Omit<User, "passwordHash"> | null> {
    const exinstingUser = await this.userRepository.findByEmail(input.email);

    if (exinstingUser) {
      return null;
    }

    const hashedPassword = await hash(input.password);

    const newUser = await this.userRepository.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      role: input.role,
      documentNumber: input.documentNumber,
      documentType: input.documentType,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...user } = newUser;

    return user;
  }
}
