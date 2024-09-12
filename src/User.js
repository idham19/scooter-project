class User {
  // User code here
  constructor(userName, password, age) {
    this.userName = userName;
    this.password = password;
    this.age = age;
    this.loggedin = false;
  }
  login(password) {
    if (password === this.password) {
      this.loggedin = true;
    } else throw new Error("incorrect password");
  }
  logout() {
    if (this.loggedin === true) {
      this.loggedin = false;
    }
  }
}

module.exports = User;
