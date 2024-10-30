import './InfoBox.css';
import Unit, { getTemperatureUnitSymbol } from '../../enums/Unit';
import { FunctionComponent } from 'react';

type InfoBoxProps = {
  label: string;
  value: string;
  unit?: Unit;
};

// Reusable component to display a value in a labelled box. Will append unit symbol if a unit is provided
const InfoBox: FunctionComponent<InfoBoxProps> = ({ label, value, unit }) => {
  return (
    <div className="box">
      <div className="full-height-container">
        <div className="flex">
          <h4>{label}</h4>
        </div>
        <div className="value">
          <h3>{value}</h3>
          {unit && <h4>°{getTemperatureUnitSymbol(unit)}</h4>}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
