import { AuthenticationType } from "./authentican-type.model";

export class AddUserInfo {
  id: string;
  token: string;
  name: string;
  surname: string;
  email: string;

  password: string;
  externalToken: string;
  loginWith: AuthenticationType
}
