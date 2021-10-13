import { AuthenticationType } from "./authentican-type.model";

export class UserInfo {
  constructor() {}
  id: string;
  token: string;
  name: string;
  surname: string;
  email: string;
  languageId: string;

  externalId: string;
  loginWith: AuthenticationType
}
