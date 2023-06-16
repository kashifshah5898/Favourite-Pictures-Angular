import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  favouritePhotos: any = localStorage.getItem('favorites');

  constructor(private route: Router) {}

  ngOnInit() {
    this.favouritePhotos = JSON.parse(this.favouritePhotos);
  }

  navigateToPhoto(photo: any) {
    this.route.navigateByUrl(`/Photo/${photo.id}`);
  }
}
