/**
 * @typedef {import('./mediator').AirTransport} IAirTransport;
 * @typedef {import('./mediator').Mediator} IMediator;
 */

/**@implements {IMediator} */
class Runway {
  constructor() {
    /**@type {Set<AirTransport>} */
    this.airTransports = new Set();
  }

  /**@type {(src: AirTransport, message: string) => void} */
  communicate(src, message) {
    for (const transport of this.airTransports) {
      if (transport !== src) transport.receive(src, message);
    }
  }

  /**@type {(src: AirTransport, dest: AirTransport, message: string) => void} */
  message(src, dest, message) {
    for (const transport of this.airTransports) {
      if (transport === dest) transport.receive(src, message);
    }
  }

  /**@type {(transport: AirTransport) => Runway}*/
  join(transport) {
    const joinMsg = transport.pilotsName + ' joined the Runway';
    transport.runway = this;
    this.airTransports.add(transport);
    this.communicate(transport, joinMsg);
    return this;
  }
}

/**@implements {IAirTransport} */
class AirTransport {
  /**
   * @param {string} pilotsName
   */
  constructor(pilotsName) {
    this.pilotsName = pilotsName;
    this.type = this.constructor.name;
    this.runway = null;
    this.runwayLog = [];
  }

  /**@type {(sender: AirTransport, message: string) => void} */
  receive(sender, message) {
    const logMsg = `Transport: ${sender.pilotsName}, ${sender.type}, ${message}`;
    this.runwayLog.push(logMsg);
    console.log(
      `[${sender.pilotsName}'s runway log] ${sender.pilotsName}, ${logMsg}`,
    );
  }

  /**@type {(message: string) => void} */
  say(message) {
    this.runway.communicate(this, message);
  }

  /**@type {(dest: AirTransport, message: string) => void} */
  privateMessage(dest, message) {
    if (this !== dest) this.runway.message(this, dest, message);
  }
}

class Helicoper extends AirTransport {}

class Airplane extends AirTransport {}

class UFO extends AirTransport {}

// Usage

const runway = new Runway();

const helicopter = new Helicoper('Helicopter');
const plane = new Airplane('Bob');
const ufo = new UFO('Alien');

runway.join(helicopter).join(plane).join(ufo);
helicopter.say('Try to land on Runway');
plane.say('Understood');

helicopter.privateMessage(plane, 'There is a UFO in the Runway');
plane.privateMessage(helicopter, 'You are right, there is a UFO!');

ufo.say('HUMANS');
