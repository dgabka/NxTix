export interface ILoginPayload {
  username: string;
  password: string;
}

export interface IRegisterPayload extends ILoginPayload {
  name: string;
  age: number;
}

export interface IJwtPayload {
  username: string;
  sub: string;
}

export interface IAuthenticatedUser {
  id: string;
  username: string;
}

export interface IUserAuthEntity {
  id: string;
  username: string;
  password: string;
}

export interface IUserProfileEntity {
  userId: string;
  name: string;
  age: number;
}

export interface ILoginResponse {
  accessToken: string;
}
