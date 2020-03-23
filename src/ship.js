var Being = require('../src/being');
var Part = require('../src/part');
class Ship {
  constructor({
    name,
    type,
    maxCrew,
    odometer = 0,
    fuelCapacity = 10,
    fuel = 0,
    captain,
    parts,
  }) {
    this.name = name;
    this.validTypes = ["military", "cargo", "passenger"];
    this.type = this.validTypes.includes(type) ? type : undefined;
    this.maxCrew = maxCrew;
    this.odometer = odometer;
    this.fuelCapacity = fuelCapacity;
    this.fuel = fuel;
    this.captain = captain;
    this.crew = [];
    this.cargo = [];
    this.parts = {}; 
    }    
    
  /*addCrew(member) {
    if (this.crew.legnth >= this.maxCrew) return;
    [...member].forEach(member => {
      if (member instanceof Being) this.crew.push(member);
    });
      // not sure why this worked, time running out, google search, found something similar to this, did a few tweeks, passed! 
    this.crew.splice(this.maxCrew);
  }
  */ 

  loadCargo(cargoItems) {
    if (cargoItems instanceof Part) {
      this.cargo.push(cargoItems);
    }
  }
  
  addCrew(posse) {
    for(var i = 0; i < posse.length; i++) {
      if((this.crew.length < this.maxCrew) && (posse[i] instanceof Being)) {
        this.crew.push(posse[i]);
      }
    }
  } 
  

  
  /*
  updatePart(part) {
    if (part.validTypes.includes(part.type)) {
      var existingPart = this.parts[part.type];
      var existingValue = existingPart ? existingPart.value : 0;
      var diff = existingValue - part.value;
      this.parts[part.type] = part;
      return diff;
    }
  }
  */

  
  checkReadiness() {
    var status = {};
    var hasCaptain = !!this.captain;
    var hasFuel = !!this.fuel;
    var hasParts = !!Object.keys(this.parts).length;
    status.notes = 'Cannot fly';

    if (!hasCaptain) {
      status.notes = `${status.notes} without a captain`;
    } else if (!hasFuel) {
      status.notes = `${status.notes} without fuel`;
    } else if (!hasParts) {
      status.notes = `${status.notes} without all parts`;
    } else {
      status.notes = 'Good to go!';
    }
  
    status.readyToFly = hasCaptain && hasFuel && hasParts;
    return status;
  }
  
}




/*

    isValid() {
      if (this.name === undefined || this.type === undefined || this.value === undefined) {
        return false;
        } //else {
      return true;
      //}
    }
*/
module.exports = Ship;
