import type { ApiClient } from "@/api-client";
import { BaseEndpoint } from "../base-endpoint";
import { MessagesThreadEndpoint } from "./thread";
import type {
  GetMessagesRequest,
  Message,
  PostMessagesRequest,
  PutMessagesRequest,
} from "./types";
import type { ApiResponse } from "@/types";
import { MessagesReactionsEndpoint } from "./reactions";

export const ENDPOINT_URL = "/messages";

export class MessagesEndpoint extends BaseEndpoint {
  public thread: MessagesThreadEndpoint;
  public reactions: MessagesReactionsEndpoint;

  constructor(client: ApiClient) {
    super(client);
    this.thread = new MessagesThreadEndpoint(client);
    this.reactions = new MessagesReactionsEndpoint(client);
  }

  /**
   * Создать новое сообщение
   *
   * @description При использовании `entity_type: MessageEntityType.Discussion` (или просто без указания `entity_type`) допускается отправка любого `chat_id` в поле `entity_id`. То есть, сообщение можно отправить зная только идентификатор чата. При этом, вы имеете возможность отправить сообщение в обсуждение по его идентификатору или личное сообщение по идентификатору пользователя.
   * @see https://crm.pachca.com/dev/messages/new/
   */
  async post(data: PostMessagesRequest): Promise<ApiResponse<Message>> {
    const response = await this.client.post(ENDPOINT_URL, { body: data });

    return response.json();
  }

  /**
   * Получить информацию о сообщении
   *
   * @see https://crm.pachca.com/dev/messages/get/
   */
  async getById(id: number): Promise<ApiResponse<Message>> {
    const response = await this.client.get(`${ENDPOINT_URL}/${id}`);

    return response.json();
  }

  /**
   * Получить список сообщений чата
   *
   * @see https://crm.pachca.com/dev/messages/list/
   */
  async get(options: GetMessagesRequest): Promise<ApiResponse<Message[]>> {
    const searchParameters = new URLSearchParams(
      Object.fromEntries(
        Object.entries(options).map(([key, value]) => [key, String(value)]),
      ),
    );

    const response = await this.client.get(ENDPOINT_URL, { searchParameters });

    return response.json();
  }

  /**
   * Редактировать сообщение
   *
   * @description Строка content и массив files являются обязательными параметрами при редактировании сообщения. Если массив присылается пустым, то вложения сообщения (если они были) удаляются.
   * @see https://crm.pachca.com/dev/messages/update/
   */
  async put(
    id: number,
    data: PutMessagesRequest,
  ): Promise<ApiResponse<Message>> {
    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
    });

    return response.json();
  }
}
