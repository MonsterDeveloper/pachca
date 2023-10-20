import { BaseEndpoint } from "@/endpoints/base-endpoint";
import type { ApiResponse } from "@/types";
import type { Thread } from "./types";
import { ENDPOINT_URL as MESSAGES_ENDPOINT_URL } from "../endpoint";

const ENDPOINT_URL = "/thread";

export class ThreadEndpoint extends BaseEndpoint {
  /**
   * Создать новое обсуждение
   *
   * @see https://crm.pachca.com/dev/threads/new/
   */
  async post(messageId: number): Promise<ApiResponse<Thread>> {
    const response = await this.client.post(
      `${MESSAGES_ENDPOINT_URL}/${messageId}${ENDPOINT_URL}`,
    );

    return response.json();
  }
}
