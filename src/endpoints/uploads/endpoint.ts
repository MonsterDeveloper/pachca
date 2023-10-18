import { BaseEndpoint } from "../base-endpoint";
import type { UploadsData } from "./types";

const ENDPOINT_URL = "/uploads";

export class UploadsEndpoint extends BaseEndpoint {
  /** Получить данные для загрузки файла
   *
   * @see https://crm.pachca.com/dev/common/fields/
   */
  async post(): Promise<UploadsData> {
    const response = await this.client.post(ENDPOINT_URL);

    return response.json();
  }

  /** Загрузить файл
   *
   * @param file Файл для загрузки
   * @param uploadsData Данные для загрузки (из метода `post`)
   */
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
