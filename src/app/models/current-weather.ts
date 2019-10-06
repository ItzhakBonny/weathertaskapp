export class WeatherCondition{
    public CityName: string;
    public WeatherText: string;
    public WeatherIcon: number;
    public Temperature: Temperature;
}

export class Temperature{
    public Metric: TemperatureType;
    public Imperial: TemperatureType;
}

export class TemperatureType{
    Value: number;
    Unit: string;
    UnitType:number
}