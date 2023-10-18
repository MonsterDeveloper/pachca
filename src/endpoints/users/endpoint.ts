import type { ApiResponse, Simplify } from "@/types";
import { BaseEndpoint } from "../base-endpoint";
import {
  type GetUsersRequest,
  type PostUsersRequest,
  type User,
} from "./types";

const ENDPOINT_URL = "/users";

export class UsersEndpoint extends BaseEndpoint {
  /**
   * Создать сотдруника
   *
   * @see https://crm.pachca.com/dev/users/new/
   */
  async post(data: Simplify<PostUsersRequest>): Promise<ApiResponse<User>> {
    const response = await this.client.post(ENDPOINT_URL, { body: data });

    return response.json();
  }

  /**
   * Получить список сотрудников
   *
   * @see https://crm.pachca.com/dev/users/list/
   */
  async get(options?: GetUsersRequest): Promise<ApiResponse<User[]>> {
    const searchParameters =
      options &&
      new URLSearchParams(
        Object.fromEntries(
          Object.entries(options).map(([key, value]) => [key, String(value)]),
        ),
      );

    const response = await this.client.get(ENDPOINT_URL, { searchParameters });

    return response.json();
  }
}
