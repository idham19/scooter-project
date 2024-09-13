const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");
const Scooter = require("../src/Scooter");

const scooterApp = new ScooterApp();
// ScooterApp tests here

// register user
describe("registerUser method tests", () => {
  test("Should return instance of User", () => {
    const response = scooterApp.registerUser("Bloggs", "test123", 21);
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
    const user = new User("lounes", "123456789", 28);
    scooterApp.loginUser(user.userName, user.password);
    user.login("123456789");
    const logSpy = jest.spyOn(console, "log");
    expect(logSpy).toHaveBeenCalledWith("is logged out");
    expect(user.loggedin).toBe(true);
  });
  test("user with wrong password should login", () => {
    const user = new User("lounes", "123456789", 28);
    scooterApp.loginUser(user.userName, "12345");
    user.login("12345");
    const logSpy = jest.spyOn(console, "log");
    expect(logSpy).toHaveBeenCalledWith("Username or password is incorrect");
    expect(user.loggedin).toBe(false);
  });

  test("user with wrong password should login", () => {
    const user = new User("lounes", "123456789", 28);
    scooterApp.loginUser("tony", "12345789");
    const logSpy = jest.spyOn(console, "log");
    expect(logSpy).toHaveBeenCalledWith("Username or password is incorrect");
  });
});
// log out
describe("logoutUser(username)", () => {
  const user = new User("lounes", "123456789", 28);

  test("logoutUser(username) user should be loggeout", () => {
    user.logout
    expect(user.loggedin).toBe(false);

  });
});
// rent scooter
describe("rentScooter(scooter, user)", () => {
  test("rentScooter should remove the rented scooter from the station", () => {
    const user = new User("kevin","1234",36)
    const  scooter = new Scooter("station A",user,50,false)
 scooterApp.rentScooter(scooter,user)
 const AllStations= scooterApp.stations
 let currentScooterStation= scooter.station
 expect(AllStations[currentScooterStation].includes(scooter)).toBe(false)

  });
});
// dock scooter
/**Add the scooter to the station’s scooter list, and dock it.
Log scooter is docked to the console.
Throws no such station error if the station does not exist.
Throws scooter already at station error if the scooter is already there. */
describe("dockScooter(scooter, station)", () => {
  const user = new User("Massinissa","1234",86)
  const  scooter = new Scooter("station A",user,50,false)

  test("add the scooter to the stations", () => {
    dockScooter(scooter,scooter.station)
    expect(stations[scooter.station].includes(scooter)).toBe(true)
  });
  test("if the station doesn't exist throw an error",()=>{
    expect(()=>dockScooter(scooter,"royalStation")).toThrowError("no such station")
  })
  
  test("if the scooter is already in the stations should throw an error",()=>{
    const stations={
      "station-A":[scooter]
    }
    expect(()=>dockScooter(scooter,"station-A")).toThrowError("scooter already at station");
    
  })
});
