import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-photostream',
  templateUrl: './photostream.component.html',
  styleUrls: ['./photostream.component.scss'],
})
export class PhotostreamComponent implements OnInit {
  photos: any[] = [];
  loading: boolean = false;
  page: number = 0;

  constructor(private http: HttpClient) {}

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
          this.photos.push(...data);
          this.loading = false;
        });
    }, delay);
  }

  addToFavorites(data: any) {
    let getFavorites = localStorage.getItem('favorites');
    if (getFavorites) {
      let parseData = JSON.parse(getFavorites);
      localStorage.setItem('favorites', JSON.stringify([...parseData, data]));
    } else {
      localStorage.setItem('favorites', JSON.stringify([data]));
    }

    alert('Picture added to favorites');
  }
}
