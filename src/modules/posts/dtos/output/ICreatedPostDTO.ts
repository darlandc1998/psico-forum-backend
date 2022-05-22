export default interface ICreatedPostDTO {
  id: number;
  title: string;
  text: string;
  cover: string | null;
  published: boolean;
  authorId: number;
}
