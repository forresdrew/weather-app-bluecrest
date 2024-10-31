import './InfoBox.css';
import TemperatureUnit, { getTemperatureUnitSymbol } from '../../enums/TemperatureUnit';
import { FunctionComponent } from 'react';

type InfoBoxProps = {
  label: string;
  value: string;
  unit?: TemperatureUnit;
  testId?: string;
};

// Reusable component to display a value in a labelled box. Will append unit symbol if a unit is provided
const InfoBox: FunctionComponent<InfoBoxProps> = ({ label, value, unit, testId }) => {
  return (
    <div data-testid={testId} className="box">
      <div className="full-height-container">
        <div className="flex">
          <h4 data-testid={`${testId}-label`}>{label}</h4>
        </div>
        <div className="value">
          <h3 data-testid={`${testId}-value`}>{value}</h3>
          {unit && <h4 data-testid={`${testId}-unit`}>°{getTemperatureUnitSymbol(unit)}</h4>}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
