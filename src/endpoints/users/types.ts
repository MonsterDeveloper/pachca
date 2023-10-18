import type { Simplify } from "@/types";
import type { CustomProperty } from "../custom-properties";

export enum UserRole {
  /** Администратор */
  Admin = "admin",
  /** Сотдруник */
  User = "user",
  /** Мульти-гость */
  MultiGuest = "multi_guest",
}

export enum UserInviteStatus {
  /** Принято */
  Confirmed = "confirmed",
  /** Отправлено */
  Sent = "sent",
}

/** Сотдруник */
export interface User {
  /** ID */
  id: number;
  /** Имя */
  first_name: string;
  /** Фамилия */
  last_name?: string;
  /** Ник */
  nickname?: string;
  /** Email */
  email: string;
  /** Телефон */
  phone_number?: string;
  /** Подразделение */
  department?: string;
  /** Уровень доступа */
  role?: UserRole;
  /** Приостановка доступа */
  suspended?: boolean;
  /** Статус пришлашения */
  invite_status?: UserInviteStatus;
  /** Список тегов */
  list_tags?: string[];
  /** Дополнительные поля */
  custom_properties?: (CustomProperty & { value: string })[];
  /** Тип: пользователь (false) или бот (true) */
  bot?: boolean;
}

export interface PostUsersRequest {
  /** Данные сотрудника */
  user: Simplify<
    Omit<User, "id" | "bot" | "custom_properties" | "invite_status"> & {
      custom_properties?: (Pick<CustomProperty, "id"> & { value: string })[];
    }
  >;
  /** Пропуск этапа отправки приглашения сотруднику (при значении true сотруднику не будет отправлено письмо на электронную почту с приглашением создать аккаунт). Данный параметр полезен в случае предварительного создания аккаунтов сотрудникам перед их входом через SSO. */
  skip_email_notify?: boolean;
}

export interface PutUserRequest {
  /** Данные сотрудника */
  user: Simplify<
    Partial<
      Omit<User, "id" | "bot" | "custom_properties" | "invite_status"> & {
        custom_properties?: (Pick<CustomProperty, "id"> & {
          value: string;
        })[];
      }
    >
  >;
}

export interface GetUsersRequest {
  /**
   * 	Количество возвращаемых сущностей за один запрос (максимум 50)
   *
   * @default 50
   */
  per?: number;
  /**
   * Страница выборки
   *
   * @default 1
   */
  page?: number;

  /** Поисковая фраза для фильтрации результатов (поиск идет по полям first_name (имя), last_name (фамилия), email (электронная почта), phone_number (телефон) и nickname (никнейм)) */
  query?: string;
}
