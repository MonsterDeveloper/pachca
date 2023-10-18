import { BaseEndpoint } from "../base-endpoint";
import type { UploadsData } from "./types";

const ENDPOINT_URL = "/uploads";

export class UploadsEndpoint extends BaseEndpoint {
  async post(): Promise<UploadsData> {
    const response = await this.client.post(ENDPOINT_URL);

    return response.json();
  }

  async postFile(file: Blob, { direct_url, ...uploadsData }: UploadsData) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(uploadsData)) {
      formData.append(key, value);
    }

    formData.append("file", file);

    await this.client.post(direct_url, {
      body: formData,
    });
  }
}
