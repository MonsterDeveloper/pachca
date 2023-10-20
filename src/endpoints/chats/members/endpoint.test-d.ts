import { describe, expectTypeOf, it } from "vitest";
import { ChatsMembersEndpoint } from "./endpoint";

const endpoint = new ChatsMembersEndpoint({} as never);

describe("MembersEndpoint", () => {
  describe("post", () => {
    it("should accept valid data", () => {
      expectTypeOf(endpoint.post).toBeCallableWith(1, {
        member_ids: [1],
      });
    });
  });

  describe("delete", () => {
    it("should accept valid data", () => {
      expectTypeOf(endpoint.delete).toBeCallableWith(1, 1);
    });
  });
});
