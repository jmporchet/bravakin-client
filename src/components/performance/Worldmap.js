import React from 'react';
import { RadialGradient } from '@vx/gradient';
import { Mercator } from '@vx/geo';
import * as topojson from 'topojson-client';

import topology from '../../config/world.geo.json';
import { WorldmapColors } from '../../config/chart-colors';

export default ({ data, width, height, events = false }) => {
  if (width < 10) return <div />;

  const world = topojson.feature(topology, topology.objects.units);

  data.locations.forEach(location => {
    world.features.find((country) => country.id === location.id)['heat'] = location.heat;
  })

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
      />
    </svg>
  );
};
