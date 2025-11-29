export type NoteType = "short" | "long";
export type Position = 1 | 2 | 3 | 4;

export interface Note {
  type: NoteType
  position: Position
  time: number
}

export interface ShortNote extends Note {
  type: "short"
}

export interface LongNote extends Note {
  type: "long"
  endTime: number
}
