import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { CustomerComponent } from './customer/customer.component';
import { InventoryManagementComponent } from './inventory-management/inventory-management.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [{
  path:"",component:HomeComponent
},{
  path:"Home",component:HomeComponent
},{
  path:"Inventory",component:InventoryComponent
},{
  path:"Customer",component:CustomerComponent
},{
  path:"InventoryManagement",component:InventoryManagementComponent
},{
  path:"Contact",component:ContactComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
