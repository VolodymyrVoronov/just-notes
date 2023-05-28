import Color from "./color";

interface INotes {
  id: number;
  note: string;
  color: keyof typeof Color;
  favorites: boolean;
  updatedAt: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
  userId: number;
}

export default INotes;
