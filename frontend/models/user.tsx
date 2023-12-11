export class User {
  id: number;
  displayName: string;
  username: string;
  avatar: string;
  status: "online" | "offline";

  constructor(opts: {
    id: number;
    displayName: string;
    username: string;
    avatar: string;
    status: "online" | "offline";
  }) {
    this.id = opts.id;
    this.displayName = opts.displayName;
    this.username = opts.username;
    this.avatar = opts.avatar;
    this.status = opts.status;
  }
}
