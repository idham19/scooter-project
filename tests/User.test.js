const User = require("../src/User");

const user = new User("Joe Bloggs", "test123", 21);
const correctPassword = "test123";
const wrondPassword = "12315646";

// User tests here
describe("User property tests", () => {
  test("User class should create user instance", () => {
    expect(user).toBeInstanceOf(User);
  });
  // test username
  test("username should be a string", () => {
    expect(typeof user.userName).toBe("string");
  });
  // test password
  test("password should be valid", () => {
    expect(user.password).toBe("test123");
  });
  // test age
  test("age should be a Number", () => {
    expect(typeof user.age).toBe("number");
  });
});

// test login
describe("Login Test", () => {
  it("provided password should match the password", () => {
    user.login(correctPassword);
    expect(user.loggedin).toBe(true);
  });
  test("if password doesn't match the existing password error should be thrown", () => {
    expect(() => user.login(wrondPassword)).toThrowError("incorrect password");
  });
});
// test logout
describe("Logout Test", () => {
  test("the user should be logged Out ", () => {
    //first we need to loggedin  in order to loggedout
    user.login(correctPassword);
    expect(user.loggedin).toBe(true);
    //now whe we use logout function the user should be loggedout
    user.logout();
    expect(user.loggedin).toBe(false);
  });
});
