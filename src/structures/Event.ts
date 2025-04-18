export class Event {
  constructor(
    public name: string,
    public once: boolean,
    public execute: (...args: any[]) => any
  ) {}
}
