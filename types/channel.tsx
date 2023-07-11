export class Channel {
  id: number;
  name: string;

  constructor(opts: {id: number, name: string}) {
    this.id = opts.id;
    this.name = opts.name;
  }
}
