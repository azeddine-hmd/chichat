export class User {
  id: number;
  displayName: string;
  username: string;
  avatar: string;

  constructor(opts: {
    id: number;
    displayName: string;
    username: string;
    avatar: string;
  }) {
    this.id = opts.id;
    this.displayName = opts.displayName;
    this.username = opts.username;
    this.avatar = opts.avatar;
  }
}
