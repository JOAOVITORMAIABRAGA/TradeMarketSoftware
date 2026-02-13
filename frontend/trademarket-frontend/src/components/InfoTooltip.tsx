import React from "react";

interface Props {
  text: string;
}

const InfoTooltip: React.FC<Props> = ({ text }) => {
  return (
    <span className="info-tooltip-container">
      ⓘ
      <span className="info-tooltip-text">
        {text}
      </span>
    </span>
  );
};

export default InfoTooltip;
