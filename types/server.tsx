import React from "react";

export class Server {
  id: number;
  name: string;
  icon: React.ReactNode;
  
  constructor(opts: {id: number, name: string, icon: React.ReactNode}) {
    this.id = opts.id;
    this.name = opts.name;
    this.icon = opts.icon;
  }
}
