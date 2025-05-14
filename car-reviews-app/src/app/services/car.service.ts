import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = `${environment.apiBaseUrl}/api/Cars`;

  constructor(private http: HttpClient) { }

  getCars(model?: string): Observable<Car[]> { 
    let params = new HttpParams();
    if (model) {
      params = params.append('model', model); 
    }
    return this.http.get<Car[]>(this.apiUrl, { params }); 
  }

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`);
  }
}