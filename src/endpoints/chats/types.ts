import type { Simplify, SortOption } from "@/types";

/** Беседа / канал */
export interface Chat {
  /** Идентификатор беседы или канала */
  id: number;
  /** Название */
  name: string;
  /** Идентификатор пользователя, создавшего беседу или канал */
  owner_id?: number;
  /** Дата и время создания беседы или канала (ISO-8601, UTC+0) в формате `YYYY-MM-DDThh:mm:ss.sssZ` */
  created_at: string;
  /** Массив идентификаторов пользователей, участников */
  member_ids?: number[];
  /** Массив идентификаторов тегов, участников */
  group_tag_ids?: number[];
  /** Тип: беседа (`false`) или канал (`true`) */
  channel?: boolean;
  /** Доступ: закрытый (`false`) или открытый (`true`) */
  public?: boolean;
}

export interface PostChatsRequest {
  /** Собранный объект параметров создаваемой беседы или канала */
  chat: Simplify<Omit<Chat, "id" | "owner_id" | "created_at">>;
}

export enum ChatAvailability {
  /** Беседы и каналы, где пользователь является участником */
  IsMember = "is_member",
  /** Все открытые беседы и каналы компании, вне зависимости от участия в них пользователя */
  Public = "public",
}

export type GetChatsSortableFields = "id";

export interface GetChatsRequest {
  /** Составной параметр сортировки сущностей выборки. */
  sort?: SortOption<GetChatsSortableFields>;
  /**
   * Количество возвращаемых сущностей за один запрос (максимум 200)
   *
   * @default 25
   */
  per?: number;
  /**
   * Страница выборки
   *
   * @default 1
   */
  page?: number;
  /**
   * 	Параметр, который отвечает за доступность и выборку бесед и каналов для пользователя
   *
   *  @default ChatAvailability.IsMember
   */
  availability?: ChatAvailability;
}

export interface PutChatsRequest {
  chat: Simplify<Partial<Pick<Chat, "name" | "public">>>;
}
