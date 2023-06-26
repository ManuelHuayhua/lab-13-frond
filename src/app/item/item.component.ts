import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../item.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items: any[] = [];
  currentItem: any = {};
  actionMessage: string = '';

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems()
      .subscribe((items) => {
        this.items = items;
      });
  }

  getItemById(id: string): void {
    this.itemService.getItemById(id)
      .subscribe((item) => {
        this.currentItem = item;
      });
  }

  createItem(itemForm: NgForm): void {
    if (itemForm.valid) {
      this.itemService.createItem(this.currentItem)
        .subscribe(() => {
          this.getItems();
          this.currentItem = {};
          itemForm.resetForm();
          this.actionMessage = 'Se realizo la accion correctamente';
        });
    } else {
      this.actionMessage = '------.';
    }
  }

  updateItem(id: string, item: any): void {
    this.itemService.updateItem(id, item)
      .subscribe(() => {
        this.getItems();
        this.currentItem = {};
        this.actionMessage = 'Se actualizo correctamente';
      });
  }

  deleteItem(id: string): void {
    this.itemService.deleteItem(id)
      .subscribe(() => {
        this.getItems();
        this.actionMessage = 'se elimino correctamente';
      });
  }

  editItem(id: string): void {
    this.getItemById(id);
  }
}