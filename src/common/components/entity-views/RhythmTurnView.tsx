import type { Entity } from "koota";
import styled, { css } from "styled-components";
import { useTraitEffect } from "koota/react";
import { RhythmInput } from "@/common/traits/RhythmInput.ts";
import { useState } from "react";

const Container = styled.div`
  position: absolute;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1px;
  border-radius: 8px;
  overflow: hidden;

  z-index: 100;
`;

const Lane = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  width: 10%;
  height: 100%;

  background-color: rgb(0 0 0 / 0.5);
  border-radius: 8px;
`;

const HitArea = styled.div<{ $active: boolean }>`
  width: 100%;
  height: 10%;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.5);

  ${({ $active }) => $active && css`
    background-color: rgba(255, 255, 255, 1);
  `}
`;

export default function RhythmTurnView({ entity}: { entity: Entity }) {
  const [activeInputs, setActiveInputs] = useState([false, false, false, false]);
  useTraitEffect(entity, RhythmInput, (input) => {
    setActiveInputs((prev) => {
      const newState = [...prev];
      for (let i = 0; i < 4; i++) {
        newState[i] = input![i];
      }
      return newState;
    });
  });

  return (
    <Container>
      {[0, 1, 2, 3].map((num) => {
        const isActive = activeInputs[num];
        return (
          <Lane key={num}>
            <HitArea $active={isActive} />
          </Lane>
        );
      })}
    </Container>
  );
}
