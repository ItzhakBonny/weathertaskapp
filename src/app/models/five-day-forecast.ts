import { TemperatureType } from './current-weather';

export class FiveDayForecast {
    Headline: Headline;
    DailyForecasts: DailyForecast[];
}

class Headline {
    EffectiveDate: Date;
}

class DailyForecast {
    Date: Date;
    Temperature: ForecasrTemperature;
    Day: DayOrNight;
    Night: DayOrNight;
}

class ForecasrTemperature {
    Minimum: TemperatureType;
    Maximum: TemperatureType;
}

class DayOrNight {
    Icon: number;
    hasPrecipitation: boolean
}