export default interface IUpdatePostDTO {
  id: number;
  title: string;
  text: string;
  cover: string | null;
  published: boolean;
  active: boolean;
}
