import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewnewsService } from '../../services/viewnews.service';

@Component({
  selector: 'app-viewnews',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './viewnews.component.html',
  styleUrl: './viewnews.component.css'
})
export class ViewnewsComponent {
  newsData: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private viewnewsService: ViewnewsService) { }

  ngOnInit(): void {
    this.fetchNewsData();
  }

  fetchNewsData(): void {
    this.isLoading = true;
    this.viewnewsService.getNewsData().subscribe(
      (data) => {
        this.newsData = data.results;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching news. Please try again later.';
        this.isLoading = false;
      }
    );
  }
}