import { HealthPoint } from "@/common/traits/HealthPoint";
import { IsBattle } from "@/common/traits/IsBattle";
import type { World } from "koota";
import { IsInteracting } from "@/common/traits/IsInteracting";
import { HealthSystem } from "@/common/systems/health";
import { BattleTurn } from "@/common/traits/BattleTurn";
import { delay } from "es-toolkit";

export class BattleSystem {
  private _world: World;
  public MAX_HEALTH = 100 as const;

  public constructor(world: World) {
    this._world = world;
  }

  public static from(world: World) {
    return new BattleSystem(world);
  }

  public start() {
    this._world.query(IsInteracting).updateEach((_, entity) => {
      entity.add(IsBattle);
      entity.add(HealthPoint);
      entity.add(BattleTurn);

      HealthSystem.from(this._world).init();
    });
  }

  public async attack() {
    this._world.query(IsInteracting, IsBattle, BattleTurn).updateEach(([battleTurn]) => {
      battleTurn.turn = "user";
    });

    await delay(1000);

    HealthSystem.from(this._world).damage(10);

    this._world.query(IsInteracting, IsBattle, HealthPoint).updateEach(([healthPoint]) => {
      if (healthPoint.health <= 0) {
        this.end();
      }
    });

    await delay(1000);

    this._world.query(IsInteracting, IsBattle, BattleTurn).updateEach(([battleTurn]) => {
      battleTurn.turn = "idle";
    });
  }

  public end() {
    this._world.query(IsInteracting, IsBattle, BattleTurn, HealthPoint).updateEach((_, entity) => {
      entity.remove(IsBattle);
      entity.remove(HealthPoint);
      entity.remove(BattleTurn);
      entity.remove(IsInteracting);
    });
  }
}
