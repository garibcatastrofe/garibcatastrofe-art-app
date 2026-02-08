/* COMISIONS */
import { clsInsertComision } from "@/src/Comisions/Application/Services/clsInsertComision";
import { clsComisionRepository } from "@/src/Comisions/Infrastructure/clsComisionRepository";

/* USERS */
import { clsSignUp } from "@/src/Users/Application/Services/clsSignUp";
import { clsSignIn } from "@/src/Users/Application/Services/clsSignIn";
import { clsUserRepository } from "@/src/Users/Infrastructure/clsUserRepository";

const ComisionRepository = new clsComisionRepository();
const UserRepository = new clsUserRepository();

export const ServiceContainer = {
  Comisions: {
    InsertComision: new clsInsertComision(ComisionRepository),
  },
  Users: {
    SignUp: new clsSignUp(UserRepository),
    SignIn: new clsSignIn(UserRepository),
  },
};
