/** Применяется для уплощения вывода типов, чтобы улучшить подсказки типов, отображаемые в редакторах. А также для преобразования интерфейса в тип, чтобы облегчить назначаемость. */
// eslint-disable-next-line @typescript-eslint/ban-types
export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};
