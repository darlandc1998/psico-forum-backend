export default interface IGetPostDTO {
  id: number;
  title: string;
  text: string;
  cover?: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  author?: {
    id: number | undefined;
    name: string | undefined;
  };
}
