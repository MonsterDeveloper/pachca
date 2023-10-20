import { afterEach, describe, expect, it, vi } from "vitest";
import { ChatsMembersEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";

describe("MembersEndpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("post", () => {
    it("should add a user to a chat", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const endpoint = new ChatsMembersEndpoint(
        new ApiClient({ accessToken: "" }),
      );

      const chatId = 1;
      const data = { member_ids: [1, 2, 3] };

      await endpoint.post(chatId, data);

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`/chats/${chatId}/members`),
        expect.objectContaining({
          body: JSON.stringify(data),
        }),
      );
    });
  });

  describe("delete", () => {
    it("should delete a user from a chat", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const endpoint = new ChatsMembersEndpoint(
        new ApiClient({ accessToken: "" }),
      );

      const chatId = 1;
      const memberId = 1;

      await endpoint.delete(chatId, memberId);

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`/chats/${chatId}/members/${memberId}`),
        expect.objectContaining({
          method: "DELETE",
        }),
      );
    });
  });
});
