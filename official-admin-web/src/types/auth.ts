export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
}

export interface CurrentUser {
  id: number;
  username: string;
  displayName: string;
  permissions: string[];
}
