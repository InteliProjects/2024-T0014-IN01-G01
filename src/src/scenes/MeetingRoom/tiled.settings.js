// Exporta as configurações do mapa em tiles
export const tiledSettings = [
    {
      tilesetName: 'meetingroom_tileset',
      layers:
      [{
          layerName: 'floor',
          collision: false,
          collideByProperty: true,
        },
        {
          layerName: 'wall',
          collision: true,
          collideByProperty: true,
        },
        {
          layerName: 'collision',
          collision: true,
          collideByProperty: true,
        },
        {
          layerName: 'extra',
          collision: true,
          collideByProperty: true,
        }
      ]
    },
  ]
  