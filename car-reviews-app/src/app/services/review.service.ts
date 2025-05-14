import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${environment.apiBaseUrl}/api/Reviews`;

  constructor(private http: HttpClient) { }

  getReviewsForCar(carId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/car/${carId}`);
  }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }
}