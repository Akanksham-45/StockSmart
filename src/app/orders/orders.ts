
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  orders = [
    {
      id: 1001,
      product: 'Laptop',
      customer: 'Rahul Sharma',
      date: '2026-10-10',
      quantity: 2,
      amount: 110000,
      status: 'Delivered',
    },
    {
      id: 1002,
      product: 'Mouse',
      customer: 'Amit Verma',
      date: '2026-10-12',
      quantity: 5,
      amount: 2500,
      status: 'Pending',
    },
    {
      id: 1003,
      product: 'Keyboard',
      customer: 'Priya Singh',
      date: '2026-10-14',
      quantity: 3,
      amount: 4500,
      status: 'Processing',
    },
  ];

  getOrderCount(status: string): number {
    return this.orders.filter(order => order.status === status).length;
  }

}
