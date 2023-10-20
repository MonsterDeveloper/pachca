import { BaseEndpoint } from "@/endpoints/base-endpoint";
import type { PostMembersRequest } from "./types";
import { ENDPOINT_URL as CHATS_ENDPOINT_URL } from "../endpoint";

const ENDPOINT_URL = "/members";

export class ChatsMembersEndpoint extends BaseEndpoint {
  /**
   * Добавить сотрудников в состав участников
   *
   * @see https://crm.pachca.com/dev/members/users/new/
   */
  async post(chatId: number, data: PostMembersRequest) {
    await this.client.post(`${CHATS_ENDPOINT_URL}/${chatId}${ENDPOINT_URL}`, {
      body: data,
    });
  }

  /**
   * Исключить пользователя из состава участников
   *
   * @see https://crm.pachca.com/dev/members/users/delete/
   */
  async delete(chatId: number, memberId: number) {
    await this.client.delete(
      `${CHATS_ENDPOINT_URL}/${chatId}${ENDPOINT_URL}/${memberId}`,
    );
  }
}
