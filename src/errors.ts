export class PachcaError extends Error {
  public response?: Response;

  constructor(message: string, response?: Response) {
    super(message);
    this.response = response;
  }
}

export interface ClientError {
  key?: string;
  value?: string;
  code?: string;
  payload?: Record<string, unknown>;
  message?: string;
}

export class PachcaClientError extends PachcaError {
  public errors: ClientError[];

  constructor(message: string, response: Response, errors: ClientError[]) {
    super(message, response);
    this.errors = errors;
  }
}
