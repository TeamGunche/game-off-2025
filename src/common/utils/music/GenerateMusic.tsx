import { MELODY_PATTERNS, BACKING_PATTERNS } from "../../defs/MelodyPatterns.ts";

interface ChartEvent {
  beat: number
  lane: number
  type: string
  len: number
}

interface MelodyEvent {
  pos: number
  pitches: number[]
  len: number
}

const createBackingTrack = (bar: number, bpm: number) => {
  const backingEvents: MelodyEvent[] = [];
  let groups: number[][] = [];

  if (bpm < 100) {
    groups = [[0, 1], [2, 3], [4]];
  }
  else if (bpm >= 100 && bpm < 150) {
    groups = [[4, 5], [6, 7], [8, 9]];
  }
  else {
    groups = [[10, 11], [12, 13], [14, 15]];
  }

  const selectedPatterns: typeof BACKING_PATTERNS = [];

  groups.forEach((group) => {
    if (Math.random() > 0.33) {
      const randomIndex = group[Math.floor(Math.random() * group.length)];
      if (BACKING_PATTERNS[randomIndex]) {
        selectedPatterns.push(BACKING_PATTERNS[randomIndex]);
      }
    }
  });

  const POS_PER_BAR = 16;

  for (let i = 0; i < bar; i++) {
    const posOffset = i * POS_PER_BAR;

    selectedPatterns.forEach((pattern) => {
      const shiftedEvents = pattern.events.map(event => ({
        ...event,
        pos: event.pos + posOffset,
      }));
      backingEvents.push(...shiftedEvents);
    });
  }

  return { backingEvents };
};

export const GenerateMusic = (bar: number, bpm: number) => {
  const mergedEvents: MelodyEvent[] = [];
  const mergedChart: ChartEvent[] = [];

  let currentOffset = 0;

  for (let i = 0; i < bar; i++) {
    const randomIndex = Math.floor(Math.random() * MELODY_PATTERNS.length);
    const selectedPattern = MELODY_PATTERNS[randomIndex];

    const shiftedEvents = selectedPattern.events.map(event => ({
      ...event,
      pos: event.pos + currentOffset,
    }));
    mergedEvents.push(...shiftedEvents);

    const shiftedChart = selectedPattern.chart.map(note => ({
      ...note,
      beat: note.beat + currentOffset,
    }));
    mergedChart.push(...shiftedChart);

    currentOffset += 16;
  }

  const { backingEvents } = createBackingTrack(bar, bpm);

  return { mergedEvents, mergedChart, backingEvents };
};
