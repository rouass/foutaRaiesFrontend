import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevisFormComponent } from './devis-form/devis-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
// import { FouataDetailsComponent } from './fouata-details/fouata-details.component';
// import { SubmodelListComponent } from './submodel-list/submodel-list.component';
import { SubmodelFoutaDetailsComponent } from './submodel-fouta-details/submodel-fouta-details.component';

const routes: Routes = [
  { path: 'finalize-devis', component: DevisFormComponent },
  { path: '', component: HomePageComponent },
  { path: 'category-details/:name', component: CategoryDetailsComponent },
  // { path: 'fouta/:subcategoryName', component: FouataDetailsComponent },
  // { path: 'submodels/:subcategoryName', component: SubmodelListComponent }  ,
  { path: 'subcategory/:subcategoryName', component: SubmodelFoutaDetailsComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
