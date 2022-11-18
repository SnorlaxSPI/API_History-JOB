
class InternalServerError extends Error {
  statusCode: number;
  name: string;
  constructor(msg: string | undefined) {
    super(msg);
    this.name = 'InternalServerError';
    this.statusCode = 500;
  }

}

export {InternalServerError}