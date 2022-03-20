import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Customer, IndexColumn, OperationColumn } from '@classes/.';
import { pageSizeOptions } from '@core/mat-paginator';
import { CColumn } from '@enums/.';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  get CColumn() { return CColumn; }
  get IndexColumn() { return IndexColumn; }
  get OperationColumn() { return OperationColumn; }
  get pageSizeOptions() { return pageSizeOptions; }

  readonly customerColumns = [this.IndexColumn, CColumn.name, CColumn.mobile, this.OperationColumn];

  ui = {
    loadingCustomers: false,
  };

  customerList = [] as Customer[];
  customerPage = new PageEvent();

  constructor() { }

  ngOnInit(): void {
  }

  showAddCustomer() {

  }

  editCustomer(index: number) {

  }

  onCustomerPage($event: PageEvent) {

  }

}
