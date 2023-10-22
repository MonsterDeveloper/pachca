import type { ApiResponse } from "@/types";
import { BaseEndpoint } from "../base-endpoint";
import type { PostTasksRequest, Task } from "./types";

const ENDPOINT_URL = "/tasks";

export class TasksEndpoint extends BaseEndpoint {
  /**
   * Создать новую задачу. На текущий момент данный метод поддерживает только создание задач без привязки к каким-либо сущностям.
   *
   * @description При создании задачи обязательным условием является указания типа задачи: звонок, встреча, напоминание, событие или письмо. При этом не требуется дополнительное описание - вы просто создадите задачу с соответствующим текстом. Если вы укажите описание задачи - то именно оно и станет текстом задачи. У задачи должны быть ответственные, если их не указывать - ответственным назначаетесь вы. Ответственным для задачи без привязки к каким-либо сущностям может стать любой сотрудник компании. Актуальный состав сотрудников компании вы можете получить в методе список сотрудников.
   * @see https://crm.pachca.com/dev/tasks/new/
   */
  async post(data: PostTasksRequest): Promise<ApiResponse<Task>> {
    const response = await this.client.post(ENDPOINT_URL, { body: data });

    return response.json();
  }
}
