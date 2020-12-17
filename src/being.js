class Being {
    constructor (name, species, credits) {
        this.isAlive = true;
        this.name = name;
        this.species = species;
        this.credits = credits || 0;
    };

    updateCredits(newCredits) {
        this.credits = this.credits + newCredits;
    };

}


module.exports = Being;
