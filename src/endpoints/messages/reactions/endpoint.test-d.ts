import { describe, expectTypeOf, it } from "vitest";
import { MessagesReactionsEndpoint } from "./endpoint";

const endpoint = new MessagesReactionsEndpoint({} as never);

describe("MessagesReactionsEndpoint", () => {
  describe("post", () => {
    it("should accept valid data", () => {
      expectTypeOf(endpoint.post).toBeCallableWith(1, { code: "👍" });
    });
  });

  describe("delete", () => {
    it("should accept valid data", () => {
      expectTypeOf(endpoint.delete).toBeCallableWith(1, { code: "👍" });
    });
  });

  describe("get", () => {
    it("should accept valid options", () => {
      expectTypeOf(endpoint.get).toBeCallableWith(1);
      expectTypeOf(endpoint.get).toBeCallableWith(1, { per: 1, page: 1 });
    });

    it("should return a list of reactions", async () => {
      const { data } = await endpoint.get(1);

      expectTypeOf(data).items.toMatchTypeOf({
        user_id: 76_243,
        created_at: "2023-09-11T14:59:35.000Z",
        code: "👍",
      });
    });
  });
});
