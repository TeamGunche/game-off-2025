import type { Note } from "@/common/model/Note.ts";

export interface MusicSheet {
  title: string
  notes: Note[]
}

export const hipHopBoy: MusicSheet = {
  title: "",
  notes: [
    { type: "short", position: 2, time: 0 },
    { type: "short", position: 4, time: 500 },
    { type: "short", position: 2, time: 1000 },
    { type: "short", position: 3, time: 1500 },
    { type: "short", position: 2, time: 2000 },
    { type: "short", position: 4, time: 2500 },
    { type: "short", position: 2, time: 3000 },
    { type: "short", position: 1, time: 3500 },
    { type: "short", position: 2, time: 4000 },
    { type: "short", position: 4, time: 4500 },
    { type: "short", position: 2, time: 5000 },
    { type: "short", position: 3, time: 5500 },
    { type: "short", position: 2, time: 6000 },
    { type: "short", position: 1, time: 6500 },
    { type: "short", position: 2, time: 7000 },
    { type: "short", position: 4, time: 7500 },
  ],
};
