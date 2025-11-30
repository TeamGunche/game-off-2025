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
`;

export default function RhythmView({ entity }: { entity: Entity }) {
  const rhythmViewRef = useRefTrait(entity, RhythmViewRef);

  return (
    <group ref={rhythmViewRef}>
      <Html fullscreen>
        <Container>
          <p>Rhythm Battle Active!</p>
        </Container>
      </Html>
    </group>
  );
}
