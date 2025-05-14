import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { Review } from '../../models/review.model';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule 
  ],
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  @Input() carId!: string;
  @Output() reviewSubmitted = new EventEmitter<Review>();

  reviewForm!: FormGroup;
  isSubmitting = false;
  submitError: string | null = null;
  submitSuccess: string | null = null;
  ratingOptions: number[] = [5, 4, 3, 2, 1]; 

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      reviewerName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      rating: [null, [Validators.required]], 
      comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  // Getters per un accesso più facile nel template 
  get reviewerName() { return this.reviewForm.get('reviewerName'); }
  get rating() { return this.reviewForm.get('rating'); }
  get comment() { return this.reviewForm.get('comment'); }

  onSubmit(): void {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched(); 
      return;
    }

    this.isSubmitting = true;
    this.submitError = null;
    this.submitSuccess = null;

    const newReviewData: Review = {
      carId: this.carId,
      reviewerName: this.reviewerName?.value.trim(),
      rating: parseInt(this.rating?.value, 10), // Assicurati che sia un numero
      comment: this.comment?.value.trim()
      // id e datePosted saranno gestiti dal backend
    };

    this.reviewService.addReview(newReviewData).subscribe({
      next: (submittedReview) => {
        this.isSubmitting = false;
        this.submitSuccess = 'Review submitted successfully!';
        this.reviewSubmitted.emit(submittedReview); 
        this.reviewForm.reset(); 

        // Resetta lo stato di validazione per ogni controllo
        Object.keys(this.reviewForm.controls).forEach(key => {
         const control = this.reviewForm.get(key);
         control?.setErrors(null) ;
         control?.markAsPristine();
         control?.markAsUntouched();
        });
        

        setTimeout(() => this.submitSuccess = null, 3000); 
      },
      error: (err) => {
        this.isSubmitting = false;
        this.submitError = 'Failed to submit review. Please try again later.';
        console.error('Error submitting review:', err);
        setTimeout(() => this.submitError = null, 5000); 
      }
    });
  }
}