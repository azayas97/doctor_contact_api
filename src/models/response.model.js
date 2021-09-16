export class Response {
  constructor(success = false, code = 0, message = '', data = {}) {
    this.success = success;
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
