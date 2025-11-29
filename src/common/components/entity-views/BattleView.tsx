import type { Entity } from "koota";
import { Html } from "@react-three/drei";
import { useRefTrait } from "@/common/hooks/ecs/useRefTrait";
import { BattleViewRef } from "@/common/traits/BattleViewRef";
import styled from "styled-components";
import { useTrait, useWorld } from "koota/react";
import { useCallback } from "react";
import { HealthSystem } from "@/common/systems/health";
import { BattleTurn } from "@/common/traits/BattleTurn";
import { BattleSystem } from "@/common/systems/battle";

const StyledRootContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  width: 100%;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
  padding: 5% 0;
  gap: 5%;
  justify-content: center;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  display: flex;
  width: 15%;
  font-size: 2vw;
  align-items: center;
  justify-content: center;
`;

export default function BattleView({ entity }: { entity: Entity }) {
  const battleViewRef = useRefTrait(entity, BattleViewRef);
  const world = useWorld();
  const battleTurn = useTrait(entity, BattleTurn);

  const handleRunaway = useCallback(() => {
    BattleSystem.from(world).end();
  }, [world]);

  const handleAttack = useCallback(() => {
    BattleSystem.from(world).attack();
  }, [world]);

  if (!battleTurn) return <></>;

  return (
    <group ref={battleViewRef}>
      <Html fullscreen>
        {battleTurn.turn === "idle" && (
          <StyledRootContainer>
            <StyledButtonContainer>
              <StyledButton onClick={handleAttack}>Attack</StyledButton>
              <StyledButton onClick={handleRunaway}>Runaway</StyledButton>
            </StyledButtonContainer>
          </StyledRootContainer>
        )}
      </Html>
    </group>
  );
}
