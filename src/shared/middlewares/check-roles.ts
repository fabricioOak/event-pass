import type { FastifyRequest, FastifyReply } from "fastify";
import type { userRoleEnum } from "../../config/database/schema.ts";

type UserRole = (typeof userRoleEnum.enumValues)[number];

export const checkRole = (allowedRoles: UserRole[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user as { role: UserRole };
    if (!allowedRoles.includes(user.role)) {
      reply.code(403).send({
        success: false,
        message:
          "Forbidden: You do not have the required permissions to access this resource.",
      });
      return;
    }
  };
};
