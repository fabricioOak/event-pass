import { userRoleEnum } from "../../config/database/schema.ts";

export const roles = {
  ADMIN: userRoleEnum.enumValues[0],
  ORGANIZER: userRoleEnum.enumValues[1],
  ATTENDEE: userRoleEnum.enumValues[2],
};
