import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertService } from 'ngx-alerts';
import { PhotostreamComponent } from './photostream.component';

describe('PhotostreamComponent', () => {
  let component: PhotostreamComponent;
  let fixture: ComponentFixture<PhotostreamComponent>;
  let alertService: AlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PhotostreamComponent],
      providers: [AlertService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotostreamComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load photos on component initialization', () => {
    spyOn(component, 'loadPhotos');
    component.ngOnInit();
    expect(component.loadPhotos).toHaveBeenCalled();
  });

  it('should add photo to favorites and show success toast', () => {
    const mockPhoto = { id: 1, download_url: 'https://example.com/photo.jpg' };
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');
    spyOn(alertService, 'success');

    component.addToFavorites(mockPhoto);

    expect(localStorage.getItem).toHaveBeenCalledWith('favorites');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([mockPhoto])
    );
    expect(alertService.success).toHaveBeenCalledWith(
      'Picture Added To Favorites'
    );
  });

  it('should increment page and fetch photos on loadPhotos()', () => {
    const mockData = [
      { id: 1, download_url: 'https://example.com/photo1.jpg' },
    ];
    const httpSpy = spyOn(component.http, 'get').and.returnValue({
      subscribe: (callback: Function) => {
        callback(mockData);
      },
    });

    component.page = 1;
    component.loadPhotos();

    expect(component.page).toBe(2);
    expect(httpSpy).toHaveBeenCalledWith(
      'https://picsum.photos/v2/list?page=2&limit=10'
    );
    expect(component.photos).toEqual([...mockData]);
    expect(component.loading).toBeFalse();
  });

  it('should load more photos when reaching the bottom of the scroll', () => {
    const container = document.createElement('div');
    spyOn(document, 'querySelector').and.returnValue(container);
    spyOn(component, 'loadPhotos');

    container.scrollHeight = 100;
    container.scrollTop = 70;
    container.clientHeight = 30;

    component.onScroll();

    expect(component.loadPhotos).toHaveBeenCalled();
  });
});
