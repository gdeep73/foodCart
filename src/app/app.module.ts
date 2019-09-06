import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import{ AngularFireModule} from 'angularfire2';
import{ AngularFireDatabaseModule} from 'angularfire2/database';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SummaryComponent } from './summary/summary.component';
import { TopbarComponent } from './topbar/topbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './products.service';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerServiceService } from './customer-service.service';
import {ReactiveFormsModule} from '@angular/forms';
import { environment} from '../environments/environment';
import { InventoryManagementComponent } from './inventory-management/inventory-management.component';
import { InventorylistComponent } from './inventorylist/inventorylist.component';
import { CartService } from './cart.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    InventoryComponent,
    SummaryComponent,
    TopbarComponent,
    CustomerComponent,
    CustomerListComponent,
    InventoryManagementComponent,
    InventorylistComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [ProductsService,
  CustomerServiceService,CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
