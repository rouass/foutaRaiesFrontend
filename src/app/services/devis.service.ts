import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Devis } from '../models/devis.model';

@Injectable({
  providedIn: 'root',
})
export class DevisService {
  private apiUrl = 'http://localhost:4401/api/devis';
  devisItems: any[] = []; 

  constructor(private http: HttpClient) {}

  submitDevis(devis: Devis): Observable<Devis> {
    return this.http.post<Devis>(this.apiUrl, devis);
  }

}
