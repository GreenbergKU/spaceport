var Being = require('../src/being');
var Part = require('../src/part');

class Ship {
  constructor(ship) {
    this.name = ship.name;
    this.validTypes = ["military", "cargo", "passenger"];
    this.type = this.validTypes.includes(ship.type) ? ship.type : undefined;
    this.maxCrew = ship.maxCrew;
    this.odometer = ship.odometer || 0;
    this.fuelCapacity = ship.fuelCapacity || 10;
    this.fuel = ship.fuel || 0;
    this.captain = ship.captain;
    this.crew = [];
    this.cargo = [];
    this.parts = ship.parts || {}; 
  };    

  loadCargo(cargoItems) {
    if (cargoItems instanceof Part) {
      this.cargo.push(cargoItems);
    };
  };
  
  addCrew(posse) {
    for(var i = 0; i < posse.length; i++) {
      if((this.crew.length < this.maxCrew) && (posse[i] instanceof Being)) {
        this.crew.push(posse[i]);
      };
    };
  }; 
  
  updatePart(part) {
    if (part.validType.includes(part.type) && part.isValid()) {
      var existingPart = this.parts[part.type];
      var existingValue = existingPart ? existingPart.value : 0;
      var diff = existingValue - part.value;
      this.parts[part.type] = part;
      return diff;
    };
  };
  
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
    };
    status.readyToFly = hasCaptain && hasFuel && hasParts;
    return status;
  };
  
};


module.exports = Ship;