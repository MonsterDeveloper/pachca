import { BaseEndpoint } from "../base-endpoint";
import type {
  GetCustomPropertiesRequest,
  GetCustomPropertiesResponse,
} from "./types";

const ENDPOINT_URL = "/custom_properties";

export class CustomPropertiesEndpoint extends BaseEndpoint {
  async get(
    options: GetCustomPropertiesRequest,
  ): Promise<GetCustomPropertiesResponse> {
    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters: new URLSearchParams({
        entity_type: options.entity_type,
      }),
    });

    return response.json();
  }
}
