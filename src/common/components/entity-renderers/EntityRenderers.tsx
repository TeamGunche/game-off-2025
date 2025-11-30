import BattleView from "@/common/components/entity-views/BattleView.tsx";
import CameraView from "@/common/components/entity-views/CameraView.tsx";
import EnemyView from "@/common/components/entity-views/EnemyView.tsx";
import HealthBarView from "@/common/components/entity-views/HealthBarView";
import InteractionHintView from "@/common/components/entity-views/InteractionHintView.tsx";
import { InteractionLineView } from "@/common/components/entity-views/InteractionLineView";
import NPCView from "@/common/components/entity-views/NPCView.tsx";
import PlayerView from "@/common/components/entity-views/PlayerView.tsx";
import RhythmTurnView from "@/common/components/entity-views/RhythmTurnView.tsx";
import { HealthPoint } from "@/common/traits/HealthPoint";
import { InteractLine } from "@/common/traits/InteractLine";
import { IsBattle } from "@/common/traits/IsBattle";
import { IsCamera } from "@/common/traits/IsCamera.ts";
import { IsChat } from "@/common/traits/IsChat.ts";
import { IsEnemy } from "@/common/traits/IsEnemy.ts";
import { IsInteracting } from "@/common/traits/IsInteracting.ts";
import { IsInteractionFocused } from "@/common/traits/IsInteractionFocused";
import { IsNPC } from "@/common/traits/IsNPC.ts";
import { IsPlayer } from "@/common/traits/IsPlayer.ts";
import { RhythmTurn } from "@/common/traits/RhythmTurn.ts";
import { type Entity, Not, type QueryParameter } from "koota";
import { useQuery } from "koota/react";
import { Fragment, memo, type ReactNode } from "react";
import { useUnmount } from "react-use";
import { RhythmNote } from "@/common/traits/RhythmNote.ts";
import RhythmNoteView from "@/common/components/entity-views/RhythmNoteView.tsx";

/** Koota entity renderers */
export default function EntityRenderers() {
  return (
    <>
      <EntityRenderer params={[IsCamera]} view={CameraView} />
      <EntityRenderer params={[IsPlayer]} view={PlayerView} />
      <EntityRenderer params={[IsNPC]} view={NPCView} />
      <EntityRenderer params={[IsEnemy]} view={EnemyView} />
      <EntityRenderer params={[IsInteractionFocused, Not(IsInteracting)]} view={InteractionHintView} />
      <EntityRenderer params={[IsInteracting, IsChat, InteractLine]} view={InteractionLineView} />
      <EntityRenderer params={[IsInteracting, IsBattle, Not(RhythmTurn)]} view={BattleView} />
      <EntityRenderer params={[HealthPoint]} view={HealthBarView} />
    </>
  );
}

export const OverlayEntityRenderers = memo(() => {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      zIndex: 9999999999,
    }}
    >
      <EntityRenderer params={[IsInteracting, IsBattle, RhythmTurn]} view={RhythmTurnView} />
      <EntityRenderer params={[RhythmNote]} view={RhythmNoteView} />
    </div>
  );
});

export const EntityRenderer = <T extends QueryParameter[]>({
  params,
  view: View,
}: {
  params: T
  view: (p: { entity: Entity }) => ReactNode
}) => {
  const entities = useQuery(...params);

  useUnmount(() => {
    entities.forEach(e => e.destroy());
  });

  return (
    <>
      {entities.map((entity) => {
        return (
          <Fragment key={entity.id()}>
            <View entity={entity} />
          </Fragment>
        );
      })}
    </>
  );
};
