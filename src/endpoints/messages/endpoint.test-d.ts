/* eslint-disable unicorn/no-null */
import { describe, it, expectTypeOf } from "vitest";
import { MessagesEndpoint } from ".";
import { MessageEntityType } from "./types";

const endpoint = new MessagesEndpoint({} as never);

const sampleMessage = {
  id: 194_275,
  entity_type: MessageEntityType.Discussion,
  entity_id: 198,
  chat_id: 198,
  content:
    "Вчера мы продали 756 футболок (что на 10% больше, чем в прошлое воскресенье)",
  user_id: 12,
  created_at: "2020-06-08T09:32:57.000Z",
  files: [],
  thread: null,
  parent_message_id: null,
};

describe("MessagesEndpoint", () => {
  describe("post", () => {
    it("should accept valid create input", () => {
      expectTypeOf(endpoint.post).toBeCallableWith({
        message: {
          entity_type: MessageEntityType.Discussion,
          entity_id: 198,
          content:
            "Вчера мы продали 756 футболок (что на 10% больше, чем в прошлое воскресенье)",
        },
      });
    });

    it("should return created message", async () => {
      const { data } = await endpoint.post({} as never);

      expectTypeOf(sampleMessage).toMatchTypeOf(data);
    });
  });

  describe("getById", () => {
    it("should accept valid id", () => {
      expectTypeOf(endpoint.getById).toBeCallableWith(123);
    });

    it("should return a message", async () => {
      const { data } = await endpoint.getById(123);

      expectTypeOf(sampleMessage).toMatchTypeOf(data);
    });
  });

  describe("get", () => {
    it("should accept valid options", () => {
      expectTypeOf(endpoint.get).toBeCallableWith({
        chat_id: 123,
        per: 10,
        page: 2,
      });
    });

    it("should return a list of messages", async () => {
      const { data } = await endpoint.get({
        chat_id: 123,
        per: 10,
        page: 2,
      });

      expectTypeOf([sampleMessage]).toMatchTypeOf(data);
    });
  });

  describe("put", () => {
    it("should accept valid update input", () => {
      expectTypeOf(endpoint.put).toBeCallableWith(123, {
        message: {
          content:
            "Вот попробуйте написать правильно это с первого раза: Будущий, Полощи, Прийти, Грейпфрут, Мозаика, Бюллетень, Дуршлаг, Винегрет.",
          files: [],
        },
      });
    });

    it("should return updated message", async () => {
      const { data } = await endpoint.put(123, {
        message: {
          content: "",
          files: [],
        },
      });

      expectTypeOf(sampleMessage).toMatchTypeOf(data);
    });
  });
});
