'use client';
import './InfoBox.css';
import Unit, { getTemperatureUnitSymbol } from '../../enums/Unit';
import { FunctionComponent } from 'react';

type InfoBoxProps = {
  label: string;
  value: string;
  unit?: Unit;
};

const InfoBox: FunctionComponent<InfoBoxProps> = ({ label, value, unit }) => {
  return (
    <div className="box">
      <h4>{label}</h4>
      <div className="value">
        <h3>{value}</h3>
        {!!unit && <h4>°{getTemperatureUnitSymbol(unit)}</h4>}
      </div>
    </div>
  );
};

export default InfoBox;
