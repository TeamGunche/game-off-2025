import { useState, useEffect, useMemo } from "react";
import { type KeyboardControlsEntry } from "@react-three/drei";
import { keyboardControlMap, type KeyboardControlType } from "@/common/defs/keyboardControlMap.ts";
import constate from "constate";
import { Snare } from "@/common/sound-engines/snare.ts";
import { Kick } from "@/common/sound-engines/kick.ts";
import { HiHat } from "@/common/sound-engines/hat.ts";
import { Bottle } from "@/common/sound-engines/bottle.ts";
import { Click } from "@/common/sound-engines/click.ts";

type GameState = "main" | "play" | "setting";
type KeymapEntry = KeyboardControlsEntry<KeyboardControlType>;
export type DisplayMode = string;
export type InstrumentType = "snare" | "kick" | "hihat" | "bottle" | "click";

function useAppStore() {
  const [gameState, setGameState] = useState<GameState>("main");
  const [activeKeymap, setActiveKeymap] = useState<KeymapEntry[]>(keyboardControlMap);
  const [displayMode, setDisplayMode] = useState<DisplayMode>("1200x640");
  const [previousGameState, setPreviousGameState] = useState<GameState>("main");
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(1.0);

  const pauseGame = () => setIsPaused(true);
  const resumeGame = () => setIsPaused(false);

  useEffect(() => {
    async function loadKeymap() {
      if (!window.api) {
        return;
      }
      try {
        const result = await window.api.readUserData("keymap.json");
        if (result.data) {
          const savedMap = JSON.parse(result.data) as KeymapEntry[];
          if (Array.isArray(savedMap) && savedMap.length === keyboardControlMap.length) {
            setActiveKeymap(savedMap);
          }
        }
      }
      catch {
        console.log("No custom keymap found, using defaults.");
      }
    }
    loadKeymap();
  }, []);

  const handleKeymapChange = (newMap: KeymapEntry[]) => {
    setActiveKeymap(newMap);
    window.api?.writeUserData("keymap.json", JSON.stringify(newMap))
      .catch(err => console.error("Failed to save keymap:", err));
  };

  const startGame = () => setGameState("play");
  const showSettings = () => {
    if (gameState === "main" || gameState === "play") {
      setPreviousGameState(gameState);
    }
    setGameState("setting");
  };
  const goBackFromSettings = () => {
    setGameState(previousGameState);

    if (previousGameState === "play") {
      setIsPaused(true);
    }
  };
  const showMenu = () => setGameState("main");

  const audioCtx = useMemo(() => new AudioContext(), []);

  const snare = useMemo(() => new Snare(audioCtx), [audioCtx]);
  const kick = useMemo(() => new Kick(audioCtx), [audioCtx]);
  const hihat = useMemo(() => new HiHat(audioCtx), [audioCtx]);
  const bottle = useMemo(() => new Bottle(audioCtx), [audioCtx]);
  const click = useMemo(() => new Click(audioCtx), [audioCtx]);

  const playSound = (instrument: InstrumentType) => {
    switch (instrument) {
      case "snare":
        snare.setVolume(volume);
        snare.trigger(audioCtx.currentTime);
        break;
      case "kick":
        kick.setVolume(volume);
        kick.trigger(audioCtx.currentTime);
        break;
      case "hihat":
        hihat.setVolume(volume);
        hihat.trigger(audioCtx.currentTime);
        break;
      case "bottle":
        bottle.setVolume(volume);
        bottle.trigger(audioCtx.currentTime);
        break;
      case "click":
        click.setVolume(volume);
        click.trigger(audioCtx.currentTime);
        break;
      default:
        console.warn(`Unknown instrument: ${instrument}`);
    }
  };

  return {
    gameState,
    activeKeymap,
    startGame,
    showSettings,
    goBackFromSettings,
    showMenu,
    handleKeymapChange,
    displayMode,
    setDisplayMode,
    isPaused,
    pauseGame,
    resumeGame,
    previousGameState,
    volume, setVolume,
    playSound,
  };
}

export const [AppProvider, useApp] = constate(useAppStore);
