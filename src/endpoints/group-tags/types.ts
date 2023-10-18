export interface GetGroupTagsRequest {
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
}

export interface GroupTag {
  /** Идентификатор тега */
  id: number;
  /** Название тега */
  name: string;
  /**	Количество сотрудников, которые имеют этот тег */
  users_count: number;
}
