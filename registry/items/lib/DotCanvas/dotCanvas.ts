export const DOT_CANVAS_PITCH = {
  12: "bg-size-[12px_12px]",
  20: "bg-size-[20px_20px]",
  24: "bg-size-[24px_24px]",
} as const;
export type DotCanvasSize = keyof typeof DOT_CANVAS_PITCH;
export const DOT_CANVAS_SIZES = [12, 20, 24] as const satisfies readonly DotCanvasSize[];
