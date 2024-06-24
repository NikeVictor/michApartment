import APIException from "./exception";

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export default class AlreadyExists extends APIException {
    constructor(error = "") {
      super(409, error || "This data already exists", error);
    }
  }