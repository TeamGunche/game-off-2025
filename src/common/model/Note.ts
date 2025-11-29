export type NoteType = "short" | "long";
export type NotePosition = 1 | 2 | 3 | 4;

export interface Note {
  type: NoteType
  position: NotePosition
  // Time in milliseconds
  time: number
}

export interface ShortNote extends Note {
  type: "short"
}

export interface LongNote extends Note {
  type: "long"
  // End time in milliseconds
  endTime: number
}
