// Lista de configurações do mapa
export const tiledSettings = [
  {
    tilesetName: 'coffeeshop_tileset', // Nome do conjunto de tiles usado no mapa
    layers:
    [
      {
        layerName: 'floor',  // Nome da camada 'chao'
        collision: false, // Define que não há colisão nesta camada
        collideByProperty: true, // Define que a colisão será determinada por propriedade
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
      },
    ]
  },
]
