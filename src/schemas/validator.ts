import * as ExpressJoiValidator from "express-joi-validation";

export const AppValidator = ExpressJoiValidator.createValidator({
  passError: true,
});
