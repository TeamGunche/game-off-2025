const MELODY_PATTERNS = [
  {
    id: "1",
    events: [
      { pos: 0, pitches: [1.0], len: 4 },
      { pos: 4, pitches: [1.1225], len: 4 },
      { pos: 8, pitches: [1.2599], len: 4 },
      { pos: 12, pitches: [1.3348], len: 4 },
    ],
    chart: [
      { beat: 0.0, lane: 0, type: "short", len: 1.0 },
      { beat: 1.0, lane: 1, type: "short", len: 1.0 },
      { beat: 2.0, lane: 2, type: "short", len: 1.0 },
      { beat: 3.0, lane: 3, type: "short", len: 1.0 },
    ],
  },
  {
    id: "2",
    events: [
      { pos: 0, pitches: [2.0], len: 4 },
      { pos: 4, pitches: [1.4983], len: 4 },
      { pos: 8, pitches: [1.2599], len: 4 },
      { pos: 12, pitches: [1.0], len: 4 },
    ],
    chart: [
      { beat: 0.0, lane: 3, type: "short", len: 1.0 },
      { beat: 1.0, lane: 2, type: "short", len: 1.0 },
      { beat: 2.0, lane: 1, type: "short", len: 1.0 },
      { beat: 3.0, lane: 0, type: "short", len: 1.0 },
    ],
  },
  {
    id: "3",
    events: [
      { pos: 0, pitches: [1.0], len: 4 },
      { pos: 4, pitches: [1.2599], len: 4 },
      { pos: 8, pitches: [1.1225], len: 4 },
      { pos: 12, pitches: [1.3348], len: 4 },
    ],
    chart: [
      { beat: 0.0, lane: 0, type: "short", len: 1.0 },
      { beat: 1.0, lane: 2, type: "short", len: 1.0 },
      { beat: 2.0, lane: 1, type: "short", len: 1.0 },
      { beat: 3.0, lane: 3, type: "short", len: 1.0 },
    ],
  },
  {
    id: "4",
    events: [
      { pos: 0, pitches: [1.0], len: 4 },
      { pos: 4, pitches: [1.4983], len: 4 },
      { pos: 8, pitches: [1.2599], len: 4 },
      { pos: 12, pitches: [2.0], len: 4 },
    ],
    chart: [
      { beat: 0.0, lane: 0, type: "short", len: 1.0 },
      { beat: 1.0, lane: 3, type: "short", len: 1.0 },
      { beat: 2.0, lane: 1, type: "short", len: 1.0 },
      { beat: 3.0, lane: 2, type: "short", len: 1.0 },
    ],
  },
  {
    id: "5",
    events: [
      { pos: 0, pitches: [1.0], len: 2 },
      { pos: 2, pitches: [1.0], len: 2 },
      { pos: 8, pitches: [1.4983], len: 2 },
      { pos: 10, pitches: [1.4983], len: 2 },
    ],
    chart: [
      { beat: 0.0, lane: 1, type: "short", len: 0.5 },
      { beat: 0.5, lane: 1, type: "short", len: 0.5 },
      { beat: 2.0, lane: 2, type: "short", len: 0.5 },
      { beat: 2.5, lane: 2, type: "short", len: 0.5 },
    ],
  },
  {
    id: "6",
    events: [
      { pos: 0, pitches: [1.0], len: 2 },
      { pos: 2, pitches: [1.0], len: 2 },
      { pos: 8, pitches: [1.2599], len: 2 },
      { pos: 10, pitches: [1.2599], len: 2 },
    ],
    chart: [
      { beat: 0.0, lane: 1, type: "short", len: 0.5 },
      { beat: 0.5, lane: 2, type: "short", len: 0.5 },
      { beat: 2.0, lane: 1, type: "short", len: 0.5 },
      { beat: 2.5, lane: 2, type: "short", len: 0.5 },
    ],
  },
  {
    id: "7",
    events: [
      { pos: 0, pitches: [1.0], len: 3 },
      { pos: 3, pitches: [1.2599], len: 3 },
      { pos: 6, pitches: [1.4983], len: 2 },
      { pos: 8, pitches: [2.0], len: 4 },
    ],
    chart: [
      { beat: 0.0, lane: 0, type: "short", len: 0.75 },
      { beat: 0.75, lane: 1, type: "short", len: 0.75 },
      { beat: 1.5, lane: 2, type: "short", len: 0.5 },
      { beat: 2.0, lane: 3, type: "short", len: 1.0 },
    ],
  },
  {
    id: "8",
    events: [
      { pos: 0, pitches: [1.0], len: 1 },
      { pos: 1, pitches: [1.1225], len: 1 },
      { pos: 2, pitches: [1.2599], len: 1 },
      { pos: 3, pitches: [1.3348], len: 1 },
      { pos: 4, pitches: [1.4983], len: 4 },
    ],
    chart: [
      { beat: 0.0, lane: 1, type: "short", len: 0.25 },
      { beat: 0.25, lane: 2, type: "short", len: 0.25 },
      { beat: 0.5, lane: 1, type: "short", len: 0.25 },
      { beat: 0.75, lane: 2, type: "short", len: 0.25 },
      { beat: 1.0, lane: 3, type: "short", len: 1.0 },
    ],
  },
  {
    id: "9",
    events: [
      { pos: 0, pitches: [1.0], len: 2 },
      { pos: 2, pitches: [1.1225], len: 2 },
      { pos: 4, pitches: [1.2599], len: 2 },
      { pos: 6, pitches: [1.3348], len: 2 },
      { pos: 8, pitches: [1.4983], len: 8 },
    ],
    chart: [
      { beat: 0.0, lane: 0, type: "short", len: 0.5 },
      { beat: 0.5, lane: 1, type: "short", len: 0.5 },
      { beat: 1.0, lane: 2, type: "short", len: 0.5 },
      { beat: 1.5, lane: 3, type: "short", len: 0.5 },
      { beat: 2.0, lane: 3, type: "long", len: 2.0 },
    ],
  },
  {
    id: "10",
    events: [
      { pos: 0, pitches: [1.0], len: 2 },
      { pos: 2, pitches: [1.1225], len: 2 },
      { pos: 4, pitches: [1.0], len: 2 },
      { pos: 6, pitches: [1.1225], len: 2 },
      { pos: 8, pitches: [1.2599], len: 8 },
    ],
    chart: [
      { beat: 0.0, lane: 1, type: "short", len: 0.5 },
      { beat: 0.5, lane: 2, type: "short", len: 0.5 },
      { beat: 1.0, lane: 1, type: "short", len: 0.5 },
      { beat: 1.5, lane: 2, type: "short", len: 0.5 },
      { beat: 2.0, lane: 3, type: "long", len: 2.0 },
    ],
  },
  {
    id: "11",
    events: [
      { pos: 0, pitches: [1.0, 1.2599, 1.4983], len: 4 },
      { pos: 8, pitches: [1.0, 1.2599, 1.4983], len: 4 },
    ],
    chart: [
      { beat: 0.0, lane: 0, type: "short", len: 1.0 },
      { beat: 0.0, lane: 1, type: "short", len: 1.0 },
      { beat: 0.0, lane: 2, type: "short", len: 1.0 },

      { beat: 2.0, lane: 1, type: "short", len: 1.0 },
      { beat: 2.0, lane: 2, type: "short", len: 1.0 },
      { beat: 2.0, lane: 3, type: "short", len: 1.0 },
    ],
  },
  {
    id: "12",
    events: [
      { pos: 0, pitches: [1.0, 1.2599], len: 4 },
      { pos: 4, pitches: [1.1225, 1.3348], len: 4 },
      { pos: 8, pitches: [1.2599, 1.4983], len: 4 },
      { pos: 12, pitches: [1.3348, 1.6818], len: 4 },
    ],
    chart: [
      { beat: 0.0, lane: 0, type: "short", len: 1.0 }, { beat: 0.0, lane: 2, type: "short", len: 1.0 },
      { beat: 1.0, lane: 1, type: "short", len: 1.0 }, { beat: 1.0, lane: 3, type: "short", len: 1.0 },
      { beat: 2.0, lane: 0, type: "short", len: 1.0 }, { beat: 2.0, lane: 2, type: "short", len: 1.0 },
      { beat: 3.0, lane: 1, type: "short", len: 1.0 }, { beat: 3.0, lane: 3, type: "short", len: 1.0 },
    ],
  },
  {
    id: "13",
    events: [
      { pos: 0, pitches: [1.0, 1.4983], len: 8 },
      { pos: 8, pitches: [1.1225, 1.6818], len: 8 },
    ],
    chart: [
      { beat: 0.0, lane: 0, type: "long", len: 2.0 }, { beat: 0.0, lane: 3, type: "long", len: 2.0 },
      { beat: 2.0, lane: 1, type: "long", len: 2.0 }, { beat: 2.0, lane: 2, type: "long", len: 2.0 },
    ],
  },
  {
    id: "14",
    events: [
      { pos: 0, pitches: [0.5], len: 4 },
      { pos: 4, pitches: [1.2599, 1.4983], len: 4 },
      { pos: 8, pitches: [0.7492], len: 4 },
      { pos: 12, pitches: [1.2599, 1.4983], len: 4 },
    ],
    chart: [
      { beat: 0.0, lane: 0, type: "short", len: 1.0 },
      { beat: 1.0, lane: 2, type: "short", len: 1.0 }, { beat: 1.0, lane: 3, type: "short", len: 1.0 },
      { beat: 2.0, lane: 0, type: "short", len: 1.0 },
      { beat: 3.0, lane: 2, type: "short", len: 1.0 }, { beat: 3.0, lane: 3, type: "short", len: 1.0 },
    ],
  },
  {
    id: "15",
    events: [
      { pos: 0, pitches: [1.0], len: 2 },
      { pos: 2, pitches: [1.2599], len: 2 },
      { pos: 4, pitches: [1.4983], len: 2 },
      { pos: 6, pitches: [2.0], len: 2 },
      { pos: 8, pitches: [1.0, 1.2599, 1.4983, 2.0], len: 8 },
    ],
    chart: [
      { beat: 0.0, lane: 0, type: "short", len: 0.5 },
      { beat: 0.5, lane: 1, type: "short", len: 0.5 },
      { beat: 1.0, lane: 2, type: "short", len: 0.5 },
      { beat: 1.5, lane: 3, type: "short", len: 0.5 },
      { beat: 2.0, lane: 0, type: "long", len: 2.0 },
      { beat: 2.0, lane: 1, type: "long", len: 2.0 },
      { beat: 2.0, lane: 2, type: "long", len: 2.0 },
      { beat: 2.0, lane: 3, type: "long", len: 2.0 },
    ],
  },
  {
    id: "16",
    events: [
      { pos: 0, pitches: [1.0], len: 16 },
    ],
    chart: [
      { beat: 0.0, lane: 1, type: "long", len: 4.0 },
    ],
  },
  {
    id: "17",
    events: [
      { pos: 0, pitches: [1.0], len: 8 },
      { pos: 8, pitches: [1.4983], len: 8 },
    ],
    chart: [
      { beat: 0.0, lane: 1, type: "long", len: 2.0 },
      { beat: 2.0, lane: 2, type: "long", len: 2.0 },
    ],
  },
  {
    id: "18",
    events: [
      { pos: 0, pitches: [1.0], len: 4 },
      { pos: 4, pitches: [1.2599], len: 12 },
    ],
    chart: [
      { beat: 0.0, lane: 0, type: "short", len: 1.0 },
      { beat: 1.0, lane: 2, type: "long", len: 3.0 },
    ],
  },
  {
    id: "19",
    events: [
      { pos: 0, pitches: [1.0], len: 4 },
    ],
    chart: [
      { beat: 0.0, lane: 1, type: "short", len: 1.0 },
    ],
  },
  {
    id: "20",
    events: [
      { pos: 0, pitches: [1.4983], len: 2 },
      { pos: 2, pitches: [1.6818], len: 2 },
      { pos: 4, pitches: [1.8877], len: 2 },
      { pos: 6, pitches: [2.0], len: 10 },
    ],
    chart: [
      { beat: 0.0, lane: 1, type: "short", len: 0.5 },
      { beat: 0.5, lane: 2, type: "short", len: 0.5 },
      { beat: 1.0, lane: 3, type: "short", len: 0.5 },
      { beat: 1.5, lane: 1, type: "long", len: 2.5 },
      { beat: 1.5, lane: 2, type: "long", len: 2.5 },
    ],
  },
];

