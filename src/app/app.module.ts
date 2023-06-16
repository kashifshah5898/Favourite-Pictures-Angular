import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { PhotostreamComponent } from './components/photostream/photostream.component';

@NgModule({
  declarations: [AppComponent, FavoritesComponent, PhotostreamComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
