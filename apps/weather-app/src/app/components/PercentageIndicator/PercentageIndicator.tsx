'use client';
import './PercentageIndicator.css';
import { FunctionComponent } from 'react';

type PercentageIndicatorProps = {
  label: string;
  value: number;
  barColor?: string;
};

const PercentageIndicator: FunctionComponent<PercentageIndicatorProps> = ({ label, value, barColor }) => {
  const roundedValue = Math.round(value);

  return (
    <div className="box">
      <h4>{label}</h4>
      <div className="value-row">
        <div className="fixed-width" />
        <h3 className="value">{roundedValue}%</h3>
        <div className="fixed-width">
          <p>%</p>
        </div>
      </div>
      <div className="percentage-row">
        <div className="percentage-bar" style={{ flex: roundedValue, backgroundColor: barColor ?? '#1BACFF' }} />
        <div className="percentage-bar" style={{ flex: 100 - roundedValue, backgroundColor: 'white' }} />
      </div>
      <div className="min-max-row">
        <p>0</p>
        <p>100</p>
      </div>
    </div>
  );
};

export default PercentageIndicator;
