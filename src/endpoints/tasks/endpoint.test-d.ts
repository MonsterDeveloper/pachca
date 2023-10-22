import { describe, expectTypeOf, it } from "vitest";
import { TasksEndpoint } from "./endpoint";
import { TaskKind } from "./types";

const endpoint = new TasksEndpoint({} as never);

describe("TasksEndpoint", () => {
  describe("post", () => {
    it("should accept valid data", () => {
      expectTypeOf(endpoint.post).toBeCallableWith({
        task: {
          kind: TaskKind.Reminder,
          content: "Забрать со склада 21 заказ",
          due_at: "2020-06-05T12:00:00.000+0300",
          priority: 2,
        },
      });
    });

    it("should return created task", async () => {
      const postData = {
        kind: TaskKind.Reminder,
        content: "Забрать со склада 21 заказ",
        due_at: "2020-06-05T12:00:00.000+0300",
        priority: 2,
      };
      const { data } = await endpoint.post({ task: postData });

      expectTypeOf(data).toMatchTypeOf(postData);
    });
  });
});
