export const AuthLoginMsg = {
  service: 'auth',
  cmd: 'login',
} as const;

export const AuthRegisterMsg = {
  service: 'auth',
  cmd: 'register',
} as const;

export const AuthVerifyMsg = {
  service: 'auth',
  cmd: 'verify',
} as const;

export const UserGetAuthMsg = {
  service: 'user',
  cmd: 'getAuth',
} as const;

export const UserCreateMsg = {
  service: 'user',
  cmd: 'create',
};

export const UserGetProfileMsg = {
  service: 'user',
  cmd: 'getProfile',
};
