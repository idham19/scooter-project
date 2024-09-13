const User = require("./User");

class Scooter {
  // scooter code here
  static nextSerial = 1;
  constructor(station, user, charge, isBroken) {
    this.station = station;
    this.user = user;
    this.charge = charge;
    this.isBroken = isBroken;
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial++;
  }

  rent(user) {
    if (!(user instanceof User)) {
      throw new Error("User argument must be a User object");
    }
    if (this.charge > 20 && this.isBroken == false) {
      this.station = null;
      this.user = user;
    } else if (this.charge < 20 || this.isBroken == true) {
      this.station = this.station;
      this.user = null;
      throw new Error("scooter needs to charge or scooter needs repair");
    }
  }
  dock(station) {
    this.station = station;
    this.user = null;
  }
  async requestRepair() {
    const  interval =setInterval(()=>{
      this.isBroken=false;
      console.log("repair completed");
      clearInterval(interval); // Clear the interval after the repair is complete

    },5000) 
  }
 
//   async recharge() {
//     console.log('Starting charge');
//      while(this.charge<100){
//        await new Promise(resolve => setTimeout(resolve, 1000)); // wait 3 seconds
//        this.charge +=10
//        console.log(`Current charge: ${this.charge}%`);

//       }   

//     console.log('Charge complete');   
// }
recharge() {
  const interval = setInterval(() => {
    if (this.charge < 100) {
      this.charge += 10;
    } else {
      this.charge = 100; // Ensure it doesn't exceed 100
      clearInterval(interval);
    }
    console.log(`Charge: ${this.charge}%`); // Log the charge percentage for debugging
  }, 1000); // Increment every second
}
}

module.exports = Scooter;
