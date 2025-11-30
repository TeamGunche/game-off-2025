import { useMemo } from "react";
import * as THREE from "three";
import { Instance, Instances } from "@react-three/drei";
import { pxToGridPosition } from "@/common/ldtk/utils/positionUtils.ts";
import { centerTilePivot } from "@/common/ldtk/utils/tilesetUtils.ts";
import type { TileInstance, TilesetDefinition } from "@/common/ldtk/models/LdtkTypes.ts";

interface InstancedTilesRendererProps {
  tiles: TileInstance[]
  tileset: TilesetDefinition
  texture: THREE.Texture
  tileSize: number
  layerPxDimensions: [number, number]
  layerPxOffsets: [number, number]
}

// Reuse color instance
const WHITE_COLOR = new THREE.Color(1, 1, 1);

// Shared plane geometry
const PLANE = new THREE.PlaneGeometry(1, 1);

export default function InstancedTilesRenderer(
  {
    tiles,
    tileset,
    texture,
    tileSize,
    layerPxDimensions,
    layerPxOffsets,
  }: InstancedTilesRendererProps) {
  // Configure texture to prevent seams
  useMemo(() => {
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
  }, [texture]);

  // Group tiles by their texture coordinates (tileId)
  const tileGroups = useMemo(() => {
    const groups: Record<number, TileInstance[]> = {};

    tiles.forEach((tile) => {
      if (!groups[tile.t]) {
        groups[tile.t] = [];
      }
      groups[tile.t].push(tile);
    });

    return groups;
  }, [tiles]);

  // Create a map of tile textures
  const tileTextures = useMemo(() => {
    const textures: Record<number, THREE.Texture> = {};

    // UV mapping constants
    const insetPixels = 0.1;
    const tileUVW = (tileset.tileGridSize - insetPixels * 2) / tileset.pxWid;
    const tileUVH = (tileset.tileGridSize - insetPixels * 2) / tileset.pxHei;

    Object.keys(tileGroups).forEach((tileId) => {
      const id = parseInt(tileId);
      const tile = tileGroups[id][0];
      const { src } = tile;

      const tileUVX = (src[0] + insetPixels) / tileset.pxWid;
      const tileUVY = (tileset.pxHei - src[1] - insetPixels) / tileset.pxHei - tileUVH;

      const cutTexture = texture.clone();
      cutTexture.offset.set(tileUVX, tileUVY);
      cutTexture.repeat.set(tileUVW, tileUVH);
      cutTexture.needsUpdate = true;
      textures[id] = cutTexture;
    });

    return textures;
  }, [tileGroups, tileset, texture]);

  // Render each group of tiles with the same texture as a separate instanced mesh
  return (
    <>
      {Object.entries(tileGroups).map(([tileId, groupTiles]) => {
        const id = parseInt(tileId);
        const tileTexture = tileTextures[id];

        return (
          <InstancedTileGroup
            key={id}
            tiles={groupTiles}
            texture={tileTexture}
            tileSize={tileSize}
            layerPxDimensions={layerPxDimensions}
            layerPxOffsets={layerPxOffsets}
          />
        );
      })}
    </>
  );
}

interface InstancedTileGroupProps {
  tiles: TileInstance[]
  texture: THREE.Texture
  tileSize: number
  layerPxDimensions: [number, number]
  layerPxOffsets: [number, number]
}

function InstancedTileGroup(
  {
    tiles,
    texture,
    tileSize,
    layerPxDimensions,
    layerPxOffsets,
  }: InstancedTileGroupProps) {
  // Pre-calculate all tile transforms once
  const tileTransforms = useMemo(() => {
    return tiles.map((tile) => {
      const { px, f } = tile;

      // Position calculation
      const posInPx = centerTilePivot(
        [px[0] + layerPxOffsets[0], layerPxDimensions[1] - px[1] - layerPxOffsets[1]],
        tileSize,
      );
      const posInGrid = pxToGridPosition(posInPx, tileSize);

      // Flipping
      const scaleX = (f & 1) ? -1 : 1;
      const scaleY = (f & 2) ? -1 : 1;

      return {
        position: [posInGrid[0], posInGrid[1], 0] as [number, number, number],
        scale: [scaleX, scaleY, 1] as [number, number, number],
      };
    });
  }, [tiles, tileSize, layerPxDimensions, layerPxOffsets]);

  if (tiles.length === 0) return null;

  return (
    <Instances limit={tiles.length} geometry={PLANE}>
      <meshLambertMaterial transparent={true} color="white">
        <primitive attach="map" object={texture} />
      </meshLambertMaterial>

      {tileTransforms.map((transform, i) => (
        <Instance
          key={i}
          position={transform.position}
          scale={transform.scale}
          color={WHITE_COLOR}
        />
      ))}
    </Instances>
  );
}
