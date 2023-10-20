import { describe, expectTypeOf, it } from "vitest";
import { ChatsEndpoint } from "./endpoint";
import { SortDirection } from "@/types";

const endpoint = new ChatsEndpoint({} as never);

const sampleChat = {
  id: 334,
  name: "🤿 aqua",
  created_at: "2021-08-28T15:56:53.000Z",
  owner_id: 185,
  member_ids: [185, 186, 187],
  group_tag_ids: [],
  channel: true,
  public: false,
};

describe("ChatsEndpoint", () => {
  describe("post", () => {
    it("should accept valid data", () => {
      expectTypeOf(endpoint.post).toBeCallableWith({
        chat: {
          name: "🤿 aqua",
          member_ids: [186, 187],
          channel: true,
          public: false,
        },
      });

      it("should return created chat", async () => {
        const { data } = await endpoint.post({} as never);

        expectTypeOf(sampleChat).toMatchTypeOf(data);
      });
    });
  });

  describe("getById", () => {
    it("should accept chat id", () => {
      expectTypeOf(endpoint.getById).toBeCallableWith(334);
    });

    it("should return a chat", async () => {
      const { data } = await endpoint.getById(334);

      expectTypeOf(sampleChat).toMatchTypeOf(data);
    });
  });

  describe("get", () => {
    it("should be callable without arguments", () => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      expectTypeOf(endpoint.get).toBeCallableWith(undefined);
    });

    it("should accept valid options", () => {
      expectTypeOf(endpoint.get).toBeCallableWith({
        sort: {
          field: "id",
          direction: SortDirection.Ascending,
        },
        per: 50,
        page: 1,
      });
    });

    it("should return a list of chats", async () => {
      const {
        data: [chat],
      } = await endpoint.get();

      expectTypeOf(sampleChat).toMatchTypeOf(chat);
    });
  });

  describe("put", () => {
    it("should accept an id and a request body and return a user", async () => {
      const putData = {
        chat: {
          name: "Test",
        },
      };

      expectTypeOf(endpoint.put).toBeCallableWith(12, putData);

      const { data } = await endpoint.put(12, putData);

      expectTypeOf(sampleChat).toMatchTypeOf(data);
    });
  });
});
