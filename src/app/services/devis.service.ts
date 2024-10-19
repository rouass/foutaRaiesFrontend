import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Devis } from '../models/devis.model';

@Injectable({
  providedIn: 'root',
})
export class DevisService {
  private apiUrl = 'http://193.70.36.57:8001/api/devis';
  devisItems: any[] = [];

  constructor(private http: HttpClient) {}

  // Method to retrieve token from localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem('token');  // Ensure 'token' is stored in localStorage after login
  }

  // Submit a devis
  submitDevis(devis: Devis): Observable<Devis> {
    return this.http.post<Devis>(this.apiUrl, devis);
  }

  // Get all devis for admin
  getAllDevis(): Observable<any> {
    const token = this.getAuthToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,  // Add token to Authorization header
    });
    return this.http.get<{ message: string; devis: Devis[] }>(`${this.apiUrl}/list-devis`, { headers });
  }

  downloadPDF(devisId: string): Observable<Blob> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/download-pdf/${devisId}`, {
      headers,
      responseType: 'blob' // We want to receive the response as a Blob (PDF file)
    });
  }

  deleteDevis(devisId: string): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Add token to Authorization header
    });
    return this.http.delete(`${this.apiUrl}/${devisId}`, { headers });
  }


}
