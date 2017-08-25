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
    top: 10,
    left: 50,
    right: 20,
    bottom: 100,
  }
}) => {
  if (width < 10) return null;

  const keys = Object.keys(data[0]).filter(d => d !== 'date' && d !== 'followers' && d !== 'engagement');
  const format = timeFormat("%H");
  const formatDate = (date) => format(date);


  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Bar scales
  // hours on x axis
  const x0Scale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.reverse().map(xDate),
    padding: 0.1,
    tickFormat: () => (val) => formatDate(val)
  });

  const x1Scale = scaleBand({
    rangeRound: [0, x0Scale.bandwidth()],
    domain: keys,
    padding: 0.1
  });

  // colors for the bars
  const zScale = scaleOrdinal({
    domain: keys,
    range: ['#aeeef8', '#e5fd3d']
  });

  // Engagement line scales
  const xLineScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, xDate),
  });
  const yLineScale = scaleLinear({
    range: [yMax, 0],
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
    return 12;
  }

  return (
    <svg width={width} height={height} >
      <Grid
        top={margin.top}
        left={margin.left}
        xScale={xLineScale}
        yScale={yLineScale}
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
        scale={yLineScale}
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
        <AxisBottom
          scale={xLineScale}
          top={height - margin.bottom}
          left={margin.left}
          numTicks={numTicksForWidth(width)}
          stroke='#1b1a1e'
          tickStroke='#1b1a1e'
          tickLabelComponent={(
            <text
              fill="#8e205f"
              textAnchor="middle"
              fontSize={10}
              fontFamily="Arial"
              dy="0.25em"
            />
          )}
        />
      <BarGroup
        top={margin.top}
        left={margin.left}
        data={data}
        keys={keys}
        height={yMax}
        x0={xDate}
        x0Scale={x0Scale}
        x1Scale={x1Scale}
        yScale={yLineScale}
        zScale={zScale}
        rx={4}
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
