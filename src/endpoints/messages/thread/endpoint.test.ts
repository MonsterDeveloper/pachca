import { describe, it, expect } from "vitest";
import { MessagesThreadEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";

const endpoint = new MessagesThreadEndpoint(new ApiClient({ accessToken: "" }));

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
