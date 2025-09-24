import type { FastifyRequest, FastifyReply } from "fastify";
import type { IAuthController } from "../../../shared/interfaces/auth/AuthController.ts";
import type { LoginInput } from "../schemas/auth.schema.ts";
import { inject, injectable } from "inversify";
import type { IAuthService } from "../../../shared/interfaces/auth/AuthService.ts";
import type { UserPayload } from "../../../shared/types/users/user.types.ts";

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject(Symbol.for("AuthService")) private authService: IAuthService
  ) {}
  async login(
    request: FastifyRequest<{ Body: LoginInput }>,
    reply: FastifyReply
  ): Promise<void> {
    const user = await this.authService.validateUser(request.body);

    if (!user) {
      return reply.unauthorized("Invalid credentials.");
    }

    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = await reply.jwtSign(payload);

    reply
      .setCookie("access_token", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .code(200)
      .send({ success: true, user: payload, message: "Login successful." });
  }
  async logout(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    reply.clearCookie("access_token", { path: "/" }).code(200).send({
      success: true,
      message: "Logout successful.",
    });
  }
}
