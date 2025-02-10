import { request, APIRequestContext, APIResponse } from "@playwright/test";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export class APIClient {
  private apiContext!: APIRequestContext;
  private authToken: string | null = null;

  constructor(private baseURL: string) {}

  async init() {
    this.apiContext = await request.newContext({ baseURL: this.baseURL });
  }

  private getHeaders(
    headers: Record<string, string> = {}
  ): Record<string, string> {
    return this.authToken
      ? { ...headers, Cookie: `token=${this.authToken}` }
      : headers;
  }

  async post(
    endpoint: string,
    data: object,
    headers: Record<string, string> = {}
  ): Promise<APIResponse> {
    return this.apiContext.post(endpoint, {
      data,
      headers: this.getHeaders(headers),
    });
  }

  async get(
    endpoint: string,
    headers: Record<string, string> = {}
  ): Promise<APIResponse> {
    return this.apiContext.get(endpoint, { headers: this.getHeaders(headers) });
  }

  async put(
    endpoint: string,
    data: object,
    headers: Record<string, string> = {}
  ): Promise<APIResponse> {
    return this.apiContext.put(endpoint, {
      data,
      headers: this.getHeaders(headers),
    });
  }

  async patch(
    endpoint: string,
    data: object,
    headers: Record<string, string> = {}
  ): Promise<APIResponse> {
    return this.apiContext.patch(endpoint, {
      data,
      headers: this.getHeaders(headers),
    });
  }

  async delete(
    endpoint: string,
    headers: Record<string, string> = {}
  ): Promise<APIResponse> {
    return this.apiContext.delete(endpoint, {
      headers: this.getHeaders(headers),
    });
  }

  async authenticate(username: string, password: string) {
    const response = await this.post(API_ENDPOINTS.AUTHENTICATE, {
      username,
      password,
    });
    if (response.ok()) {
      const responseBody = await response.json();
      this.authToken = responseBody.token;
    } else {
      throw new Error(`Authentication failed with status: ${response.status} `);
    }
  }
}
