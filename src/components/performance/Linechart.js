import React from 'react';
import { Grid } from '@vx/grid';
import { Group } from '@vx/group';
import { curveMonotoneX } from '@vx/curve';
import { GradientOrangeRed, GradientTealBlue } from '@vx/gradient';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { AreaClosed, LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';

// accessors
const x = d => d.date;
const y = d => d.followers;

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

export default ({
  data,
  width,
  height,
  margin = {
    top: 10,
    left: 50,
    right: 20,
    bottom: 100,
  },
}) => {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // scales
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, y)],
    nice: true,
  });

  const printLineChart = () => {
    return (
      <Group top={margin.top} left={margin.left}>
        <AreaClosed
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          strokeWidth={2}
          stroke='transparent'
          fill="url('#orangeRed')"
          curve={curveMonotoneX}
        />
        <LinePath
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke="url('#orangeRed')"
          strokeWidth={2}
          curve={curveMonotoneX}
        />
      </Group>
    );
  };

  const printBarChart = () => {
  }

  return (
    <svg width={width} height={height}>
      <GradientOrangeRed
        id="orangeRed"
        vertical={false}
        fromOpacity={0.3}
        toOpacity={0.3}
      />
      <GradientTealBlue
        id="tealBlue"
        vertical={false}
        fromOpacity={0.3}
        toOpacity={0.3}
      />
      <Grid
        top={margin.top}
        left={margin.left}
        xScale={xScale}
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
      <AxisBottom
        top={height - margin.bottom}
        left={margin.left}
        scale={xScale}
        numTicks={numTicksForWidth(width)}
        label={
          <text
            fill="#8e205f"
            textAnchor="middle"
            fontSize={10}
            fontFamily="Arial"
          />
          }
          stroke={'#1b1a1e'}
          tickStroke={'#1b1a1e'}
          tickLabelComponent={
            <text
              fill="#8e205f"
              textAnchor="middle"
              fontSize={10}
              fontFamily="Arial"
              dy="0.25em"
            />
          }
        />
      { printLineChart() }
      { printBarChart() }

    </svg>
  );
}
