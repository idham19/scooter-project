const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");
const Scooter = require("../src/Scooter");

const scooterApp = new ScooterApp();
// ScooterApp tests here

// register user
describe("registerUser method tests", () => {
  test("Should return instance of User", () => {
    const response = scooterApp.registerUser("user9", "test123", 21);
    expect(response).toBeInstanceOf(User);
  });
  test("if the user is under 18 years should throw an error", () => {
    const response1 = scooterApp.registerUser("Joe", "test123", 17);
    expect(() =>
      scooterApp.registerUser(response1).toThrowError("too young to register")
    );
  });
  test("if the user is already registred should throw an error", () => {
    const response = scooterApp.registerUser("Bloggs", "test123", 21);
    expect(() =>
      scooterApp.registerUser(response).toThrowError("already registered")
    );
  });
});

// log in

describe("loginUser(username, password)", () => {
  test("user with right credentials should login", () => {
    scooterApp.registerUser("lounes", "123456789", 28);
    const logSpy = jest.spyOn(console, "log"); // Spy on console.log
    scooterApp.loginUser("lounes", "123456789"); // Attempt login
    expect(logSpy).toHaveBeenCalledWith("The user has been logged in.");
    expect(scooterApp.registeredUsers["lounes"].loggedin).toBe(true); // Check that the user is logged in
  });

  test("user with wrong password shouldn't login", () => {
    const user = new User("lounes", "123456789", 28);
    // Ensure the user is registered in the system
    scooterApp.registeredUsers[user.userName] = user;
    expect(() =>
      scooterApp.loginUser(user.userName, "wrongPassword")
    ).toThrowError("Username or password is incorrect.");
    expect(user.loggedin).toBe(false); // Ensure the user is still logged out
  });
});

// logoutUser
describe("logoutUser(username)", () => {
  const user = new User("lounes", "123456789", 28);

  test("logoutUser(username) user should be loggeout", () => {
    user.logout;
    expect(user.loggedin).toBe(false);
  });
  test("user who is already logged out should throw an error", () => {
    const user = new User("lounes", "123456789", 28);
    user.logout;
    expect(() => scooterApp.logoutUser(user)).toThrowError(
      "no such user is logged in"
    );
  });
  test("if the user don't exist should throw an error", () => {
    expect(() => scooterApp.logoutUser("jds")).toThrowError(
      "no such user is logged in"
    );
  });
});
// rent scooter
describe("rentScooter(scooter, user)", () => {
  test("rentScooter should remove the rented scooter from the station", () => {
    const user = new User("kevin", "1234", 36);
    const scooter2 = new Scooter("Station-A", user, 50, false);
    scooterApp.stations = {
      "Station-A": [scooter2],
    };
    scooterApp.rentScooter(scooter2, user);
    expect(scooterApp.stations["Station-A"].includes(scooter2)).toBe(false);
  });

  test("if the scooter is not found should throw an error", () => {
    const user = new User("kevin", "1234", 36);
    const scooter2 = new Scooter("Station-A", user, 50, false);
    scooterApp.stations = {
      "Station-A": [],
    };
    expect(() => scooterApp.rentScooter(scooter2, user)).toThrowError(
      "Scooter is already rented or not found at any station"
    );
  });
});

describe("dockScooter(scooter, station)", () => {
  const user = new User("Massinissa", "1234", 86);
  const scooter = new Scooter("Station-A", user, 50, false);

  test("add the scooter to the stations", () => {
    scooterApp.dockScooter(scooter, scooter.station);
    expect(scooterApp.stations[scooter.station].includes(scooter)).toBe(true);
  });

  test("if the station doesn't exist throw an error", () => {
    expect(() => scooterApp.dockScooter(scooter, "royalStation")).toThrowError(
      "the station does not exist"
    );
  });

  test("if the scooter is already in the stations should throw an error", () => {
    const scooter1 = new Scooter("Station-A", "user1", 30, false);
    scooterApp.stations = {
      "Station-A": [scooter1],
    };
    expect(() => scooterApp.dockScooter(scooter1, "Station-A")).toThrowError(
      "the scooter is already there"
    );
  });
});

//createScooter() Method test
describe("createScooter", () => {
  test("should create a new scooter and add it to the station's scooter list", () => {
    const stationName = "Station-A";

    // Call the createScooter method
    const newScooter = scooterApp.createScooter(stationName);
    // Assert that the new scooter has been added to the station's list
    expect(scooterApp.stations[stationName]).toContain(newScooter);
    // Assert that the new scooter's station is set correctly
    expect(newScooter.station).toBe(stationName);
    // Assert that the new scooter's default properties are correct
    expect(newScooter.charge).toBe(100);
    expect(newScooter.isBroken).toBe(false);
  });

  test("should throw an error if the station does not exist", () => {
    const invalidStation = "NonExistentStation";

    // Assert that an error is thrown when trying to create a scooter at an invalid station
    expect(() => {
      scooterApp.createScooter(invalidStation);
    }).toThrowError("No such station exists");
  });

  test("should log 'Created new scooter' when a new scooter is created", () => {
    const logSpy = jest.spyOn(console, "log");
    const stationName = "Station-A";

    scooterApp.createScooter(stationName);

    // Assert that the console.log message is called with 'Created new scooter'
    expect(logSpy).toHaveBeenCalledWith("Created new scooter");

    // Clean up the spy
    logSpy.mockRestore();
  });
});
