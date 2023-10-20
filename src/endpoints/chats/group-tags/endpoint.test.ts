import { afterEach, describe, expect, it, vi } from "vitest";
import { ChatsGroupTagsEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";

describe("MembersEndpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("post", () => {
    it("should add a user to a chat", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const endpoint = new ChatsGroupTagsEndpoint(
        new ApiClient({ accessToken: "" }),
      );

      const chatId = 1;
      const data = { group_tag_ids: [1, 2, 3] };

      await endpoint.post(chatId, data);

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`/chats/${chatId}/group_tags`),
        expect.objectContaining({
          body: JSON.stringify(data),
        }),
      );
    });
  });

  describe("delete", () => {
    it("should delete a user from a chat", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const endpoint = new ChatsGroupTagsEndpoint(
        new ApiClient({ accessToken: "" }),
      );

      const chatId = 1;
      const groupTagId = 1;

      await endpoint.delete(chatId, groupTagId);

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`/chats/${chatId}/group_tags/${groupTagId}`),
        expect.objectContaining({
          method: "DELETE",
        }),
      );
    });
  });
});
