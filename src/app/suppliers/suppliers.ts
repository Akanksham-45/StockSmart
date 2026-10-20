
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-suppliers',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.css',
})
export class Suppliers {
  suppliers = [
    {
      id: 1,
      name: 'Tech Solutions Pvt. Ltd.',
      contact: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '9876543210',
      products: 4,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Global Electronics',
      contact: 'Amit Verma',
      email: 'amit@example.com',
      phone: '9876501234',
      products: 3,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Office Supplies Co.',
      contact: 'Priya Singh',
      email: 'priya@example.com',
      phone: '9876512340',
      products: 1,
      status: 'Active',
    },
  ];
}