const BACKING_PATTERNS = [
  {
    id: "drum_slow_1",
    type: "drum",
    style: "slow",
    events: [
      { pos: 0, pitches: [1.0], len: 4, ins: "kick" },
      { pos: 8, pitches: [1.0], len: 4, ins: "snare" },
    ],
  },
  {
    id: "drum_slow_2",
    type: "drum",
    style: "slow",
    events: [
      { pos: 0, pitches: [1.0], len: 2, ins: "kick" },
      { pos: 2, pitches: [1.0], len: 2, ins: "kick" },
      { pos: 8, pitches: [1.0], len: 4, ins: "snare" },
    ],
  },
  {
    id: "bass_slow_1",
    type: "bass",
    style: "slow",
    events: [
      { pos: 0, pitches: [0.25], len: 8, ins: "bass" },
      { pos: 8, pitches: [0.3746], len: 8, ins: "bass" },
    ],
  },
  {
    id: "bass_slow_2",
    type: "bass",
    style: "slow",
    events: [
      { pos: 0, pitches: [0.25], len: 4, ins: "base" },
      { pos: 6, pitches: [0.25], len: 2, ins: "base" },
      { pos: 8, pitches: [0.3348], len: 4, ins: "base" },
      { pos: 14, pitches: [0.3746], len: 2, ins: "base" },
    ],
  },
  {
    id: "pad_slow_1",
    type: "pad",
    style: "slow",
    events: [
      { pos: 0, pitches: [1.0, 1.2599, 1.4983], len: 16, ins: "pad" },
    ],
  },
  {
    id: "drum_mid_1",
    type: "drum",
    style: "normal",
    events: [
      { pos: 0, pitches: [1.0], len: 2 },
      { pos: 4, pitches: [1.0], len: 2 },
      { pos: 8, pitches: [1.0], len: 2 },
      { pos: 12, pitches: [1.0], len: 2 },
    ],
  },
  {
    id: "drum_mid_2",
    type: "drum",
    style: "normal",
    events: [
      { pos: 0, pitches: [1.0], len: 2 },
      { pos: 4, pitches: [1.0], len: 2 },
      { pos: 6, pitches: [1.0], len: 2 },
      { pos: 8, pitches: [1.0], len: 2 },
      { pos: 12, pitches: [1.0], len: 2 },
    ],
  },
  {
    id: "bass_mid_1",
    type: "bass",
    style: "normal",
    events: [
      { pos: 0, pitches: [0.25], len: 2 },
      { pos: 2, pitches: [0.5], len: 2 },
      { pos: 4, pitches: [0.25], len: 2 },
      { pos: 6, pitches: [0.5], len: 2 },
      { pos: 8, pitches: [0.3348], len: 2 },
      { pos: 10, pitches: [0.6674], len: 2 },
      { pos: 12, pitches: [0.3746], len: 2 },
      { pos: 14, pitches: [0.7492], len: 2 },
    ],
  },
  {
    id: "bass_mid_2",
    type: "bass",
    style: "normal",
    events: [
      { pos: 0, pitches: [0.25], len: 2 }, { pos: 2, pitches: [0.25], len: 2 },
      { pos: 4, pitches: [0.25], len: 2 }, { pos: 6, pitches: [0.25], len: 2 },
      { pos: 8, pitches: [0.25], len: 2 }, { pos: 10, pitches: [0.25], len: 2 },
      { pos: 12, pitches: [0.25], len: 2 }, { pos: 14, pitches: [0.25], len: 2 },
    ],
  },
  {
    id: "chord_mid_1",
    type: "pad",
    style: "normal",
    events: [
      { pos: 4, pitches: [1.0, 1.2599, 1.4983], len: 2 },
      { pos: 12, pitches: [1.0, 1.2599, 1.4983], len: 2 },
    ],
  },
  {
    id: "drum_fast_1",
    type: "drum",
    style: "fast",
    events: [
      { pos: 0, pitches: [1.0], len: 2 },
      { pos: 4, pitches: [1.0], len: 2 },
      { pos: 8, pitches: [1.0], len: 2 },
      { pos: 12, pitches: [1.0], len: 2 },
    ],
  },
  {
    id: "drum_fast_2",
    type: "drum",
    style: "fast",
    events: [
      { pos: 0, pitches: [1.0], len: 2 },
      { pos: 4, pitches: [1.0], len: 2 },
      { pos: 7, pitches: [1.0], len: 1 },
      { pos: 12, pitches: [1.0], len: 2 },
    ],
  },
  {
    id: "bass_fast_1",
    type: "bass",
    style: "fast",
    events: [
      { pos: 0, pitches: [0.25], len: 2 }, { pos: 2, pitches: [0.25], len: 2 },
      { pos: 4, pitches: [0.25], len: 2 }, { pos: 6, pitches: [0.25], len: 2 },
      { pos: 8, pitches: [0.25], len: 2 }, { pos: 10, pitches: [0.25], len: 2 },
      { pos: 12, pitches: [0.25], len: 2 }, { pos: 14, pitches: [0.25], len: 2 },
    ],
  },
  {
    id: "bass_fast_2",
    type: "bass",
    style: "fast",
    events: [
      { pos: 0, pitches: [0.25], len: 2 },
      { pos: 2, pitches: [0.3348], len: 2 },
      { pos: 4, pitches: [0.3746], len: 2 },
      { pos: 6, pitches: [0.5], len: 2 },
      { pos: 8, pitches: [0.3746], len: 2 },
      { pos: 10, pitches: [0.3348], len: 2 },
      { pos: 12, pitches: [0.25], len: 2 },
      { pos: 14, pitches: [0.1873], len: 2 },
    ],
  },
  {
    id: "syn_fast_1",
    type: "pad",
    style: "fast",
    events: [
      { pos: 0, pitches: [1.0], len: 2 },
      { pos: 2, pitches: [1.2599], len: 2 },
      { pos: 4, pitches: [1.4983], len: 2 },
      { pos: 6, pitches: [2.0], len: 2 },
      { pos: 8, pitches: [1.4983], len: 2 },
      { pos: 10, pitches: [1.2599], len: 2 },
      { pos: 12, pitches: [1.0], len: 2 },
      { pos: 14, pitches: [0.7492], len: 2 },
    ],
  },
];

export { MELODY_PATTERNS, BACKING_PATTERNS };
