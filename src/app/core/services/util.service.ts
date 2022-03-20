import { PageEvent } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getRange(pageEvent: PageEvent): { from: number, to: number } {
    return {
      from: pageEvent.pageIndex * pageEvent.pageSize,
      to: (pageEvent.pageIndex + 1) * pageEvent.pageSize - 1
    };
  }
}
