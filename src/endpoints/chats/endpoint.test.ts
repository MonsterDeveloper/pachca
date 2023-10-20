import { describe, it, expect, vi, afterEach } from "vitest";
import { ChatsEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";
import { SortDirection } from "@/types";
import { ChatAvailability } from "./types";

const endpoint = new ChatsEndpoint(new ApiClient({ accessToken: "" }));

describe("ChatsEndpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("post", () => {
    it("should create a chat", async () => {
      const requestData = {
        chat: {
          name: "🤿 aqua",
          member_ids: [186, 187],
          channel: true,
          public: false,
        },
      };

      const response = await endpoint.post(requestData);

      expect(response.data).toMatchObject(requestData.chat);
    });
  });

  describe("getById", () => {
    it("should get a chat by id", async () => {
      const id = 334;
      const { data } = await endpoint.getById(id);

      expect(data.id).toEqual(id);
    });
  });

  describe("get", () => {
    it("should return a list of chats without params", async () => {
      const { data } = await endpoint.get();

      expect(data).toStrictEqual(expect.any(Array));
    });

    it("should return a list of chats with params", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const endpoint = new ChatsEndpoint(new ApiClient({ accessToken: "" }));

      await endpoint.get({
        sort: {
          field: "id",
          direction: SortDirection.Descending,
        },
        per: 50,
        page: 1,
        availability: ChatAvailability.Public,
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          encodeURI("?sort[id]=desc&per=50&page=1&availability=public"),
        ),
        expect.any(Object),
      );
    });
  });

  describe("put", () => {
    it("should update a chat", async () => {
      const putData = {
        chat: {
          name: "Test",
          public: true,
        },
      };

      const response = await endpoint.put(12, putData);

      expect(response.data).toMatchObject(putData.chat);
    });
  });
});
