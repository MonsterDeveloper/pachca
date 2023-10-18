import type { ApiResponse } from "@/types";
import { BaseEndpoint } from "../base-endpoint";
import type { GetGroupTagsRequest, GroupTag } from "./types";

const ENDPOINT_URL = "/group_tags";

export class GroupTagsEndpoint extends BaseEndpoint {
  /**
   * Получить список тегов сотрудников
   *
   * @see https://crm.pachca.com/dev/group_tags/list/
   */
  async get(options?: GetGroupTagsRequest): Promise<ApiResponse<GroupTag[]>> {
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
