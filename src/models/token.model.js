class Token {
  constructor(email = '', token = '', expiresIn = 0) {
    this.email = email;
    this.token = token;
    this.expiresIn = expiresIn;
  }
}

module.exports = Token;
