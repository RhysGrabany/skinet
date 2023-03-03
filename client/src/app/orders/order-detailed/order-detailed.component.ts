import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {

  order?: Order;

  constructor(private orderService: OrdersService, private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService) {
    this.bcService.set('@orderDetailed', ' ')
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    id && this.orderService.getOrderById(+id).subscribe({
      next: order => {
        this.order = order;
        this.bcService.set('@orderDetailed', `Order #${order.id} - ${order.status}`);
      }
    })
  }


}
