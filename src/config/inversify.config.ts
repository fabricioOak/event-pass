import "reflect-metadata";
import { Container } from "inversify";
import type { IUserRepository } from "../shared/interfaces/users/UserRepository.ts";
import { UserRepository } from "../modules/users/repositories/user.repository.ts";
import type { IUserService } from "../shared/interfaces/users/UserService.ts";
import { UserService } from "../modules/users/services/user.service.ts";
import type { IUserController } from "../shared/interfaces/users/UserController.ts";
import { UserController } from "../modules/users/controllers/user.controller.ts";

const container = new Container();

// Users
container
  .bind<IUserRepository>(Symbol.for("UserRepository"))
  .to(UserRepository);
container.bind<IUserService>(Symbol.for("UserService")).to(UserService);
container
  .bind<IUserController>(Symbol.for("UserController"))
  .to(UserController);

export { container };
