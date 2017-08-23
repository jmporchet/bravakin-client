import React from 'react';
import { RadialGradient } from '@vx/gradient';
import { Mercator } from '@vx/geo';
import * as topojson from 'topojson-client';

import topology from '../../config/world.geo.json';
import { WorldmapColors } from '../../config/chart-colors';

export const Worldmap = ({ width, height, events = false }) => {
  if (width < 10) return <div />;

  const world = topojson.feature(topology, topology.objects.units);
  // topojson will somehow delete the keys added to topology,
  // so any modification has to be done after it.
  // push the API data in here


  world.features.find((country) => country.id === 'AFG')['heat'] = 1;
  world.features.find((country) => country.id === 'CHE')['heat'] = 10;
  world.features.find((country) => country.id === 'ESP')['heat'] = 5;
  world.features.find((country) => country.id === 'JPN')['heat'] = 7;
  world.features.find((country) => country.id === 'USA')['heat'] = 10;

console.log(world.features);

  function fillColor (country) {
    const heat = country.heat;
    const percentile = 10 / (WorldmapColors.length -1);

    if (heat) {
      return WorldmapColors[Math.ceil(heat / percentile)];
    } else {
      return WorldmapColors[0];
    }
  }

  return (
    <svg width={width} height={height}>
      <RadialGradient
        id="geo_mercator_radial"
        from="#55bdd5"
        to="#4f3681"
        r={'80%'}
      />
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={`url(#geo_mercator_radial)`}
        rx={14}
      />
      <Mercator
        data={world.features}
        scale={width / 630 * 100}
        translate={[width / 2, height / 2 + 50]}
        fill={(country) => fillColor(country)}
        stroke={() => '#5fcfa7'}
        onClick={data => event => {
          if (!events) return;
          alert(`Clicked: ${data.properties.name} (${data.id})`);
        }}
      />
    </svg>
  );
};
