import { describe, it, expect } from "vitest";
import { ThreadEndpoint } from ".";
import { ApiClient } from "@/api-client";

const endpoint = new ThreadEndpoint(new ApiClient({ accessToken: "" }));

describe("ThreadEndpoint", () => {
  describe("post", () => {
    it("should create a thread", async () => {
      const messageId = 1;
      const response = await endpoint.post(messageId);

      expect(response.data).toMatchObject({
        message_id: messageId,
      });
    });
  });
});
