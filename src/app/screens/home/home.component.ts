import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Offer } from 'src/app/models/offer.model';
import { OffersService, SORT_BY, SORT_TYPE } from 'src/app/services/offers.service';
import { OfferModalComponent } from 'src/app/components/offer-modal/offer-modal.component';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { OrderConfirmation } from 'src/app/models/order.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  offers: Offer[];
  SORT_BY = SORT_BY;
  SORT_TYPE = SORT_TYPE;
  sortedBy: string;
  sortedType: string;
  customConfirmationModalText: string;
  @ViewChild('offerModal', { static: false }) private offerModal: OfferModalComponent;
  @ViewChild('confirmationModal', { static: false }) private confirmationModal: ConfirmationModalComponent;

  constructor(private offersService: OffersService, private loadingService: SpinnerService) {}

  ngOnInit() {
    this.updateOffers();
  }

  ngAfterViewInit() {
    this.offerModal.confirmOrderEvent.subscribe((couponConfirmation: OrderConfirmation) => {
      if (couponConfirmation.confirm) {
        this.loadingService.showLoading(true);
        setTimeout(() => {
          this.loadingService.showLoading(false);
          const defaultSuccessMessage =
            'Tu pedido ha sido confirmado, te mantendremos informado ante nuevas novedades';
          this.customConfirmationModalText =
            (couponConfirmation.coupon &&
              `El cupón ${couponConfirmation.coupon} ha sido utilizado con éxito. ${defaultSuccessMessage}`) ||
            defaultSuccessMessage;
          this.confirmationModal.open();
        }, 2000);
      }
    });
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
      'active-desc': sortBy === this.sortedBy && this.sortedType !== SORT_TYPE.DESC
    };
  }

  openOfferModal(offer: Offer) {
    this.offerModal.open(offer);
  }
}
