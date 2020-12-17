class Part {
    constructor(part) {
      this.name = part.name;
      this.type = part.type;
      this.validType = ['landing gear', 'shell', 'hyperdrive', 'computer', 'life support', undefined]
      this.type = this.validType.includes(part.type) ? part.type : undefined;
      this.value = part.value;
      this.broken = false;
    };
    
    isValid() {
      return this.name === undefined || this.type === undefined || this.value === undefined ? false : true;
    };

};


module.exports = Part;
