var Ship = require('../src/ship');
var Being = require('../src/being');
var Part = require('../src/part');
var Shop = require('../src/shop');
class Planet {
    constructor ({name, shop, coordinates}) {
        this.name = name;
        this.shop = shop;
        this.currentShip = null;
        this.coordinates = coordinates;

    };
    landShip(ship) {
        this.currentShip = ship;
    }; 
    var here = initCoords;
    var there = newCoords;
    
    calculateDistance(hereToThere) {
        return Math.sqrt(
            Math.pow(there.coordinates.x - here.coordinates.x)**2 + Math.pow(there.coordinates.y - here.coordinates.y)**2 + Math.pow(there.coordinates.z - here.coordinates.z)**2
        );
    };
}

module.exports = Planet;