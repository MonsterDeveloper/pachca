import type { ApiClient } from "@/api-client";
import { BaseEndpoint } from "../base-endpoint";
import { ThreadEndpoint } from "./thread";

export const ENDPOINT_URL = "/messages";

export class MessagesEndpoint extends BaseEndpoint {
  public thread: ThreadEndpoint;

  constructor(client: ApiClient) {
    super(client);
    this.thread = new ThreadEndpoint(client);
  }
}
