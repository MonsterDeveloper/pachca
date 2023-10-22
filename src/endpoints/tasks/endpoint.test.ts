import { describe, it, expect } from "vitest";
import { TasksEndpoint } from "./endpoint";
import { ApiClient } from "@/api-client";
import { TaskKind } from "./types";

const endpoint = new TasksEndpoint(new ApiClient({ accessToken: "" }));

describe("TasksEndpoint", () => {
  describe("post", () => {
    it("should create a task", async () => {
      const postData = {
        kind: TaskKind.Reminder,
        content: "Забрать со склада 21 заказ",
        due_at: "2020-06-05T12:00:00.000+0300",
        priority: 2,
      };
      const { data } = await endpoint.post({ task: postData });

      expect(data).toMatchObject({
        ...postData,
        id: expect.any(Number),
      });
    });
  });
});
