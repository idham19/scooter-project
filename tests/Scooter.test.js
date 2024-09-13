const Scooter = require("../src/Scooter");
const User = require("../src/User");

const scooter = new Scooter("station-1");

// typeof scooter === object
describe("scooter object", () => {
  test("Scooter class should create Scooter instance", () => {
    expect(scooter).toBeInstanceOf(Scooter);
  });
});



//-------------------------------------------------
//-------------------------------------------------
// Method tests
describe("scooter methods", () => {
  // tests here!

  // rent method
  describe("Scooter rent() method tests", () => {
    test("should rent the scooter if charge is above 20% and not broken", () => {
      const user = new User("Joe Bloggs", "password123", 21); // Create a test user
      const scooter = new Scooter("Station A", user, 50, false); // A scooter with 50% charge and not broken

      scooter.rent(user); // Attempt to rent the scooter

      // Assertions
      expect(scooter.station).toBe(null); // Scooter should be removed from station
      expect(scooter.user).toBe(user); // Scooter should be checked out to the user
    });

    test("should throw an error if scooter is broken", () => {
      const user = new User("Joe Bloggs", "password123", 21);
      const scooter = new Scooter("Station A", user, 50, true); // A broken scooter with 50% charge

      // Assertions
      expect(() => scooter.rent(user)).toThrow(
        "scooter needs to charge or scooter needs repair"
      );
      expect(scooter.station).toBe("Station A"); // Scooter should still be at the station
      expect(scooter.user).toBe(null); // No user should be assigned
    });

    test("should throw an error if scooter needs to charge", () => {
      const user = new User("Joe Bloggs", "password123", 21);
      const scooter = new Scooter("Station A", user, 10, false); // A scooter with only 10% charge, but not broken

      // Assertions
      expect(() => scooter.rent(user)).toThrow(
        "scooter needs to charge or scooter needs repair"
      );
      expect(scooter.station).toBe("Station A"); // Scooter should still be at the station
      expect(scooter.user).toBe(null); // No user should be assigned
    });
  });
  //-------------------------------------------------
  //-------------------------------------------------
  
  // dock method
  describe("dock (station) method Test", () => {
    const user = new User("Tom", "password123", 21);
    const scooter = new Scooter(null, user, 10, false);
    test("Return the scooter to the station. Be sure to clear out the user", () => {
      scooter.dock("station A");
      // we cleared the user
      expect(scooter.user).toBe(null);
      //we update the station
      expect(scooter.station).toBe("station A");
    });
  });

  //-------------------------------------------------
  //-------------------------------------------------
  //requestRepair Method
  describe("requestRepair() method", () => {
    const user = new User("Juba", "password123", 21);
    const scooter = new Scooter("station A", user, 10, true);
    test("setInterval timer to schedule a repair in 5 seconds.", async () => {
      const logSpy = jest.spyOn(console, "log");
      scooter.requestRepair();
      await new Promise((resolve) => setTimeout(resolve, 5000));
      expect(scooter.isBroken).toBe(false);
      expect(logSpy).toHaveBeenCalledWith("repair completed");
    },10000);
  });
  //-------------------------------------------------

  // charge method// first way to do it
  
  // describe(" recharge scooter  to 100%.", () => {
    //      test("Set a timer to incrementally update the Scooter's charge to 100.",async()=>{
      //       const user = new User("Juba", "password123", 21);
      //       const scooter = new Scooter("Station A", user, 30, false)
      //       await scooter.recharge(); // we need to wait for the charge!
      //       await new Promise(resolve => setTimeout(resolve, 3000));
      //       expect(scooter.charge).toBe(100)
      //      },20000)

      //-------------------------------------------------
      //-------------------------------------------------
      // charge method// first way to do it
  describe(" recharge scooter  to 100%.", () => {
    test("Set a timer to incrementally update the Scooter's charge to 100%", async () => {
      const user = new User("Juba", "password123", 21);
      const scooter = new Scooter("Station A", user, 30, false); // Start with 30% charge

      jest.useFakeTimers(); // Use fake timers to control time

      // Call the recharge method
      scooter.recharge();

      // Simulate 1 second passing
      jest.advanceTimersByTime(1000);
      expect(scooter.charge).toBe(40); // Check if the charge is incremented

      // Simulate another 5 seconds passing
      jest.advanceTimersByTime(5000);
      expect(scooter.charge).toBe(90); // Check if the charge is incremented

      // Simulate additional time to ensure full charge
      jest.advanceTimersByTime(1000);
      expect(scooter.charge).toBe(100); // Check if the charge has reached 100%

      //even when wait more time the charge max should not exceed the 100%
      jest.advanceTimersByTime(2000);
      expect(scooter.charge).toBe(100);
      jest.useRealTimers(); // Restore real timers
    }, 10000);
  });
});
