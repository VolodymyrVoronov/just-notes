export enum ButtonColor {
  orange = "orange",
  yellow = "yellow",
  purple = "purple",
  blue = "blue",
  lime = "lime",
}

export interface INoteButton {
  id: number;
  color: keyof typeof ButtonColor;
}
