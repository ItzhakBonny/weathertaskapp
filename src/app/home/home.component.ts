import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherDataService } from '../services/weather-data/weather-data.service';
import { AutoCompleteDetails } from '../models/auto-complete-models';
import { WeatherCondition, TemperatureType } from '../models/current-weather';
import { FiveDayForecast } from '../models/five-day-forecast';
import { FavoritesStoreService } from '../services/favorites-store/favorites-store.service';
import { Favorite } from '../models/favorite';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _weatherService: WeatherDataService, public favoritesStore: FavoritesStoreService, private route: ActivatedRoute) { }

  suggestions: AutoCompleteDetails[];
  selectedCity: AutoCompleteDetails;
  currentCondition: WeatherCondition;
  fiveDayForecast: FiveDayForecast;
  cityKey: string;
  telAvivKey: string = "215793";
  emptyMessage = "English letters only please";
  isFavorite: boolean;
  displayTemp: TemperatureType;
  errorDisplay: boolean = false;
  isCurrentWaiting: boolean = true;
  isForecastWaiting: boolean = true;


  ngOnInit() {
    if (this.routedFromFavorites()) {
      this.retrieveFavoriteDetails();
      this.getCityData()
    } else {
      this.getDefaultCity();
    }
  }


  public getDefaultCity() {
    /*The city name appears only in the autocomplete response, hence the request*/
    this._weatherService.getAutoComplete('Tel Aviv').subscribe(data => {
      this.selectedCity = data[0];
      this.isFavorite = this.favoritesStore.checkFavorite(this.selectedCity.Key);
      this.getCityData();
    });
  }

  //#region Get waether methods 
  public autoComplete(event) {
    this._weatherService.getAutoComplete(event.query).subscribe(data =>
      this.suggestions = data,
      () => this.errorDisplay = true);
  }

  public getCityData() {
    let cityKey = this.selectedCity.Key;
    this.isFavorite = this.favoritesStore.checkFavorite(cityKey);
    this.getForecast(+cityKey);
    this.getCurrentCondition(+cityKey);
  }

  public getCurrentCondition(cityKey: number) {
    this._weatherService.getCurrentCondition(cityKey).subscribe(data => {
      this.currentCondition = data[0];
      this.displayTemp = this.currentCondition.Temperature.Metric;
      this.isCurrentWaiting = false;
    },
      () => {
        this.errorDisplay = true;
        this.isCurrentWaiting = false;
      });
  }

  public getForecast(cityKey: number) {
    this._weatherService.getCityForecast(cityKey).subscribe(data => {
      this.fiveDayForecast = data;
      this.isForecastWaiting = false;
    },
      () => {
        this.errorDisplay = true;
        this.isForecastWaiting = false;
      });
  }

  //#endregion

  //#region favorites handling
  addFavorite() {
    let f: Favorite = {
      cityKey: this.selectedCity.Key,
      lastKnownTemp: this.currentCondition.Temperature.Metric.Value,
      name: this.selectedCity.LocalizedName,
      tempUnit: this.currentCondition.Temperature.Metric.Unit,
      weatherText: this.currentCondition.WeatherText
    }
    this.isFavorite = this.favoritesStore.addFavorite(f);

  }

  removeFavorite() {
    this.isFavorite = this.favoritesStore.removeFavorite(this.selectedCity.Key);
  }

  addRemoveFavorite() {
    this.isFavorite ? this.removeFavorite() : this.addFavorite();
  }

  routedFromFavorites(): boolean {
    this.route.paramMap.subscribe(params => {
      this.cityKey = params.get('key');
    });
    return this.cityKey ? true : false;
  }

  retrieveFavoriteDetails() {
    let favorite = this.favoritesStore.getFavorite(this.cityKey);
    this.selectedCity = new AutoCompleteDetails();
    this.selectedCity.Key = favorite.cityKey;
    this.selectedCity.LocalizedName = favorite.name;
  }

  //#endregion

  CelcuisToFahrenheit() {
    this.displayTemp = (this.displayTemp == this.currentCondition.Temperature.Metric) ? this.currentCondition.Temperature.Imperial : this.currentCondition.Temperature.Metric;
  }

}
