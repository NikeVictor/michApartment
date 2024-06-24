export default class APIException extends Error {
  statusCode?: number;
  message: string;
  error: string;

  constructor(statusCode: number, message: string, error = "") {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}
