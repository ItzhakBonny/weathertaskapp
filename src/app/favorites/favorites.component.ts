import { Component, OnInit } from '@angular/core';
import { FavoritesStoreService } from '../services/favorites-store/favorites-store.service';
import { Favorite } from '../models/favorite';

@Component({
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class favoritesComponent implements OnInit {

  constructor(private favoritesStore: FavoritesStoreService) { }
  favorites: Favorite[];
  // favoriteAdded:any = this.favoritesStore.favoriteAdded;
  ngOnInit() {
    this.favoritesStore.favorites$.subscribe(data => this.favorites = data);
  }



}
