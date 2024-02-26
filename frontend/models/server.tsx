import React from "react";

export class Server {
  id: number;
  name: string;
  icon: React.ReactNode;
  
  constructor({ id, name, icon }: { id: number, name: string, icon: React.ReactNode }) {
    this.id = id;
    this.name = name;
    this.icon = icon;
  }
}
