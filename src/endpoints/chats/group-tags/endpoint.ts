import { BaseEndpoint } from "@/endpoints/base-endpoint";
import type { PostGroupTagsRequest } from "./types";
import { ENDPOINT_URL as CHATS_ENDPOINT_URL } from "../endpoint";

const ENDPOINT_URL = "/group_tags";

export class ChatsGroupTagsEndpoint extends BaseEndpoint {
  /**
   * Добавить теги в состав участников
   *
   * @see https://crm.pachca.com/dev/members/tags/new/
   */
  async post(chatId: number, data: PostGroupTagsRequest) {
    await this.client.post(`${CHATS_ENDPOINT_URL}/${chatId}${ENDPOINT_URL}`, {
      body: data,
    });
  }

  /**
   * Исключить тег из состава участников
   *
   * @see https://crm.pachca.com/dev/members/tags/delete/
   */
  async delete(chatId: number, tagId: number) {
    await this.client.delete(
      `${CHATS_ENDPOINT_URL}/${chatId}${ENDPOINT_URL}/${tagId}`,
    );
  }
}
