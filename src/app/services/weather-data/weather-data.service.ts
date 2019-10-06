import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { AutoCompleteDetails } from '../../models/auto-complete-models';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(private _http: HttpClient) { }

  public: string = '';
   private apikey = 'dEFgF8MWhHoAMR4GIXmXYdAot1SZjl5F';
  //private apikey = 'gfgh35Z0Jb4s0ZPHbHfvh9wsv7pvrjmm';

  public getAutoComplete(q: string): Observable<AutoCompleteDetails[]> {
    let url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${q}&`;
    return this.executeGetRequestWithCache(url, q.trim());
  }

  public getCurrentCondition(locationKey: number): Observable<any> {
    let url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?`;
    return this.executeGetRequestWithCache(url, locationKey);

  }

  public getCityForecast(locationKey: number) {
    let url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?metric=true&`;
    return this.executeGetRequestWithCache(url, locationKey);
  }

  private executeGetRequestWithCache(url: string, queryKey: any): Observable<any> {
    let data: any;
    var myDate = new Date().getTime();
    let stringifyObject = Object.entries(queryKey).length == 0 ? '' : JSON.stringify(queryKey);
    let key = myDate + '_' + url + `apikey=${this.apikey}` + ((stringifyObject) ? '_' + stringifyObject : '');

    data = JSON.parse(sessionStorage.getItem(key));
    if (data && this.dateIsUpdated(data))
      return of(data);
    return this._http.get(url + `apikey=${this.apikey}`).pipe(
      map(response => {
        data = response;
        if (data)
          sessionStorage.setItem(key, JSON.stringify(data));
        return data;
      })
    )
  };

  private dateIsUpdated(data: string): boolean {
    let delta = 1000 * 60 * 60 * 15; // four hours
    let dataTime = +data.split('_')[0];
    let current = new Date().getTime();
    return current - dataTime < delta;
  }
}
