import React from 'react';
import { AreaClosed, BarGroup, LinePath } from '@vx/shape';
import { Group } from '@vx/group';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { scaleTime, scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { curveMonotoneX } from '@vx/curve';
import { timeFormat } from 'd3-time-format';
import { extent, max } from 'd3-array';


import { Grid } from '@vx/grid';


// accessors
const xDate = d => d.date;
const yLine = d => d.engagement;

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

  const keys = Object.keys(data[0]).filter(d => d !== 'date' && d !== 'followers' && d !== 'engagement');
  const format = timeFormat("%H");
  const formatDate = (date) => format(date);


  // bounds
  const xMax = width;
  const yMax = height - margin.top - 100;

  const xLineMax = width - margin.left - margin.right;
  const yLineMax = height - margin.top - margin.bottom;

  // Bar scales
  const x0Scale = scaleBand({
    rangeRound: [0, xLineMax],
    domain: data.map(xDate),
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
    domain: extent(data, xDate),
  });
  const yLineScale = scaleLinear({
    range: [yLineMax, 0],
    domain: [0, max(data, yLine)],
    nice: true,
  });

  // responsive utils for axis ticks
  function numTicksForHeight(height) {
    if (height <= 300) return 3;
    if (300 < height && height <= 600) return 5;
    return 10;
  }

  function numTicksForWidth(width) {
    if (width <= 300) return 3;
    if (300 < width && width <= 400) return 6;
    return 8;
  }

  return (
    <svg width={width} height={height}
      style={{marginLeft:20+'px'}}>
      <Grid
        top={margin.top}
        left={margin.left+7}
        xScale={xLineScale}
        yScale={yScale}
        stroke='#8a265f'
        strokeDasharray='1,15'
        width={xMax}
        height={yMax}
        numTicksRows={numTicksForHeight(height)}
        numTicksColumns={numTicksForWidth(width)}
      />
      <AxisLeft
        top={margin.top}
        left={margin.left}
        scale={yScale}
        hideZero
        numTicks={numTicksForHeight(height)}
        label={
          <text
            fill="#8e205f"
            textAnchor="middle"
            fontSize={10}
            fontFamily="Arial"
            >
              likes
            </text>
          }
          stroke="#1b1a1e"
          tickLabelComponent={
            <text
              fill="#8e205f"
              textAnchor="end"
              fontSize={10}
              fontFamily="Arial"
              dx="-0.25em"
              dy="0.25em"
            />
          }
        />
      <BarGroup
        top={margin.top}
        left={7}
        data={data}
        keys={keys}
        height={yMax}
        x0={xDate}
        x0Scale={x0Scale}
        x1Scale={x1Scale}
        yScale={yScale}
        zScale={zScale}
        rx={4}
      />
      <AxisBottom
        scale={xLineScale}
        left={margin.left+7}
        top={yMax + margin.top}
        stroke='#e5fd3d'
        tickStroke='#e5fd3d'
        tickLabelComponent={(
          <text
            fill='#612efb'
            fontSize={11}
            textAnchor="middle"
          />
        )}
      />
      <Group top={margin.top} left={margin.left+7}>
        <AreaClosed
          data={data}
          xScale={x0Scale}
          yScale={yLineScale}
          x={xDate}
          y={yLine}
          strokeWidth={2}
          stroke='transparent'
          fill="url('#orangeRed')"
          curve={curveMonotoneX}
        />
        <LinePath
          data={data}
          xScale={x0Scale}
          yScale={yLineScale}
          x={xDate}
          y={yLine}
          stroke="url('#orangeRed')"
          strokeWidth={2}
          curve={curveMonotoneX}
        />
      </Group>
    </svg>
  );
}
