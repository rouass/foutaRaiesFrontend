import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubModel } from '../models/submodel.model';

@Injectable({
  providedIn: 'root'
})
export class SubmodelService {
  private apiUrl = 'http://193.70.36.57:8001/api/submodels';

  constructor(private http: HttpClient) {}

  //submodelFoutaDetails
  getSubmodelsBySubcategoryId(subcategoryId: string): Observable<SubModel[]> {
    return this.http.get<SubModel[]>(`${this.apiUrl}/id/${subcategoryId}`);
 }
 addSubmodel(submodel: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/add`, submodel);
}
}
