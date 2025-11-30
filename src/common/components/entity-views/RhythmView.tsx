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
  border-radius: 8px;
  overflow: hidden;
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

const HitArea = styled.div`
  width: 100%;
  height: 64px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.2);
`;

export default function RhythmView({ entity }: { entity: Entity }) {
  const rhythmViewRef = useRefTrait(entity, RhythmViewRef);

  return (
    <group ref={rhythmViewRef}>
      <Html fullscreen>
        <Container>
          <Lane>
            <HitArea />
          </Lane>
          <Lane>
            <HitArea />
          </Lane>
          <Lane>
            <HitArea />
          </Lane>
          <Lane>
            <HitArea />
          </Lane>
        </Container>
      </Html>
    </group>
  );
}
