import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', 3000),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Hoy</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.primary.light} />
          <YAxis stroke={theme.palette.primary.light}>
            <Label
              angle={270}
              position={"left"}
              style={{ textAnchor: 'middle', fill: theme.palette.primary.light }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <CartesianGrid stroke={theme.palette.primary.main} strokeDasharray={"5 5"}/>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.secondary.main} dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
