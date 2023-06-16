import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotostreamComponent } from './photostream.component';

describe('PhotostreamComponent', () => {
  let component: PhotostreamComponent;
  let fixture: ComponentFixture<PhotostreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotostreamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotostreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
