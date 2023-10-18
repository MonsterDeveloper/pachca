import type { ApiResponse, Simplify } from "@/types";
import { BaseEndpoint } from "../base-endpoint";
import {
  type GetUsersRequest,
  type PostUsersRequest,
  type PutUserRequest,
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

  /**
   * Получить информацию о сотруднике
   *
   * @see https://crm.pachca.com/dev/users/get/
   */
  async getById(id: number): Promise<ApiResponse<User>> {
    const response = await this.client.get(`${ENDPOINT_URL}/${id}`);

    return response.json();
  }

  /**
   * Редактировать сотрудника
   *
   * @see https://crm.pachca.com/dev/users/update/
   */
  async put(
    id: number,
    data: Simplify<PutUserRequest>,
  ): Promise<ApiResponse<User>> {
    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
    });

    return response.json();
  }

  /**
   * Удалить сотрудника
   *
   * @see https://crm.pachca.com/dev/users/delete/
   */
  async delete(id: number) {
    await this.client.delete(`${ENDPOINT_URL}/${id}`);
  }
}
