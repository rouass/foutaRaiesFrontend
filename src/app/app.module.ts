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
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CarouselComponent } from './carousel/carousel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { SubmodelFoutaDetailsComponent } from './submodel-fouta-details/submodel-fouta-details.component';
import { AddSubcategoryComponent } from './admin/add-subcategory/add-subcategory.component';
import { AddSubmodelComponent } from './admin/add-submodel/add-submodel.component';
import { AddFoutaComponent } from './admin/add-fouta/add-fouta.component';
import { FooterComponent } from './components/navbar/footer/footer.component';
import { LoginComponent } from './authentification/login/login.component';
import { ListDevisComponent } from './admin/list-devis/list-devis.component';
import { HhComponent } from './hh/hh.component';
@NgModule({
  declarations: [
    AppComponent,
    FoutaGategoriesComponent,
    DevisFormComponent,
    HomePageComponent,
    CarouselComponent,
    NavbarComponent,
    CategoryDetailsComponent,
    SubmodelFoutaDetailsComponent,
    AddSubcategoryComponent,
    AddSubmodelComponent,
    AddFoutaComponent,
    FooterComponent,
    LoginComponent,
    ListDevisComponent,
    HhComponent,
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
    TagModule,
    ProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
