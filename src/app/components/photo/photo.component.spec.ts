import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { AlertService, AlertModule } from 'ngx-alerts'; // Import the required modules and services
import { PhotoComponent } from './photo.component';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let alertService: AlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoComponent],
      imports: [RouterTestingModule, AlertModule.forRoot()], // Add the necessary imports
      providers: [AlertService], // Provide the AlertService
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    alertService = TestBed.inject(AlertService);

    // Mock the activated route
    activatedRoute.params = {
      subscribe: jasmine
        .createSpy('params.subscribe')
        .and.callFake((fn: (value: any) => void) =>
          fn(convertToParamMap({ id: 'photo-id' }))
        ),
    } as any;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component', () => {
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify([
        { id: 'photo-id', download_url: 'http://example.com/photo.jpg' },
      ])
    );

    component.ngOnInit();

    expect(component.favoritePhotos).toEqual([
      { id: 'photo-id', download_url: 'http://example.com/photo.jpg' },
    ]);
    expect(component.photo).toEqual({
      id: 'photo-id',
      download_url: 'http://example.com/photo.jpg',
    });
  });

  it('should remove the photo from favorites', () => {
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify([
        { id: 'photo-id', download_url: 'http://example.com/photo.jpg' },
      ])
    );
    spyOn(localStorage, 'setItem');
    spyOn(router, 'navigateByUrl');
    spyOn(alertService, 'danger');

    component.ngOnInit();
    component.removeFromFavorite();

    expect(localStorage.setItem).toHaveBeenCalledWith('favorites', '[]');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/Favorites');
    expect(alertService.danger).toHaveBeenCalledWith(
      'Picture Is Removed From Favorites'
    );
  });
});
