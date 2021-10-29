import { AuthenticationType } from "./authentican-type.model";

export class AddUserInfo {
  constructor() {}
  
  id: string;
  token: string;
  name: string;
  surname: string;
  email: string;

  externalToken: string;
  loginWith: AuthenticationType
}
