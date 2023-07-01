import { MomentsService } from 'src/app/services/moments.service';
import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { environment } from 'src/environments/environment';
import { faSearch, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = [];
  moment: Moment[] = [];
  public baseApiUrl = environment.baseApiUrl;
  public apiUrl = `${this.baseApiUrl}/`

  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private momentsService: MomentsService) {}
  ngOnInit(): void {
    this.momentsService.getMoments().subscribe((items) => {
      const data = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });
      this.allMoments = data;
      this.moment = data;
    });
  }
  search(e: Event): void  {

    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moment = this.allMoments.filter((moment) => {
      return moment.title.toLocaleLowerCase().includes(value)
    })
  }
}
