import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent {
  favoritePhotos: any = localStorage.getItem('favorites');
  photo: any;
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toast: AlertService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.favoritePhotos = JSON.parse(this.favoritePhotos);
      this.photo = this.favoritePhotos.filter(
        (photo: any) => photo.id === params.id
      );
    });
    this.photo = this.photo[0];
  }

  removeFromFavorite() {
    let newFavt = this.favoritePhotos.filter(
      (photo: any) => photo.id !== this.photo.id
    );
    localStorage.setItem('favorites', JSON.stringify(newFavt));
    this.route.navigateByUrl('/Favorites');
    this.toast.danger('Picture Is Removed From Favorites');
  }
}
