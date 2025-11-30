import { useRefTrait } from "@/common/hooks/ecs/useRefTrait";
import { RhythmViewRef } from "@/common/traits/RhythmViewRef";
import { Html } from "@react-three/drei";
import type { Entity } from "koota";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1px;
`;

const Lane = styled.div`
  display: flex;

  width: 10%;
  height: 100%;

  background-color: rgb(0 0 0 / 0.5);
`;

export default function RhythmView({ entity }: { entity: Entity }) {
  const rhythmViewRef = useRefTrait(entity, RhythmViewRef);

  return (
    <group ref={rhythmViewRef}>
      <Html fullscreen>
        <Container>
          <Lane />
          <Lane />
          <Lane />
          <Lane />
        </Container>
      </Html>
    </group>
  );
}
