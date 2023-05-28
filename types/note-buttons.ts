import Color from "./color";

export interface INoteButton {
  id: number;
  color: keyof typeof Color;
}
