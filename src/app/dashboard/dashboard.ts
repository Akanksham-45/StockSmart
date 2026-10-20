
import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  sku?: string;
  barcode?: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  products: Product[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Dashboard component loaded');

    this.http
      .get<Product[]>('http://localhost:8083/products')
      .subscribe({
        next: (data) => {
          console.log('Dashboard API products:', data);
          this.products = data;
          this.loading = false;
          this.cdr.detectChanges();
          console.log('Dashboard updated:', this.products.length, this.loading);
        },
        error: (error) => {
          console.error('Dashboard products error:', error);
          this.errorMessage = 'Unable to load product data.';
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
  }

  get totalProducts(): number {
    return this.products.length;
  }

  get totalStock(): number {
    return this.products.reduce(
      (total, product) => total + Number(product.quantity || 0),
      0
    );
  }

  get lowStockCount(): number {
    return this.products.filter(
      (product) => Number(product.quantity) <= 5
    ).length;
  }

  get totalInventoryValue(): number {
    return this.products.reduce(
      (total, product) =>
        total +
        Number(product.price || 0) * Number(product.quantity || 0),
      0
    );
  }
}
