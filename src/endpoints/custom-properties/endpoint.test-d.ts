import { describe, expectTypeOf, it } from "vitest";
import { CustomPropertiesEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";
import { CustomPropertyEntityType } from "./types";

const endpoint = new CustomPropertiesEndpoint(
  new ApiClient({ accessToken: "" }),
);

describe("CustomPropertiesEndpoint", () => {
  describe("get", () => {
    it("should return correct custom properties type", async () => {
      expectTypeOf(
        endpoint.get({ entity_type: CustomPropertyEntityType.User }),
      ).resolves.toMatchTypeOf({
        data: [
          {
            id: 1487,
            name: "Адрес",
            data_type: "string",
          },
          {
            id: 1489,
            name: "Номер доступа",
            data_type: "number",
          },
          {
            id: 1572,
            name: "Дата рождения",
            data_type: "date",
          },
        ],
      });
    });
  });
});
