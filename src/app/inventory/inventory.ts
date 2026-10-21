import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  selector: 'app-inventory',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory implements OnInit {
  products: Product[] = [];
  loading = true;
  errorMessage = '';

  searchText = '';
  selectedStatus = 'All';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}
  get filteredProducts(): Product[] {
    return this.products.filter((product) => {
      const search = this.searchText.toLowerCase().trim();

      const matchesSearch =
        product.name.toLowerCase().includes(search) ||
        (product.category ?? '').toLowerCase().includes(search) ||
        (product.sku ?? '').toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        this.getStockStatus(product.quantity) === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }
  ngOnInit(): void {
    this.http.get<Product[]>('https://stocksmart-b93f.onrender.com/products').subscribe({
      next: (data) => {
        console.log('Inventory API products:', data);
        this.products = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Inventory API error:', error);
        this.errorMessage =
          'Unable to load inventory. Please check whether the backend is running.';
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
      (product) =>
        Number(product.quantity) > 0 &&
        Number(product.quantity) <= 5
    ).length;
  }

  get outOfStockCount(): number {
    return this.products.filter(
      (product) => Number(product.quantity) <= 0
    ).length;
  }

  getStockStatus(quantity: number): string {
    if (Number(quantity) <= 0) return 'Out of Stock';
    if (Number(quantity) <= 5) return 'Low Stock';
    return 'In Stock';
  }
}
