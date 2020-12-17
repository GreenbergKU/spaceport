class Part {
    constructor(object) {
      this.name = object.name;
      this.type = object.type;
      this.validType = ['landing gear', 'shell', 'hyperdrive', 'computer', 'life support', undefined]
      this.type = this.validType.includes(object.type) ? object.type : undefined;
      this.value = object.value;
      this.broken = false;
    }        
        //* expression evaluates to a boolean with a value of true or false
        //* defaults to true if undefined or null
      //this.type = object.type;
    
    isValid() {
      if (this.name === undefined || this.type === undefined || this.value === undefined) {
        return false;
      }
      return true;
    }

}


module.exports = Part;
