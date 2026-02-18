import React from "react";

export type RangeOption = "1M" | "3M" | "6M" | "1Y" | "YTD" | "MAX";

interface Props {
  selected: RangeOption;
  onChange: (range: RangeOption) => void;
}

const ranges: RangeOption[] = ["1M", "3M", "6M", "1Y", "YTD", "MAX"];

const DateRangeSelector: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onChange(range)}
          style={{
            marginRight: "8px",
            padding: "6px 12px",
            borderRadius: "6px",
            border:
              selected === range
                ? "2px solid #2563eb"
                : "1px solid #ccc",
            backgroundColor:
              selected === range
                ? "#e0e7ff"
                : "#fff",
            cursor: "pointer"
          }}
        >
          {range}
        </button>
      ))}
    </div>
  );
};

export default DateRangeSelector;
