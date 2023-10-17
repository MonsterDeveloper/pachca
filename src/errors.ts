export class PachcaError extends Error {
  public response?: Response;

  constructor(message: string, response?: Response) {
    super(message);
    this.response = response;
  }
}

export interface ClientError {
  key?: string | null;
  value?: string | null;
  code?: string | null;
  payload?: Record<string, unknown> | null;
  message?: string | null;
}

export class PachcaClientError extends PachcaError {
  public errors: ClientError[];

  constructor(message: string, response: Response, errors: ClientError[]) {
    super(message, response);
    this.errors = errors;
  }
}
