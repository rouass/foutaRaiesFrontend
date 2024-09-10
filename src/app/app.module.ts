import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoutaGategoriesComponent } from './fouta-gategories/fouta-gategories.component';
import { CategoryService } from './services/category.service';
import { FormsModule } from '@angular/forms';
import { DevisFormComponent } from './devis-form/devis-form.component';
import { HomePageComponent } from './home-page/home-page.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CarouselComponent } from './carousel/carousel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { FouataDetailsComponent } from './fouata-details/fouata-details.component';
import { SubmodelListComponent } from './submodel-list/submodel-list.component';
import { SubmodelFoutaDetailsComponent } from './submodel-fouta-details/submodel-fouta-details.component';

@NgModule({
  declarations: [
    AppComponent,
    FoutaGategoriesComponent,
    DevisFormComponent,
    HomePageComponent,
    CarouselComponent,
    NavbarComponent,
    CategoryDetailsComponent,
    FouataDetailsComponent,
    SubmodelListComponent,
    SubmodelFoutaDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    CarouselModule,
    TagModule
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
