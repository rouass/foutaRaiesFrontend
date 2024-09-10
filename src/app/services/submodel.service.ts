import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubModel } from '../models/submodel.model';

@Injectable({
  providedIn: 'root'
})
export class SubmodelService {
  private apiUrl = 'http://localhost:4401/api/submodels';

  constructor(private http: HttpClient) {}
  getSubModels(subcategoryName: string): Observable<SubModel[]> {
    return this.http.get<SubModel[]>(`${this.apiUrl}/${subcategoryName}`);
  }
  getSubmodelsBySubcategoryName(subcategoryName: string): Observable<SubModel[]> {
    return this.http.get<SubModel[]>(`${this.apiUrl}/name/${encodeURIComponent(subcategoryName)}`);
  }
  getSubmodelsBySubcategoryId(subcategoryId: string): Observable<SubModel[]> {
    return this.http.get<SubModel[]>(`${this.apiUrl}/id/${subcategoryId}`);
 }

}
