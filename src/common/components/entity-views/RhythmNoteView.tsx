import type { Entity } from "koota";
import styled, { css } from "styled-components";
import { RhythmNote } from "@/common/traits/RhythmNote.ts";
import { useRefTrait } from "@/common/hooks/ecs/useRefTrait.ts";
import { RhythmNoteViewRef } from "@/common/traits/RhythmNoteViewRef.ts";
import { memo } from "react";

const NoteWrapper = styled.div<{ $lane: number, $position: number }>`
  ${({ $lane, $position }) => css`
    position: absolute;
    bottom: ${$position * 100}%;
    left: calc(50% + ${($lane - 2) * 10}%);
    width: 10%;
    height: 32px;
    background: rgba(0, 150, 255, 0.6);
    z-index: 100;
  `}
`;

export default memo(function RhythmNoteView({ entity }: { entity: Entity }) {
  const note = entity.get(RhythmNote);
  if (!note) return null;

  return (
    <NoteWrapper ref={useRefTrait(entity, RhythmNoteViewRef)} $lane={note.lane} $position={note.position} />
  );
});
