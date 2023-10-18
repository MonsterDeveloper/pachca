import { describe, expect, it } from "vitest";
import { CustomPropertiesEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";
import { CustomPropertyEntityType } from "./types";

const endpoint = new CustomPropertiesEndpoint(
  new ApiClient({ accessToken: "" }),
);

describe("CustomPropertiesEndpoint", () => {
  describe("get", () => {
    it("should retrieve all custom properties", async () => {
      const { data } = await endpoint.get({
        entity_type: CustomPropertyEntityType.User,
      });

      expect(data).toHaveLength(3);
    });
  });
});
