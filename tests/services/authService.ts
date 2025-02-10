import { APIClient } from "../core/apiClient";

export class AuthService {
  constructor(private client: APIClient) {}

  async login(username: string, password: string) {
    await this.client.authenticate(username, password);
  }
}
