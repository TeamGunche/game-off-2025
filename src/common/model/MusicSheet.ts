import type { Note } from "@/common/model/Note.ts";

export interface MusicSheet {
  title: string
  notes: Note[]
}

export const hipHopBoy: MusicSheet = {
  title: "",
  notes: [
    { type: "short", position: 2, time: 0 },
    { type: "short", position: 4, time: 0.5 },
    { type: "short", position: 2, time: 1 },
    { type: "short", position: 3, time: 1.5 },
    { type: "short", position: 2, time: 2 },
    { type: "short", position: 4, time: 2.5 },
    { type: "short", position: 2, time: 3 },
    { type: "short", position: 3, time: 3.5 },
    { type: "short", position: 1, time: 4 },
    { type: "short", position: 4, time: 4.5 },
    { type: "short", position: 1, time: 5 },
    { type: "short", position: 3, time: 5.5 },
  ],
};
