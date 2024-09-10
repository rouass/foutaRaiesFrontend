import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fouta } from '../models/fouta.model';
import { SubModel } from '../models/submodel.model';

@Injectable({
  providedIn: 'root'
})
export class FoutaService {

  private apiUrl = 'http://localhost:4401/api/foutas';

  constructor(private http: HttpClient) { }


  getFoutasBySubcategoryName(subcategoryName: string): Observable<Fouta[]> {
    const encodedName = encodeURIComponent(subcategoryName);
    return this.http.get<Fouta[]>(`${this.apiUrl}/name/${encodedName}`);
  }

  getFoutaDetailsByName(name: string): Observable<Fouta> {
    return this.http.get<Fouta>(`${this.apiUrl}/name/${name}`);
  }
  getFoutas(subcategoryName: string): Observable<Fouta[]> {
    return this.http.get<Fouta[]>(`${this.apiUrl}/${subcategoryName}`);
  }

  getSubmodelsAndFoutaDetails(subcategoryName: string): Observable<{ fouta: Fouta; submodels: SubModel[] }> {
    return this.http.get<{ fouta: Fouta; submodels: SubModel[] }>(
      `${this.apiUrl}/submodels-and-fouta/${subcategoryName}`
    );
  }

  getFoutasByCategoryId(categoryId: string): Observable<Fouta[]> {
    return this.http.get<Fouta[]>(`${this.apiUrl}/by-category-id/${categoryId}`);
  }

  getSimilarFoutasByCategory(category: string, excludeFoutaId: string, excludeSubcategoryId?: string, excludeSubmodelId?: string): Observable<Fouta[]> {
  const encodedCategory = encodeURIComponent(category);
  let params = `?excludeFoutaId=${encodeURIComponent(excludeFoutaId)}`;
  if (excludeSubcategoryId) {
    params += `&excludeSubcategoryId=${encodeURIComponent(excludeSubcategoryId)}`;
  }
  if (excludeSubmodelId) {
    params += `&excludeSubmodelId=${encodeURIComponent(excludeSubmodelId)}`;
  }
  return this.http.get<Fouta[]>(`${this.apiUrl}/category/${encodedCategory}${params}`);
}

getFoutasByIds(ids: string[]): Observable<Fouta[]> {
  const idsString = ids.join(','); 
  return this.http.get<Fouta[]>(`${this.apiUrl}/ids/${idsString}`);
}

}
