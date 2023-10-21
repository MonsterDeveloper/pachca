import { describe, it, expect } from "vitest";
import { MessagesEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";
import { MessageEntityType } from "./types";

const endpoint = new MessagesEndpoint(new ApiClient({ accessToken: "" }));

describe("MessagesEndpoint", () => {
  describe("post", () => {
    it("should create a message", async () => {
      const postData = {
        message: {
          entity_type: MessageEntityType.Thread,
          entity_id: 198,
          content:
            "Вчера мы продали 756 футболок (что на 10% больше, чем в прошлое воскресенье)",
        },
      };
      const response = await endpoint.post(postData);

      expect(response.data).toMatchObject(postData.message);
    });
  });

  describe("getById", () => {
    it("should get a message by id", async () => {
      const messageId = 123;
      const response = await endpoint.getById(messageId);

      expect(response.data.id).toEqual(messageId);
    });
  });

  describe("get", () => {
    it("should get chat's messages", async () => {
      const chatId = 123;
      const response = await endpoint.get({ chat_id: chatId });

      expect(response.data).toBeInstanceOf(Array);
      expect(response.data[0]?.chat_id).toEqual(chatId);
    });
  });

  describe("put", () => {
    it("should update a message", async () => {
      const messageId = 123;
      const updateData = {
        message: {
          content:
            "Вот попробуйте написать правильно это с первого раза: Будущий, Полощи, Прийти, Грейпфрут, Мозаика, Бюллетень, Дуршлаг, Винегрет.",
          files: [],
        },
      };
      const response = await endpoint.put(messageId, updateData);

      expect(response.data).toMatchObject({
        id: messageId,
        ...updateData.message,
      });
    });
  });
});
