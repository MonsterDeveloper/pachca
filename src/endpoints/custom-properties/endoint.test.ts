import { afterEach, describe, expect, it, vi } from "vitest";
import { CustomPropertiesEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";
import { CustomPropertyEntityType } from ".";

describe("CustomPropertiesEndpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("get", () => {
    const endpoint = new CustomPropertiesEndpoint(
      new ApiClient({ accessToken: "" }),
    );
    it("should retrieve all custom properties", async () => {
      const { data } = await endpoint.get({
        entity_type: CustomPropertyEntityType.User,
      });

      expect(data).toHaveLength(3);
    });
  });
});
