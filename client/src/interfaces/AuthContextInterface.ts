export interface AuthContextInterface {
  user: { username: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}