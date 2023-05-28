import Color from "./color";

interface INote {
  id: number;
  note: string;
  color: keyof typeof Color;
  favorite: boolean;
  updatedAt: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
  userId: number;
}

export default INote;
