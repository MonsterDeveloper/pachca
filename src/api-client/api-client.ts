import { version } from "package.json";
import { handleError } from "./handle-error";

/**
 * Опции создания API клиента
 */
export interface ApiClientOptions {
  /**
   * Базовый URL API
   * @default https://api.pachca.com/api/shared/v1
   */
  baseUrl?: string;

  /**
   * Токен доступа
   * @see https://crm.pachca.com/dev/getting-started/requests-and-responses/
   */
  accessToken: string;

  /**
   * Заголовок User-Agent в запросах
   * @default pachca/${version} (+https://github.com/MonsterDeveloper/pachca)
   */
  userAgent?: string;

  /** ID пользователя/бота, которому принадлежит токен */
  userId?: number;
}

/** Опции запроса. Поддерживаются все стандартные параметры для fetch, а также query параметры и тело запроса — JSON или FormData */
type RequestOptions = Omit<RequestInit, "body"> & {
  body?: object | FormData;
  searchParameters?: URLSearchParams;
};
type RequestOptionsWithoutMethod = Omit<RequestOptions, "method">;

/**
 * Клиент для работы с API
 */
export class ApiClient {
  private baseUrl: string;
  private userAgent: string;
  private accessToken: string;
  private userId?: number;

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl ?? "https://api.pachca.com/api/shared/v1";
    this.userAgent =
      options.userAgent ??
      `pachca/${version} (+https://github.com/MonsterDeveloper/pachca)`;
    this.accessToken = options.accessToken;
    this.userId = options.userId;
  }

  /**
   * Выполняет запрос к API
   * @param endpoint Путь к методу API (абсолютный или относительный)
   * @param options Опции запроса
   */
  async request(
    endpoint: string,
    { searchParameters, ...options }: RequestOptions = {},
  ) {
    const url = endpoint.startsWith("http")
      ? endpoint
      : this.baseUrl + endpoint;

    const headers: Record<string, string> = {
      "User-Agent": this.userAgent,
    };

    if (!(options?.body instanceof FormData)) {
      headers["Content-Type"] = "application/json; charset=utf-8";
      headers["Authorization"] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(
      url + (searchParameters ? `?${searchParameters}` : ""),
      {
        ...options,
        body:
          options?.body instanceof FormData
            ? options.body
            : options?.body
            ? JSON.stringify(options.body)
            : undefined,
        headers: {
          ...headers,
          ...options.headers,
        },
      },
    );

    if (!response.ok) await handleError(response);

    return response;
  }

  /** Выполняет GET запрос */
  async get(url: string, options: RequestOptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: "GET" });
  }

  /** Выполняет POST запрос */
  async post(url: string, options: RequestOptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: "POST" });
  }

  /** Выполняет PUT запрос */
  async put(url: string, options: RequestOptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: "PUT" });
  }

  async delete(url: string, options: RequestOptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: "DELETE" });
  }
}
