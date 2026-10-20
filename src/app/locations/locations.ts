import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-locations',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './locations.html',
  styleUrl: './locations.css',
})
export class Locations {
  locations = [
    {
      id: 1,
      name: 'Main Warehouse',
      address: 'Ghaziabad, Uttar Pradesh',
      manager: 'Admin',
      products: 8,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Storage Unit A',
      address: 'Delhi, India',
      manager: 'Warehouse Staff',
      products: 0,
      status: 'Active',
    },
  ];
}
