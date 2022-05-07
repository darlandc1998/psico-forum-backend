import { Post as PostPrisma } from "@prisma/client";

class Post implements PostPrisma {
  id: number;
  title: string;
  text: string;
  cover: string | null;
  published: boolean;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  author_id: number;

  constructor(
    id: number,
    title: string,
    text: string,
    cover: string | null,
    published: boolean,
    active: boolean,
    created_at: Date,
    updated_at: Date,
    author_id: number,
  ) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.cover = cover;
    this.published = published;
    this.active = active;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.author_id = author_id;
  }
}

export default Post;
