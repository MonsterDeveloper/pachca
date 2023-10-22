import { afterEach, describe, expect, it, vi } from "vitest";
import { MessagesReactionsEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";

describe("MessagesReactionsEndpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  describe("post", () => {
    it("should create a reaction", async () => {
      const messageId = 1;
      const data = {
        code: "👍",
      };

      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const endpoint = new MessagesReactionsEndpoint(
        new ApiClient({ accessToken: "" }),
      );

      await endpoint.post(messageId, data);

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`/messages/${messageId}/reactions`),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(data),
        }),
      );
    });
  });

  describe("delete", () => {
    it("should delete a reaction", async () => {
      const messageId = 1;
      const data = {
        code: "👍",
      };

      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const endpoint = new MessagesReactionsEndpoint(
        new ApiClient({ accessToken: "" }),
      );

      await endpoint.delete(messageId, data);

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`/messages/${messageId}/reactions`),
        expect.objectContaining({
          method: "DELETE",
          body: JSON.stringify(data),
        }),
      );
    });
  });

  describe("get", () => {
    it("should get reactions without options", async () => {
      const messageId = 1;

      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const endpoint = new MessagesReactionsEndpoint(
        new ApiClient({ accessToken: "" }),
      );

      const { data } = await endpoint.get(messageId);

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`/messages/${messageId}/reactions`),
        expect.objectContaining({
          method: "GET",
        }),
      );

      expect(data[0]).toMatchObject({
        user_id: 76_243,
        created_at: "2023-09-11T14:59:35.000Z",
        code: "👍",
      });
    });

    it("should get reactions with options", async () => {
      const messageId = 1;
      const options = { per: 1, page: 1 };

      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const endpoint = new MessagesReactionsEndpoint(
        new ApiClient({ accessToken: "" }),
      );

      const { data } = await endpoint.get(messageId, options);

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          `/messages/${messageId}/reactions?per=1&page=1`,
        ),
        expect.objectContaining({
          method: "GET",
        }),
      );

      expect(data[0]).toMatchObject({
        user_id: 76_243,
        created_at: "2023-09-11T14:59:35.000Z",
        code: "👍",
      });
    });
  });
});
