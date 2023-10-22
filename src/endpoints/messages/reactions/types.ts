/** Реакция */
export interface Reaction {
  /**	Идентификатор пользователя, который добавил реакцию */
  user_id: number;
  /** Дата и время добавления реакции (ISO-8601, UTC+0) в формате `YYYY-MM-DDThh:mm:ss.sssZ` */
  created_at: string;
  /**
   * Emoji символ реакции
   *
   * @example "👍"
   */
  code: string;
}

export type PostReactionsRequest = Pick<Reaction, "code">;

export interface DeleteReactionsRequest extends PostReactionsRequest {}

export interface GetReactionsRequest {
  /**
   * Количество возвращаемых сущностей за один запрос (максимум 50)
   *
   * @default 50
   * */
  per?: number;
  /**
   * Страница выборки
   *
   * @default 1
   */
  page?: number;
}
