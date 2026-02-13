import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { AssetHistoryPoint } from "../types/assetHistory";

interface Props {
  data: AssetHistoryPoint[];
}

const AssetHistoryChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString()
          }
        />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip
          labelFormatter={(value) =>
            new Date(value as string).toLocaleDateString()
          }
        />
        <Line
          type="monotone"
          dataKey="close"
          stroke="#2563eb"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AssetHistoryChart;
