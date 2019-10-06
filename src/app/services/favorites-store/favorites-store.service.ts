import { Injectable, Output, EventEmitter } from '@angular/core';
import { Favorite } from 'src/app/models/favorite';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesStoreService {

  constructor() {
    this.init();
  }

  private readonly _favorites = new BehaviorSubject<Favorite[]>([]);
  readonly favorites$ = this._favorites.asObservable();
  public storageKey: string = 'favorites';

  private get favorites(): Favorite[] {
    return this._favorites.getValue();
  }

  private set favorites(val: Favorite[]) {
    this._favorites.next(val);
    this.addToStorage();
  }

  init(): void {
    let data = localStorage.getItem(this.storageKey);
    if (data)
      this.favorites = JSON.parse(data);
  }

  addFavorite(f: Favorite): boolean {
    this.favorites = [
      ...this.favorites,
      { cityKey: f.cityKey, name: f.name, lastKnownTemp: f.lastKnownTemp,
         tempUnit: f.tempUnit, weatherText: f.weatherText }
    ];
    return this.checkFavorite(f.cityKey);
  }

  removeFavorite(key: string): boolean {
    this.favorites = this.favorites.filter(favorite => favorite.cityKey !== key);
    localStorage.removeItem(key);
    return this.checkFavorite(key);
  }

  checkFavorite(key: string) {
    return this.favorites.filter(f => f.cityKey == key).length > 0 ? true : false
  }

  addToStorage() {
    let data = localStorage.getItem(this.storageKey);
    if (data) {
      localStorage.removeItem(this.storageKey);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
  }

  getFavorite(cityKey: string): Favorite {
    return this.favorites.find(f => f.cityKey == cityKey);
  }
}
