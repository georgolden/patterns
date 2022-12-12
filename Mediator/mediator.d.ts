export interface AirTransport {
  runway: Mediator;
  receive(sender: AirTransport, message: string): void;
}

export interface Mediator {
  communicate(src: AirTransport, message: string): void;
  message(src: AirTransport, dest: AirTransport, message: string): void;
}
