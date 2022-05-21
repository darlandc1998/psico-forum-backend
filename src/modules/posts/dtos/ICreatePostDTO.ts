export default interface ICreatePostDTO {
  id?: number;
  title: string;
  text: string;
  cover: string | null;
  published?: boolean;
  authorId: number;
}
