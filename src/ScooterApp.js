// require the User and Scooter classes - see where they can be used in ScooterApp.js
const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  //---------------------------------------------------
  //scooters
  //---------------------------------------------------
  scooter1 = new Scooter("Station-A", "user1", 30, false);
  scooter2 = new Scooter("Station-A", "user2", 50, false);
  scooter3 = new Scooter("Station-B", "user3", 65, false);
  scooter4 = new Scooter("Station-B", "user4", 23, false);
  scooter5 = new Scooter("Station-C", "user5", 89, false);
  scooter6 = new Scooter("Station-C", "user6", 41, false);
  scooter7 = new Scooter("Station-D", "user7", 33, false);
  scooter8 = new Scooter("Station-D", "user8", 30, false);

  //---------------------------------------------------
  //Users
  //---------------------------------------------------

  user1 = new User("ab", "1", 55);
  user2 = new User("abc", "12", 45);
  user3 = new User("abd", "123", 32);
  user4 = new User("abde", "1234", 22);
  user5 = new User("abdef", "12345", 83);
  user6 = new User("abdefg", "123456", 88);
  user7 = new User("abdefgh", "1234567", 38);
  user8 = new User("loli", "123456789", 25);
  constructor() {
    //----------------------------------------------------------
    //Stations Object
    //----------------------------------------------------------
    this.stations = {
      "Station-A": [this.scooter1, this.scooter2],
      "Station-B": [this.scooter3, this.scooter4],
      "Station-C": [this.scooter5, this.scooter6],
      "Station-D": [this.scooter7, this.scooter8],
    };

    //----------------------------------------------------------
    // resigtredUsers
    //----------------------------------------------------------
    this.registeredUsers = {
      user1: this.user1,
      user2: this.user2,
      user3: this.user3,
      user4: this.user4,
      user5: this.user5,
      user6: this.user6,
      user7: this.user7,
      user8: this.user8,
    };
  }

  registerUser(username, password, age) {
    if (!this.registeredUsers.hasOwnProperty(username) && age > 18) {
      const newUser = new User(username, password, age);
      this.registeredUsers[username] = newUser;
      console.log("the user has been registered");
      return this.registeredUsers[username];
    } else console.log("already registered or too young to register");
  }

  loginUser(username, password) {
    if (
      !this.registeredUsers.hasOwnProperty(username) ||
      this.registeredUsers[username].password !== password
    ) {
      throw new Error("Username or password is incorrect.");
    }

    this.registeredUsers[username].login(password);
    console.log("The user has been logged in.");
  }

  /**Locate the registered user and call its logout method. Log user is logged out to the console.
If the user cannot be located, throw no such user is logged in erro */
logoutUser(username) {
  // Check if the username is in the registered users
  if (
    !this.registeredUsers.hasOwnProperty(username) ||
    this.registeredUsers[username].loggedin === false
  ) {
    throw new Error("no such user is logged in");
  }

  // Proceed to log out the user
  this.registeredUsers[username].logout();
}

//-----------------------------------------------------------
//-----------------------------------------------------------

  createScooter(stationName) {
    // Check if the station exists
    if (!this.stations.hasOwnProperty(stationName)) {
      throw new Error("No such station exists");
    }
    //by default  the scooter initially will not have user charged to 100 and not
    const newScooter = new Scooter(stationName, null, 100, false);

    // Add the new scooter to the station's list of scooters
    this.stations[stationName].push(newScooter);

    // Set the station property of the scooter
    newScooter.station = stationName;

    // Log that a new scooter is created
    console.log("Created new scooter");

    // Return the new scooter
    return newScooter;
  }

//----------------------------------------------------------------------
//----------------------------------------------------------------------

  dockScooter(scooter, station) {
    if (!this.stations.hasOwnProperty(station)) {
      throw new Error("the station does not exist");
    }
    if (this.stations[station].includes(scooter)) {
      throw new Error("the scooter is already there");
    }
    this.stations[station].push(scooter);
    console.log("scooter is docked");
  }

  //----------------------------------------------------
  //----------------------------------------------------

  rentScooter(scooter, user) {
    // Find the station where the scooter is located
    let foundStation = null;
    // Iterate over the stations object
    for (const stationName in this.stations) {
      if (this.stations[stationName].includes(scooter)) {
        foundStation = stationName;
        break;
      }
    }
    // If no station contains the scooter, it is already rented or doesn't exist
    if (!foundStation) {
      throw new Error("Scooter is already rented or not found at any station");
    }
    // Remove the scooter from the station array
    this.stations[foundStation].splice(
      this.stations[foundStation].indexOf(scooter),
      1
    );
    // Rent the scooter to the user
    scooter.rent(user);
    console.log("Scooter is rented");
  }
  
  //--------------------------------------------------------

  //--------------------------------------------------------
  print() {
    console.log(`These are the registered users: ${JSON.stringify(this.registeredUsers, null, 2)}`);
    console.log(`these are The Stations : ${JSON.stringify(this.stations,null,2)}`);
  }
}

module.exports = ScooterApp;
