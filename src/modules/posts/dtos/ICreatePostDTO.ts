export default interface ICreatePostDTO {
  id?: number;
  title: string;
  text: string;
  cover: string | null;
  authorId: number;
}
