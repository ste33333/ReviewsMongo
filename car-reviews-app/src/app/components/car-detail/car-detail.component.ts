import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { Car } from '../../models/car.model';
import { Review } from '../../models/review.model';
import { CarService } from '../../services/car.service';
import { ReviewService } from '../../services/review.service';
import { ReviewFormComponent } from '../review-form/review-form.component';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReviewFormComponent
  ],
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carIdFromRoute: string | null = null;

  car: Car | null = null;
  reviews: Review[] = [];
  isLoadingCar = true;
  isLoadingReviews = true;
  carError: string | null = null;
  reviewsError: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private carService: CarService,
    private reviewService: ReviewService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Leggiamo l'ID dalla rotta usando ActivatedRoute
    this.carIdFromRoute = this.route.snapshot.paramMap.get('id'); 

    if (this.carIdFromRoute) {
      this.loadCarDetails(this.carIdFromRoute);
      this.loadReviews(this.carIdFromRoute);
    } else {
      this.carError = "Car ID not found in the URL/route parameters.";
      console.error(this.carError);
      this.isLoadingCar = false; 
      this.isLoadingReviews = false;
    }
  }

  loadCarDetails(id: string): void {
    this.isLoadingCar = true;
    this.carError = null;
    this.carService.getCarById(id).subscribe({
      next: (data) => {
        this.car = data;
        this.isLoadingCar = false;
      },
      error: (err) => {
        if (err.status === 404) {
         this.carError = `Car with ID '${id}' not found. Please ensure the ID is correct.`;
        } else {
         this.carError = `Failed to load car details. API might be down or CORS issue. Status: ${err.status}`;
        }
        console.error('Error loading car details:', err);
        this.isLoadingCar = false;
      }
    });
  }

  loadReviews(carId: string): void {
    this.isLoadingReviews = true;
    this.reviewsError = null;
    this.reviewService.getReviewsForCar(carId).subscribe({
      next: (data) => {
        this.reviews = data.sort((a, b) => new Date(b.datePosted!).getTime() - new Date(a.datePosted!).getTime());
        this.isLoadingReviews = false;
      },
      error: (err) => {
        this.reviewsError = 'Failed to load reviews.';
        console.error('Error loading reviews:', err);
        this.isLoadingReviews = false;
      }
    });
  }

  onReviewSubmitted(newReview: Review): void {
    if (this.carIdFromRoute) { 
      this.loadReviews(this.carIdFromRoute);
    }
  }

  goBack(): void {
     this.router.navigate(['/cars']);
  }
}