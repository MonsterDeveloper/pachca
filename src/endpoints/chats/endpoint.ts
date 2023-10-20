import type { ApiResponse, Simplify } from "@/types";
import { BaseEndpoint } from "../base-endpoint";
import type {
  Chat,
  GetChatsRequest,
  PostChatsRequest,
  PutChatsRequest,
} from "./types";
import { ChatsMembersEndpoint } from "./members";
import { ChatsGroupTagsEndpoint } from "./group-tags";
import type { ApiClient } from "@/api-client";

export const ENDPOINT_URL = "/chats";

export class ChatsEndpoint extends BaseEndpoint {
  public members: ChatsMembersEndpoint;
  public groupTags: ChatsGroupTagsEndpoint;

  constructor(client: ApiClient) {
    super(client);
    this.members = new ChatsMembersEndpoint(client);
    this.groupTags = new ChatsGroupTagsEndpoint(client);
  }

  /**
   * Создать новую беседу или канал
   *
   * @see https://crm.pachca.com/dev/chats/new/
   */
  async post(data: Simplify<PostChatsRequest>): Promise<ApiResponse<Chat>> {
    const response = await this.client.post(ENDPOINT_URL, { body: data });

    return response.json();
  }

  /**
   * Получение информацию о беседе или канале
   *
   * @see https://crm.pachca.com/dev/chats/get/
   */
  async getById(id: number): Promise<ApiResponse<Chat>> {
    const response = await this.client.get(`${ENDPOINT_URL}/${id}`);

    return response.json();
  }

  /**
   * Получить список бесед и каналов
   *
   * @see https://crm.pachca.com/dev/chats/list/
   */
  async get(options?: GetChatsRequest): Promise<ApiResponse<Chat[]>> {
    const searchParameters =
      options &&
      new URLSearchParams(
        Object.fromEntries(
          Object.entries(options).map(([key, value]) =>
            key === "sort"
              ? [`sort[${value.field}]`, value.direction]
              : [key, String(value)],
          ),
        ),
      );

    const response = await this.client.get(ENDPOINT_URL, { searchParameters });

    return response.json();
  }

  /**
   * Редактирование беседы или канала
   *
   * @see https://crm.pachca.com/dev/chats/update/
   */
  async put(
    id: number,
    data: Simplify<PutChatsRequest>,
  ): Promise<ApiResponse<Chat>> {
    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
    });

    return response.json();
  }
}
