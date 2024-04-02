export default class User {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.city = user.city;
    this.state = user.state;
    this.country = user.country;
    this.phone = user.phone;
  }
}
