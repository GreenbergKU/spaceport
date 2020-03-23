var Part = require('../src/part');
var Being = require('../src/being');
var Ship = require('../src/ship');

class Shop {
    constructor ({
        name,
        inventory = { },
        item,
        value,
        broken,

    })
        {
        this.name = name;
        this.inventory = inventory;
        this.item = item;
        this.value = value;
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
        var hasCaptain = Ship.captain;
        var needPart = this.inventory[part].type === part;
        var captainCredits = hasCaptain ? Ship.captain.credits : 0;
        var needCredits = captainCredits < this.inventory[part].value;  

        var diffCredits = (this.inventory[part].value) - captainCredits;
        
        
        if (!hasCaptain) {
           return "cannot outfit a ship without a captian";
        } else if (needPart && needCredits) {
            return `you require ${diffCredits} more credits to make this purchase`;
        }  
          else { 
            ship.parts[part] = this.inventory[part];
            delete this.inventory[part];
            return `${part} added to ship`;
        }        
        
            //if (needPart && (captainCredits >= this.inventory[part].value))
        }    


}    

module.exports = Shop;