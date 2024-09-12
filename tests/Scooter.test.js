const Scooter = require("../src/Scooter");
const User = require("../src/User");

const scooter = new Scooter("station-1");

// typeof scooter === object
describe("scooter object", () => {
  test("Scooter class should create Scooter instance", () => {
    expect(scooter).toBeInstanceOf(Scooter);
  });
});

// Method tests
describe("scooter methods", () => {
  // tests here!

  // rent method
  const Scooter = require("./Scooter"); // Assuming the Scooter class is in Scooter.js
  const User = require("./User"); // Assuming there's a User class

  describe("Scooter rent() method tests", () => {
    test("should rent the scooter if charge is above 20% and not broken", () => {
      const user = new User("Joe Bloggs", "password123", 21); // Create a test user
      const scooter = new Scooter("Station A", 50, false); // A scooter with 50% charge and not broken

      scooter.rent(user); // Attempt to rent the scooter

      // Assertions
      expect(scooter.station).toBe(null); // Scooter should be removed from station
      expect(scooter.user).toBe(user); // Scooter should be checked out to the user
    });

    test("should throw an error if scooter is broken", () => {
      const user = new User("Joe Bloggs", "password123", 21);
      const scooter = new Scooter("Station A", 50, true); // A broken scooter with 50% charge

      // Assertions
      expect(() => scooter.rent(user)).toThrow("Scooter needs repair");
      expect(scooter.station).toBe("Station A"); // Scooter should still be at the station
      expect(scooter.user).toBe(null); // No user should be assigned
    });

    test("should throw an error if scooter needs to charge", () => {
      const user = new User("Joe Bloggs", "password123", 21);
      const scooter = new Scooter("Station A", 10, false); // A scooter with only 10% charge, but not broken

      // Assertions
      expect(() => scooter.rent(user)).toThrow("Scooter needs to charge");
      expect(scooter.station).toBe("Station A"); // Scooter should still be at the station
      expect(scooter.user).toBe(null); // No user should be assigned
    });
  });

  // dock method
  describe("dock (station) method Test", () => {
    const scooter = new Scooter(null, 10, false);
    test("Return the scooter to the station. Be sure to clear out the user", () => {
      scooter.dock("station A");
      // we cleared the user
      expect(scooter.user).toBe(null);
      //we update the station
      expect(scooter.station).toBe("station A");
    });
  });

  // requestRepair method
  describe("requestRepair() method", () => {
    const scooter = new Scooter("station A", 10, true);

    test("setInterval timer to schedule a repair in 5 seconds.", () => {
      jest.advanceTimersByTime(5000);
      scooter.requestRepair();
      expect(console.log).toHaveBeenCalledWith("repair completed");
    });
  });

  // charge method
  describe(" recharge scooter  to 100%.", () => {
    const scooter = new Scooter("station A", 10, false);
    test("Set a timer to incrementally update the Scooter's charge to 100.", () => {
      scooter.recharge();

      jest.advanceTimersByTime(1000);
      expect(scooter.charge).toBe(20);

      jest.advanceTimersByTime(6000);
      expect(scooter.charge).toBe(80);

      jest.advanceTimersByTime(5000);
      expect(scooter.charge).toBe(100);
    });
  });
});
