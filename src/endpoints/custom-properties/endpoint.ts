import type { ApiResponse } from "@/types";
import { BaseEndpoint } from "../base-endpoint";
import type { CustomProperty, GetCustomPropertiesRequest } from "./types";

const ENDPOINT_URL = "/custom_properties";

export class CustomPropertiesEndpoint extends BaseEndpoint {
  async get(
    options: GetCustomPropertiesRequest,
  ): Promise<ApiResponse<CustomProperty[]>> {
    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters: new URLSearchParams({
        entity_type: options.entity_type,
      }),
    });

    return response.json();
  }
}
