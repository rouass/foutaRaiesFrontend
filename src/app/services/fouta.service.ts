import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fouta } from '../models/fouta.model';
import { SubModel } from '../models/submodel.model';
import { Subcategory } from '../models/subcategory.model';

@Injectable({
  providedIn: 'root'
})
export class FoutaService {

  private apiUrl = 'http://193.70.36.57:8001/api/foutas';

  constructor(private http: HttpClient) { }

  //submodelFoutaDetails
  getSimilarSubcategoriesByCategory(categoryName: string, excludeFoutaId: string,  excludeSubmodelId?: string): Observable<Subcategory[]> {
    let params = new HttpParams()
      .set('excludeFoutaId', excludeFoutaId)

    if (excludeSubmodelId) {
      params = params.set('excludeSubmodelId', excludeSubmodelId);
    }

    return this.http.get<Subcategory[]>(`http://193.70.36.57:8001/api/foutas/category/${categoryName}`, { params });
  }

//devisForm

getFoutasByIds(ids: string[]): Observable<Fouta[]> {
  const idsString = ids.join(',');
  return this.http.get<Fouta[]>(`${this.apiUrl}/ids/${idsString}`);
}

addFouta(fouta: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/add`, fouta);
}



//submodelFouta
getFoutasByCategoryAndSubcategoryName(categoryName: string, subcategoryName: string): Observable<{ foutas: Fouta[], submodels: SubModel[] }> {
  return this.http.get<{ foutas: Fouta[], submodels: SubModel[] }>(`${this.apiUrl}/submodels-and-fouta/${categoryName}/${subcategoryName}`);
}


}
