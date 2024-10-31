import './ConditionsTile.css';
import TemperatureUnit, { getTemperatureUnitSymbol } from '../../enums/TemperatureUnit';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import DateUtils from '../../utils/DateUtils';
import Conditions from '../../models/Conditions';

type ConditionsTileProps = {
  conditions: Conditions;
  unit: TemperatureUnit;
  testId?: string;
};

// Reusable component to display forecast conditions
const ConditionsTile: FunctionComponent<ConditionsTileProps> = ({ conditions, unit, testId }) => {
  // Render tomorrow if provided date is tomorrow - else render formatted date
  const header = DateUtils.isDateTomorrow(conditions.datetime)
    ? 'Tomorrow'
    : DateUtils.formatDateDDDddMMM(new Date(conditions.datetime));

  return (
    <div data-testid={testId} className="box">
      <div className="full-height-container">
        <div className="flex">
          <h4 data-testid={`${testId}-header`} className="forecast-date light-text">
            {header}
          </h4>
          <div className="condition-container">
            <div data-testid={`${testId}-image-container`} className="forecast-image-container">
              <Image
                className="forecast-image"
                src={require(`../../assets/images/${conditions.icon}.svg`)}
                alt={`${conditions.icon}.svg`}
              />
            </div>
          </div>
          <h4 data-testid={`${testId}-conditions`}>{conditions.conditions}</h4>
        </div>
        <div className="min-max-row">
          <h4 data-testid={`${testId}-min-temp`}>
            {Math.round(conditions.tempmin ?? 0)}°{getTemperatureUnitSymbol(unit)}
          </h4>
          <h4 data-testid={`${testId}-max-temp`} className="light-text">
            {Math.round(conditions.tempmax ?? 0)}°{getTemperatureUnitSymbol(unit)}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ConditionsTile;
