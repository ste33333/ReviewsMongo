import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';   
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  isLoading = true;
  error: string | null = null;
  searchTerm: string = '';

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.loadCars();
  }

 loadCars(): void {
    this.isLoading = true;
    this.error = null;
    this.carService.getCars(this.searchTerm.trim()).subscribe({ // Passa searchTerm a getCars
      next: (data) => {
        this.cars = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load cars. Please check API connection and CORS setup.';
        console.error('Error loading cars:', err);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    this.loadCars();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.loadCars();
  }

}