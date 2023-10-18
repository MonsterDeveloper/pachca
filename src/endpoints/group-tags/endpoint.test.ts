import { GroupTagsEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";
import { describe, it, expect } from "vitest";

const endpoint = new GroupTagsEndpoint(new ApiClient({ accessToken: "" }));

describe("GroupTagsEndpoint", () => {
  describe("get", () => {
    it("should get a list of group tags", async () => {
      const { data } = await endpoint.get();

      expect(data).toStrictEqual(expect.any(Array));
      expect(data[0]).toHaveProperty("id");
      expect(data[0]).toHaveProperty("name");
      expect(data[0]).toHaveProperty("users_count");
    });
  });
});
