import './ConditionsTile.css';
import Unit, { getTemperatureUnitSymbol } from '../../enums/Unit';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import DateUtils from '../../utils/DateUtils';
import Conditions from '../../models/Conditions';

type ConditionsTileProps = {
  conditions: Conditions;
  unit: Unit;
};

// Reusable component to display forecast conditions
const ConditionsTile: FunctionComponent<ConditionsTileProps> = ({ conditions, unit }) => {
  // Render tomorrow if provided date is tomorrow - else render formatted date
  const header = DateUtils.isDateTomorrow(conditions.datetime)
    ? 'Tomorrow'
    : DateUtils.formatDateDDDddMMM(new Date(conditions.datetime));

  return (
    <div className="box">
      <div className="full-height-container">
        <div className="flex">
          <h4 className="forecast-date light-text">{header}</h4>
          <div className="condition-container">
            <div className="forecast-image-container">
              <Image
                className="forecast-image"
                src={require(`../../assets/images/${conditions.icon}.svg`)}
                alt={`${conditions.icon}.svg`}
              />
            </div>
          </div>
          <h4>{conditions.conditions}</h4>
        </div>
        <div className="min-max-row">
          <h4>
            {Math.round(conditions.tempmin ?? 0)}°{getTemperatureUnitSymbol(unit)}
          </h4>
          <h4 className="light-text">
            {Math.round(conditions.tempmax ?? 0)}°{getTemperatureUnitSymbol(unit)}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ConditionsTile;
