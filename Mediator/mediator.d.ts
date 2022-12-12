export interface AirTransport {
  pilotsName: string;
  type: string;
  runway: Mediator;
  runwayLog: string[];
}

export interface Mediator {
  communicate(src: AirTransport, message: string): void;
  message(src: AirTransport, dest: AirTransport, message: string): void;
}
