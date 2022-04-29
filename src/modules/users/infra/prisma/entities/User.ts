import { User as UserPrisma } from "@prisma/client";

class User implements UserPrisma {
  id: number;
  name: string;
  email: string;
  password: string | null;
  active: boolean;
  created_at: Date;
  updated_at: Date;

  constructor({
    id,
    name,
    email,
    password,
    active,
    created_at,
    updated_at,
  }: UserPrisma) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.active = active;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export default User;
