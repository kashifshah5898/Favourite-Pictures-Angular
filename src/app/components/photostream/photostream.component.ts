import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-photostream',
  templateUrl: './photostream.component.html',
  styleUrls: ['./photostream.component.scss'],
})
export class PhotostreamComponent implements OnInit {
  photos: any[] = [];
  loading: boolean = false;
  page: number = 0;

  constructor(private http: HttpClient, private toast: AlertService) {}

  ngOnInit() {
    this.loadPhotos();
  }

  onScroll() {
    let container: any = '';
    container = document.querySelector('.photo-container');
    const scrollHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;

    if (
      scrollHeight - Math.floor(scrollTop) === clientHeight ||
      scrollHeight - Math.ceil(scrollTop) === clientHeight
    ) {
      this.loadPhotos();
    }
  }

  loadPhotos() {
    this.loading = true;
    const delay = Math.floor(Math.random() * 100) + 200; // Random delay between 200-300ms

    setTimeout(() => {
      this.page++;
      this.http
        .get(`https://picsum.photos/v2/list?page=${this.page}&limit=10`)
        .subscribe((data: any) => {
          let getFavorites: any = localStorage.getItem('favorites');
          let parseData: any;
          if (getFavorites) {
            parseData = JSON.parse(getFavorites);
          } else {
            parseData = [];
          }

          // Iterate over the first array
          data.forEach((obj: any) => {
            // Check if the object exists in the second array
            const foundObject = parseData.find(
              (item: any) => item.id === obj.id
            );

            // Set the 'isliked' value
            obj.isLiked = foundObject !== undefined;
          });

          this.photos.push(...data);
          this.loading = false;
        });
    }, delay);
  }

  addToFavorites(data: any) {
    let getFavorites = localStorage.getItem('favorites');
    data.isLiked = true;
    if (getFavorites) {
      let parseData = JSON.parse(getFavorites);

      let findAlready = parseData.filter((favorite: any) => {
        return favorite.id === data.id;
      });

      if (findAlready.length) {
        this.toast.warning('Picture Already Exists To Favorites');
      } else {
        localStorage.setItem('favorites', JSON.stringify([...parseData, data]));
        this.toast.success('Picture Added To Favorites');
      }
    } else {
      localStorage.setItem('favorites', JSON.stringify([data]));
      this.toast.success('Picture Added To Favorites');
    }
  }
}
