import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.css']
})
export class InventoryManagementComponent implements OnInit {
  formControls=this.customerService.InventoryForm.controls;
  submitted:boolean;
  showSuccessMessage:boolean;
  constructor(private customerService:CustomerServiceService) { }

  itemArray=[];
  showUpdateMessage:boolean;
  ngOnInit() {
    this.customerService.getItems();
      
  }
  onSubmit(){
    
    this.submitted=true;
    if(this.customerService.InventoryForm.valid){
      if(this.customerService.InventoryForm.get("$itemkey").value==null){
        this.customerService.insertItem(this.customerService.InventoryForm.value);
      }
       else{
        this.customerService.updateItem(this.customerService.InventoryForm.value);
      } 
      
      this.showSuccessMessage=true;
      
      setTimeout(()=>
        this.showSuccessMessage=false,2000
      );
      this.submitted=false;
      this.customerService.InventoryForm.reset();
      this.customerService.InventoryForm.setValue({
        $itemkey: null,
        itemName: '',
        quantity: '',
        category: '',
        pricePerUnit: ''
      });

    }
  }
}
