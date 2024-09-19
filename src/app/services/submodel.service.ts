import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubModel } from '../models/submodel.model';

@Injectable({
  providedIn: 'root'
})
export class SubmodelService {
  private apiUrl = 'http://localhost:4401/api/submodels';

  constructor(private http: HttpClient) {}

  //submodelFoutaDetails
  getSubmodelsBySubcategoryId(subcategoryId: string): Observable<SubModel[]> {
    return this.http.get<SubModel[]>(`${this.apiUrl}/id/${subcategoryId}`);
 }
//  getSubmodelsBySubcategoryId(subcategoryId: string, excludeSubcategoryId?: string): Observable<SubModel[]> {
//   let params = new HttpParams();
//   if (excludeSubcategoryId) {
//     params = params.set('excludeSubcategoryId', excludeSubcategoryId);
//   }
//   return this.http.get<SubModel[]>(`${this.apiUrl}/id/${subcategoryId}`, { params });
// }


 addSubmodel(submodel: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/add`, submodel);
}
}
