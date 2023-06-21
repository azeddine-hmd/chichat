export class Channel {
  id: number;
  name: string;

  constructor(opt: {id: number, name: string}) {
    this.id = opt.id;
    this.name = opt.name;
  }
}
