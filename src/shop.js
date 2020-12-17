var Part = require('../src/part');

class Shop {
    constructor(shop) {
        this.name = shop.name;
        this.inventory = shop.inventory || {};
        this.item = shop.item;
        this.value = shop.value;
        this.broken = false;
        this.validParts = [
            "shell",
            "hyperdrive",
            "computer",
            "life support",
            "landing gear"
        ]
    }

    addInventory(item) { 
        if(item instanceof Part) {
            this.inventory[item.type] = item;
        }
    }

    outfitShip(ship, part) {
        var hasCaptain = ship.captain;
        var needPart = this.inventory[part].type === part;
        var captainCredits = hasCaptain ? ship.captain.credits : 0;
        var needCredits = captainCredits < this.inventory[part].value;  
        var diffCredits = (this.inventory[part].value) - captainCredits;        
        if (!hasCaptain) {
           return "cannot outfit a ship without a captian";
        } else if (needPart && needCredits) {
            return `you require ${diffCredits} more credits to make this purchase`;
        } else { 
            ship.parts[part] = this.inventory[part];
            ship.captain.credits = captainCredits - this.inventory[part].value
            delete this.inventory[part];
            return `${part} added to ship`;
        }        
    }

}    


module.exports = Shop;