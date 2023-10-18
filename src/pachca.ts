/* c8 ignore start */
import { ApiClient, type ApiClientOptions } from "@/api-client";
import { CustomPropertiesEndpoint } from "@/endpoints";

export class Pachca {
  public client: ApiClient;
  public customProperties: CustomPropertiesEndpoint;

  constructor(options: ApiClientOptions) {
    this.client = new ApiClient(options);
    this.customProperties = new CustomPropertiesEndpoint(this.client);
  }
}
/* c8 ignore stop */
