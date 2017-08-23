import React from 'react';
import { AreaClosed, BarGroup, LinePath } from '@vx/shape';
import { Group } from '@vx/group';
import { AxisBottom } from '@vx/axis';
import { scaleTime, scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { curveMonotoneX } from '@vx/curve';
import { timeParse, timeFormat } from 'd3-time-format';
import { extent, max } from 'd3-array';


// accessors
const x0 = d => d.date;
const y = d => d.value;
const yLine = d => d.cumulLikes;

export default ({
  data,
  width,
  height,
  margin = {
    top: 40,
    left: 20,
    right: 20,
    bottom: 100,
  }
}) => {
  if (width < 10) return null;
  data = data.reverse();
  data.map((el, index, data) => {
    el['cumulLikes'] = (index === 0) ?
      el.likes :
      data[index-1].cumulLikes + el.likes}
  );

  const keys = Object.keys(data[0]).filter(d => d !== 'date' && d !== 'followers' && d !== 'cumulLikes');
  const format = timeFormat("%H");
  const formatDate = (date) => format(date);


  // bounds
  const xMax = width;
  const yMax = height - margin.top - 100;

  const xLineMax = width - margin.left - margin.right;
  const yLineMax = height - margin.top - margin.bottom;

  // Bar scales
  const x0Scale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x0),
    padding: 0.2,
    tickFormat: () => (val) => formatDate(val)
  });
  const x1Scale = scaleBand({
    rangeRound: [0, x0Scale.bandwidth()],
    domain: keys,
    padding: .1
  });
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, max(data, (d) => {
      return max(keys, (key) => d[key])
    })],
  });
  const zScale = scaleOrdinal({
    domain: keys,
    range: ['#aeeef8', '#e5fd3d']
  });
  // Line scales
  const xLineScale = scaleTime({
    range: [0, xLineMax],
    domain: extent(data, x0),
  });
  const yLineScale = scaleLinear({
    range: [yLineMax, 0],
    domain: [0, max(data, yLine)],
    nice: true,
  });



  return (
    <svg width={width} height={height}>
      <BarGroup
        top={margin.top}
        data={data}
        keys={keys}
        height={yMax}
        x0={x0}
        x0Scale={x0Scale}
        x1Scale={x1Scale}
        yScale={yScale}
        zScale={zScale}
        rx={4}
        onClick={data => event => {
          alert(`clicked: ${JSON.stringify(data)}`)
        }}
      />
      <AxisBottom
        scale={x0Scale}
        top={yMax + margin.top}
        stroke='#e5fd3d'
        tickStroke='#e5fd3d'
        hideAxisLine
        tickLabelComponent={(
          <text
            fill='#612efb'
            fontSize={11}
            textAnchor="middle"
          />
        )}
      />
      <Group top={margin.top} left={margin.left}>
        <AreaClosed
          data={data}
          xScale={xLineScale}
          yScale={yLineScale}
          x={x0}
          y={yLine}
          strokeWidth={2}
          stroke='transparent'
          fill="url('#orangeRed')"
          curve={curveMonotoneX}
        />
        <LinePath
          data={data}
          xScale={x0Scale}
          yScale={yScale}
          x={x0}
          y={y}
          stroke="url('#orangeRed')"
          strokeWidth={2}
          curve={curveMonotoneX}
        />
      </Group>
    </svg>
  );
}
