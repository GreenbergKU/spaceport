class Planet {
    constructor(planet) {
        this.name = planet.name;
        this.shop = planet.shop;
        this.currentShip = planet.currentShip;
        this.coordinates = planet.coordinates;
    };

    landShip(ship) {
        this.currentShip = ship;
    };
    
    departShip() {
        this.currentShip = null;
    };
 
    calculateDistance(otherPlanet) {
        // AB= √ ( (x2−x1)^2 + (y2−y1)^2 + (z2−z1)^2 )
        return Math.sqrt(
            Math.pow(otherPlanet.coordinates.x - this.coordinates.x, 2) + 
            Math.pow(otherPlanet.coordinates.y - this.coordinates.y, 2) + 
            Math.pow(otherPlanet.coordinates.z - this.coordinates.z, 2)
        );
    };

    refuel(ship) {
        ship.fuel = ship.fuelCapacity;
    };

    giveClearance(otherPlanet) {
        var status = this.currentShip.checkReadiness();
        var fuelRequired = this.calculateDistance(otherPlanet);
        var sufficientFuel = this.currentShip.fuel >= Math.ceil(fuelRequired);
        var clearanceMessage;
        !status.readyToFly || !sufficientFuel ? clearanceMessage = !status.readyToFly ? `Clearance denied: ${status.notes}`
            : `Clearance denied: Need at least ${Math.ceil(fuelRequired)} units of fuel to reach ${otherPlanet.name}` 
        : (
            this.currentShip.fuel -= Math.ceil(fuelRequired),
            otherPlanet.landShip(this.currentShip),
            this.departShip(),
            clearanceMessage = `Clearance granted: Enjoy your trip to ${otherPlanet.name}`
        );
        return clearanceMessage;
    }; 

};


module.exports = Planet;
