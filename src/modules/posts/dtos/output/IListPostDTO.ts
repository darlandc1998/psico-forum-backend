export default interface IListPostDTO {
  id: number;
  title: string;
  cover?: string | null;
  published: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  author?: {
    id: number | undefined;
    name: string | undefined;
  };
}
