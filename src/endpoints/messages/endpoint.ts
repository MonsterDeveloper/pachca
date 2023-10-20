import type { ApiClient } from "@/api-client";
import { BaseEndpoint } from "../base-endpoint";
import { MessagesThreadEndpoint } from "./thread";

export const ENDPOINT_URL = "/messages";

export class MessagesEndpoint extends BaseEndpoint {
  public thread: MessagesThreadEndpoint;

  constructor(client: ApiClient) {
    super(client);
    this.thread = new MessagesThreadEndpoint(client);
  }
}
