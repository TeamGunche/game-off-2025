import Wad from "web-audio-daw";

interface Note {
  pos: number
  pitches: number[]
  len: number
}

export const playMelody = (instrument: string, data: Note[], bpm: number) => {
  const instrumentUrls: { [key: string]: string } = {
    piano: "https://tonejs.github.io/audio/salamander/C4.mp3",
    guitar: "https://tonejs.github.io/audio/salamander/C4.mp3",
    harp: "https://tonejs.github.io/audio/salamander/C4.mp3",
  };

  const source = instrumentUrls[instrument] || instrumentUrls["piano"];
  const stepTime = 60 / bpm / 4;

  console.log("Melody scheduled...");

  data.forEach((note) => {
    setTimeout(() => {
      note.pitches.forEach((ratio) => {
        const voice = new Wad({ source: source });

        const detune = 1200 * Math.log2(ratio);

        voice.play({
          detune: detune,

          env: {
            attack: 0.05,
            decay: 0.1,
            sustain: 0.9,
            hold: note.len * stepTime,
            release: 0.2,
          },
        } as never);
      });
    }, (note.pos * stepTime) * 1000);
  });
};
