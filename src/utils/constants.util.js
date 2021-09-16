class Constants {
  // HTTP Codes
  static get OKAY() { return 200; }

  static get CREATED() { return 201; }

  static get BAD_REQUEST() { return 400; }

  static get UNAUTHORIZED() { return 401; }

  static get FORBIDDEN() { return 403; }

  static get NOT_FOUND() { return 404; }

  static get INTERNAL() { return 500; }

  static get EXPIRE_TIME() { return 1_800_000; }
}

export default Constants;
