import './PercentageIndicator.css';
import { FunctionComponent } from 'react';

type PercentageIndicatorProps = {
  label: string;
  value: number;
  barColor?: string;
};

// Reusable component to render % indicator. Will use default color if none is provided in props
const PercentageIndicator: FunctionComponent<PercentageIndicatorProps> = ({ label, value, barColor }) => {
  // Round value and make sure it is not great than max %
  let roundedValue = Math.round(value);
  if (roundedValue > 100) {
    roundedValue = 100;
  }

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
      <div className="min-max-percent-row">
        <p>0</p>
        <p>100</p>
      </div>
    </div>
  );
};

export default PercentageIndicator;
