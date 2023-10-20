import { describe, it, expectTypeOf } from "vitest";
import { ThreadEndpoint } from ".";

const endpoint = new ThreadEndpoint({} as never);

const sampleThread = {
  id: 265_142,
  chat_id: 2_637_266_155,
  message_id: 154_332_686,
  message_chat_id: 2_637_266_154,
  updated_at: "2023-02-01T19:20:47.204Z",
};

describe("ThreadEndpoint", () => {
  describe("post", () => {
    it("should accept valid data", () => {
      expectTypeOf(endpoint.post).toBeCallableWith(1);

      it("should return created thread", async () => {
        const { data } = await endpoint.post({} as never);

        expectTypeOf(sampleThread).toMatchTypeOf(data);
      });
    });
  });
});
