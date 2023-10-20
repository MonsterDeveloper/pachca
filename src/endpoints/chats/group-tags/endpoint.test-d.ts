import { describe, expectTypeOf, it } from "vitest";
import { ChatsGroupTagsEndpoint } from "./endpoint";

const endpoint = new ChatsGroupTagsEndpoint({} as never);

describe("MembersEndpoint", () => {
  describe("post", () => {
    it("should accept valid data", () => {
      expectTypeOf(endpoint.post).toBeCallableWith(1, {
        group_tag_ids: [1],
      });
    });
  });

  describe("delete", () => {
    it("should accept valid data", () => {
      expectTypeOf(endpoint.delete).toBeCallableWith(1, 1);
    });
  });
});
