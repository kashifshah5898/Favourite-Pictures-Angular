import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotostreamComponent } from './components/photostream/photostream.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { PhotoComponent } from './components/photo/photo.component';

const routes: Routes = [
  { path: '', component: PhotostreamComponent },
  { path: 'Favorites', component: FavoritesComponent },
  { path: 'Photo/:id', component: PhotoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
