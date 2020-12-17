var assert = require('chai').assert;
var Ship = require('../src/ship');
var Being = require('../src/being');
var Part = require('../src/part');

describe('Ship', function() {
  it('should have a name', function() {
    var shuttle = new Ship({name: 'Wanderer'});

    assert.equal(shuttle.name, 'Wanderer');
  })

  it('can have a different name', function() {
    var shuttle = new Ship({name: 'Atlantis'});

    assert.equal(shuttle.name, 'Atlantis');
  })

  it('can be given a type', function() {
    var shuttle = new Ship({name: 'Atlantis', type: 'passenger'});

    assert.equal(shuttle.type, 'passenger');
  })

  it('can be given a different type', function() {
    var shuttle = new Ship({name: 'Atlantis', type: 'cargo'});

    assert.equal(shuttle.type, 'cargo');
  })

  it('may not have an invalid designation', function() {
    var fighter = new Ship({name: 'Atlantis', type: 'military'});
    var invalid1 = new Ship({name: 'Toy', type: 'wooden'});
    var invalid2 = new Ship({name: 'Toy2', type: 'tin'});
    var invalid3 = new Ship({name: 'Toy3', type: 'plastic'});

    assert.equal(fighter.type, 'military');
    assert.equal(invalid1.type, undefined);
    assert.equal(invalid2.type, undefined);
    assert.equal(invalid3.type, undefined);
  })

  it('has a max number of crew members', function() {
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
      }
    );

    assert.equal(fighter.maxCrew, 2);
  })

  it('has an odemeter reading of zero by default', function() {
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
      }
    );

    assert.equal(fighter.odometer, 0);
  })

  it('can be initialized with a odometer reading', function() {
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
      }
    );

    assert.equal(fighter.odometer, 3340);
  })

  it('has a fuel capacity of 10 by default', function() {
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
      }
    );

    assert.equal(fighter.fuelCapacity, 10);
  })

  it('can be initialized with a different fuel capacity', function() {
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
        fuelCapacity: 2000,
      }
    );

    assert.equal(fighter.fuelCapacity, 2000);
  })

  it('has no fuel by defualt', function() {
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
      }
    );

    assert.equal(fighter.fuel, 0);
  })

  it('has a captain', function() {
    var captain = new Being('Will', 'human');
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        captain: captain,
        maxCrew: 2,
        odometer: 3340,
      }
    );

    assert.equal(fighter.captain.name, 'Will');
    assert.instanceOf(fighter.captain, Being);
  })

  it('has no crew by default', function() {
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
      }
    );

    assert.deepEqual(fighter.crew, []);
  })

  it('can add multiple crew members', function() {
    var crewmember = new Being('Zot', 'krill');
    var droid = new Being('R2-D2', 'droid');
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
      }
    );
    var crew = [crewmember, droid];

    fighter.addCrew(crew);

    assert.equal(fighter.crew.length, 2);
    assert.deepEqual(fighter.crew, crew);
  })

  it('can add crew members to the existing crew', function() {
    var initalMember = new Being('Ed', 'human');
    var crewmember = new Being('Zot', 'krill');
    var droid = new Being('R2-D2', 'droid');
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 3,
        odometer: 3340,
      }
    );
    fighter.crew = [initalMember];
    var crew = [crewmember, droid];
    var expectedCrew = [initalMember, crewmember, droid];

    fighter.addCrew(crew);

    assert.deepEqual(fighter.crew, expectedCrew);
  })

  it('can only add crew up to the maxCrew size', function() {
    var initalMember = new Being('Ed', 'human');
    var crewmember = new Being('Zot', 'krill');
    var droid = new Being('R2-D2', 'droid');
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
      }
    );
    fighter.crew = [initalMember];
    var crew = [crewmember, droid];
    var expectedCrew = [initalMember, crewmember];

    fighter.addCrew(crew);

    assert.deepEqual(fighter.crew, expectedCrew);
  })

  it('can not add something other than a being into the crew', function() {
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
      }
    );
    var randomJunk = ['egg', 3432, false, [], {}];

    fighter.addCrew(randomJunk);

    assert.deepEqual(fighter.crew, []);
  })

  it('has no cargo by default', function() {
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
      }
    );

    assert.deepEqual(fighter.cargo, []);
  })

  it('can load cargo', function() {
    var partCargo = new Part({name: 'Dell', type: 'computer', value: 100});
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
      }
    );

    fighter.loadCargo(partCargo);

    assert.deepEqual(fighter.cargo, [partCargo]);
  })

  it('can only load Part cargo', function() {
    var partCargo = new Part({name: 'Dell', type: 'computer', value: 100});
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
      }
    );

    fighter.loadCargo(partCargo);
    fighter.loadCargo(1);
    fighter.loadCargo('spam');

    // HINT: look up the documentation on "instanceof"
    assert.deepEqual(fighter.cargo, [partCargo]);
  })

  it('has an empty parts list by default', function() {
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
      }
    );

    assert.deepEqual(fighter.parts, {});
  })

  it('can be initialized with parts', function() {
    var parts = {
      shell: new Part({ name: 'XC-Wing', type: 'shell', value: 8000 }),
      computer: new Part({ name: 'Starmapper', type: 'computer', value: 300 }),
    };
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
        parts: parts,
      }
    );

    assert.deepEqual(fighter.parts, parts);
  })

  it('can add a new part', function() {
    var parts = {
      shell: new Part({ name: 'XC-Wing', type: 'shell', value: 8000 }),
      computer: new Part({ name: 'Starmapper', type: 'computer', value: 300 }),
    };
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
        parts: parts,
      }
    );
    var hyperdrive = new Part({ name: 'SuperH', type: 'hyperdrive', value: 2000 });

    fighter.updatePart(hyperdrive);

    assert.deepEqual(fighter.parts.hyperdrive, hyperdrive);
  })

  it('can only add valid parts', function() {
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
      }
    );
    var invalidPart = new Part({ name: 'Egg', type: 'food', value: 2 });

    fighter.updatePart(invalidPart);

    assert.deepEqual(fighter.parts, {});
  })

  it('can replace an existing part, returning the diff in value', function() {
    var parts = {
      shell: new Part({ name: 'XC-Wing', type: 'shell', value: 8000 }),
      computer: new Part({ name: 'Starmapper', type: 'computer', value: 300 }),
    };
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
        parts: parts,
      }
    );
    var newComputer = new Part({ name: 'Mac', type: 'computer', value: 1300 });

    var difference = fighter.updatePart(newComputer);

    assert.deepEqual(fighter.parts.computer, newComputer);
    assert.equal(difference, -1000);
  })

  it('can replace another existing part, returning the diff in value', function() {
    var parts = {
      shell: new Part({ name: 'XC-Wing', type: 'shell', value: 8000 }),
      computer: new Part({ name: 'Starmapper', type: 'computer', value: 300 }),
    };
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
        parts: parts,
      }
    );
    var newShell = new Part({ name: 'Tiberian', type: 'shell', value: 5500 });

    var difference = fighter.updatePart(newShell);

    assert.deepEqual(fighter.parts.shell, newShell);
    assert.equal(difference, 2500);
  })

  it('cannot fly without a captain', function() {
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        maxCrew: 2,
        odometer: 3340,
      }
    );

    var status = fighter.checkReadiness();

    assert.isFalse(status.readyToFly);
    assert.equal(status.notes, 'Cannot fly without a captain');
  })

  it('cannot fly without fuel', function() {
    var captain = new Being('Will', 'human');
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        captain: captain,
        maxCrew: 2,
        odometer: 3340,
      }
    );

    var status = fighter.checkReadiness();

    assert.isFalse(status.readyToFly);
    assert.equal(status.notes, 'Cannot fly without fuel');
  })

  it('cannot fly without all parts', function() {
    var captain = new Being('Will', 'human');
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        captain: captain,
        maxCrew: 2,
        odometer: 3340,
      }
    );
    fighter.fuel = 1000;
    var status = fighter.checkReadiness();

    assert.isFalse(status.readyToFly);
    assert.equal(status.notes, 'Cannot fly without all parts');
  })

  it('can fly', function() {
    var captain = new Being('Will', 'human');
    var parts = {
      shell: new Part({name: 'S-1', type: 'shell', value: 200}),
      hyperdrive: new Part({name: 'R-100', type: 'hyperdrive', value: 20}),
      computer: new Part({name: '100X', type: 'computer', value: 300}),
      lifeSupport: new Part({name: 'B-98', type: 'lifeSupport', value: 100}),
      landingGear: new Part({name: 'Legs-2', type: 'landingGear', value: 100}),
    }
    var fighter = new Ship(
      {
        name: 'Atlantis',
        type: 'military',
        captain: captain,
        maxCrew: 2,
        odometer: 3340,
        parts: parts,
      }
    )
    fighter.fuel = 1000;
    var status = fighter.checkReadiness();

    assert.isTrue(status.readyToFly);
    assert.equal(status.notes, 'Good to go!');
  })
})
