import { injectable } from "inversify";
import { db } from "../../../config/database/client.ts";
import { users } from "../../../config/database/schema.ts";
import { count, eq } from "drizzle-orm";
import type { User } from "../../../shared/types/users/user.types.ts";
import type { IUserRepository } from "../../../shared/interfaces/users/UserRepository.ts";
import type { UpdateUserInput } from "../schemas/update.schema.ts";
import type { CreateUserInput } from "../schemas/create.schema.ts";

@injectable()
export class UserRepository implements IUserRepository {
  async countAll(): Promise<number> {
    const [result] = await db.select({ count: count() }).from(users);
    return result.count;
  }
  async findById(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async findMany(limit: number, offset: number): Promise<User[]> {
    const allUsers = await db.select().from(users).limit(limit).offset(offset);
    return allUsers;
  }
  async create(data: CreateUserInput): Promise<User> {
    const [newUser] = await db
      .insert(users)
      .values({
        ...data,
        passwordHash: data.password,
      })
      .returning();
    return newUser;
  }
  async update(id: string, data: UpdateUserInput): Promise<User | null> {
    const [updatedUser] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return updatedUser || null;
  }
  async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
}
