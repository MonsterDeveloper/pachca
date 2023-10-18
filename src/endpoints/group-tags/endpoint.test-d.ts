import { describe, it, expectTypeOf } from "vitest";
import { GroupTagsEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";

const endpoint = new GroupTagsEndpoint(new ApiClient({ accessToken: "" }));

describe("UsersEndpoint", () => {
  describe("get", () => {
    it("should accept request options and return a list of group tags", async () => {
      expectTypeOf(endpoint.get).toBeCallableWith({
        per: 10,
        page: 2,
      });
      // eslint-disable-next-line unicorn/no-useless-undefined
      expectTypeOf(endpoint.get).toBeCallableWith(undefined);

      const { data } = await endpoint.get();

      expectTypeOf({
        id: 9111,
        name: "Design",
        users_count: 6,
      }).toMatchTypeOf(data[0]);
    });
  });
});
