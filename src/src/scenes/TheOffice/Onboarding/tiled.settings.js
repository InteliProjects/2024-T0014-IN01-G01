// Exporta as configurações do mapa em tiles
export const tiledSettings = [
  {
  tilesetName: "labirinto_tileset",
    layers: [
      {
        layerName: "floor",
        collision: false,
        collideByProperty: false,
      },
      {
        layerName: "wall",
        collision: true,
        collideByProperty: true,
      },
      {
        layerName: "extra",
        collision: true,
        collideByProperty: true,
      },
    ],
  },
];
  