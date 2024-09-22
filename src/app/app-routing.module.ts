import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevisFormComponent } from './devis-form/devis-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { SubmodelFoutaDetailsComponent } from './submodel-fouta-details/submodel-fouta-details.component';
import { AddSubcategoryComponent } from './admin/add-subcategory/add-subcategory.component';
import { AddSubmodelComponent } from './admin/add-submodel/add-submodel.component';
import { AddFoutaComponent } from './admin/add-fouta/add-fouta.component';
import { LoginComponent } from './authentification/login/login.component';
import { ListDevisComponent } from './admin/list-devis/list-devis.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'finalize-devis', component: DevisFormComponent },
  { path: '', component: HomePageComponent },
  { path: 'category-details/:name', component: CategoryDetailsComponent },
  { path: 'addsubcategory', component: AddSubcategoryComponent },
  { path: 'addsubmodel', component: AddSubmodelComponent  },
  { path: 'addfouta', component: AddFoutaComponent  },
  { path: 'products/:categoryName/:subcategoryName', component: SubmodelFoutaDetailsComponent,},
  { path: 'loginA', component: LoginComponent },  // Admin login route
  { path: 'listDevisA', component: ListDevisComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
