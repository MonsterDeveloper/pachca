import type { Simplify } from "@/types";

/** Тип задачи */
export enum TaskKind {
  /** позвонить контакту */
  Call = "call",
  /** встреча */
  Meeting = "meeting",
  /** напоминание */
  Reminder = "reminder",
  /** событие */
  Event = "event",
  /** написать письмо */
  Email = "email",
}

/** Задача */
export interface Task {
  /** Идентификатор задачи */
  id: number;
  /** Тип */
  kind: TaskKind;
  /** Описание */
  content: string;
  /** Срок выполнения задачи (ISO-8601, UTC+0) в формате `YYYY-MM-DDThh:mm:ss.sssZ` */
  due_at: string;
  /** Приоритет */
  priority: number;
  /** Идентификатор пользователя-создателя задачи */
  user_id: number;

  // TODO extract to enum
  /** Статус задачи (активная - `undone`) */
  status: string;
  /** Дата и время создания задачи (ISO-8601, UTC+0) в формате `YYYY-MM-DDThh:mm:ss.sssZ` */
  created_at: string;
  /** Массив идентификаторов пользователей, привязанных к задаче как «ответственные» */
  performer_ids: number[];
}

export interface PostTasksRequest {
  task: Simplify<
    Pick<Task, "kind"> &
      Partial<Pick<Task, "content" | "due_at" | "priority" | "performer_ids">>
  >;
}
