export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
  userId?: number;
  username?: string;
  displayName?: string;
  permissions?: string[];
}

export interface CurrentUser {
  id: number;
  userId: number;
  username: string;
  displayName: string;
  permissions: string[];
}
