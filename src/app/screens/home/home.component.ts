import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/mocks/offers.mock';
import { OffersService, SORT_BY, SORT_TYPE } from 'src/app/services/offers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  offers: Offer[];
  SORT_BY = SORT_BY;
  SORT_TYPE = SORT_TYPE;
  sortedBy: string;
  sortedType: string;

  constructor(private offersService: OffersService) { }

  ngOnInit() {
    this.updateOffers();
  }

  updateOffers(sortBy?: string): void {
    this.offersService.getOffers(sortBy).subscribe(response => {
      this.offers = response.offers;
      this.sortedBy = response.pagination.sortBy;
      this.sortedType = response.pagination.sortType;
    });
  }

  resolveSortClass(sortBy) {
    return {
      active: sortBy === this.sortedBy,
      'active-desc': (sortBy === this.sortedBy && this.sortedType === SORT_TYPE.DESC)
    };
  }
}
