export type NoteType = "short" | "long";
export type NotePosition = 1 | 2 | 3 | 4;

export interface BaseNote {
  type: NoteType
  position: NotePosition
  // Time in milliseconds
  time: number
}

export type Note = ShortNote | LongNote;

export interface ShortNote extends BaseNote {
  type: "short"
}

export interface LongNote extends BaseNote {
  type: "long"
  // End time in milliseconds
  endTime: number
}
