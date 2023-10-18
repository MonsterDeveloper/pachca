/* c8 ignore start */
import { ApiClient, type ApiClientOptions } from "@/api-client";
import { CustomPropertiesEndpoint, UploadsEndpoint } from "@/endpoints";

export class Pachca {
  public client: ApiClient;
  public customProperties: CustomPropertiesEndpoint;
  public uploads: UploadsEndpoint;

  constructor(options: ApiClientOptions) {
    this.client = new ApiClient(options);
    this.customProperties = new CustomPropertiesEndpoint(this.client);
    this.uploads = new UploadsEndpoint(this.client);
  }
}
/* c8 ignore stop */
