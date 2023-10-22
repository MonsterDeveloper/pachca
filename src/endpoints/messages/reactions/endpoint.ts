import { BaseEndpoint } from "@/endpoints/base-endpoint";
import type {
  DeleteReactionsRequest,
  GetReactionsRequest,
  PostReactionsRequest,
  Reaction,
} from "./types";
import { ENDPOINT_URL as MESSAGES_ENDPOINT_URL } from "../endpoint";
import type { ApiResponse } from "@/types";

export const ENDPOINT_URL = "/reactions";

export class MessagesReactionsEndpoint extends BaseEndpoint {
  /**
   * Добавить реакцию
   *
   * @see https://crm.pachca.com/dev/reactions/new/
   */
  async post(messageId: number, data: PostReactionsRequest) {
    await this.client.post(
      `${MESSAGES_ENDPOINT_URL}/${messageId}${ENDPOINT_URL}`,
      { body: data },
    );
  }

  /**
   * Удалить реакцию
   *
   * @see https://crm.pachca.com/dev/reactions/delete/
   */
  async delete(messageId: number, data: DeleteReactionsRequest) {
    await this.client.delete(
      `${MESSAGES_ENDPOINT_URL}/${messageId}${ENDPOINT_URL}`,
      { body: data },
    );
  }

  /**
   * Получить список реакций
   *
   * @see https://crm.pachca.com/dev/reactions/list/
   */
  async get(
    messageId: number,
    options?: GetReactionsRequest,
  ): Promise<ApiResponse<Reaction[]>> {
    const searchParameters =
      options &&
      new URLSearchParams(
        Object.fromEntries(
          Object.entries(options).map(([key, value]) => [key, String(value)]),
        ),
      );
    const response = await this.client.get(
      `${MESSAGES_ENDPOINT_URL}/${messageId}${ENDPOINT_URL}`,
      { searchParameters },
    );

    return response.json();
  }
}
