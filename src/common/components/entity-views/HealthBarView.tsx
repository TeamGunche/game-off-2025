import { useRefTrait } from "@/common/hooks/ecs/useRefTrait";
import { HealthBarViewRef } from "@/common/traits/HealthBarViewRef";
import { HealthPoint } from "@/common/traits/HealthPoint";
import { Html } from "@react-three/drei";
import type { Entity } from "koota";
import { useTrait } from "koota/react";
import styled from "styled-components";

const StyledHealthBarContainer = styled.div`
  width: 6vw;
  height: 2vh;
  background: white;
`;

const StyledHealthBar = styled("div")<{ $healthPoint: number }>`
  background: green;
  width: ${({ $healthPoint }) => `${$healthPoint}%`};
  height: 100%;
`;

export default function HealthBarView({ entity}: { entity: Entity }) {
  const healthBarViewRef = useRefTrait(entity, HealthBarViewRef);
  const healthPoint = useTrait(entity, HealthPoint);

  if (!healthPoint) return <></>;

  return (
    <group ref={healthBarViewRef}>
      <Html center>
        <StyledHealthBarContainer>
          <StyledHealthBar $healthPoint={healthPoint.health > 0 ? healthPoint.health : 0} />
        </StyledHealthBarContainer>
      </Html>
    </group>
  );
}
