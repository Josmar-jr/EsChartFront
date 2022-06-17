import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import { format } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

import { CustomTooltip } from './CustomTooltip';

const data = [
  {
    date: format(new Date('02/24/2022'), 'dd/MM/yyyy', {
      locale: enUS
    }),
    pv: 2400
  },
  {
    date: new Date('01/24/2022').toString(),
    pv: 1398
  },
  {
    date: new Date('11/14/2022').toString(),
    pv: 9800
  },
  {
    date: new Date().toString(),
    pv: 3908
  },
  {
    date: new Date('06/16/2022').toString(),
    pv: 4800
  }
];

export function Chart() {
  return (
    <LineChart
      width={800}
      height={400}
      data={data}
      className="bg-blue-200 bg-opacity-20 rounded-md p-4"
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="6 6" stroke="#d4d4d8" />
      <XAxis dataKey="date" format="Y-m-d" />
      <YAxis />
      <Tooltip
        offset={-90}
        content={<CustomTooltip />}
        coordinate={{
          x: 0,
          y: 0
        }}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#0095db"
        strokeWidth={3}
        activeDot={{ r: 6 }}
        dot={false}
      />
    </LineChart>
  );
}
