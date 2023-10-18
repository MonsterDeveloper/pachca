import { GroupTagsEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";
import { describe, it, expect, vi } from "vitest";

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

    it("should get a list of group tags with options", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");

      await new GroupTagsEndpoint(new ApiClient({ accessToken: "" })).get({
        per: 10,
        page: 2,
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining("?per=10&page=2"),
        expect.any(Object),
      );
    });
  });
});
