import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';

@Component({
  selector: 'app-inventorylist',
  templateUrl: './inventorylist.component.html',
  styleUrls: ['./inventorylist.component.css']
})
export class InventorylistComponent implements OnInit {

  constructor(private customerService:CustomerServiceService) { }
  itemsArray=[];
  showUpdateMessage:boolean;
  ngOnInit() {
    this.customerService.getItems().subscribe(
      list=>{
        this.itemsArray=list.map(item=>{
          return{
            $itemkey:item.key,
            ...item.payload.val()
          };
        });
    });
      
  }
  onDelete($key){
    if(confirm("Are you sure you want to delete")){
      this.customerService.deleteItem($key);
      this.showUpdateMessage=true;
      setTimeout(()=>
        this.showUpdateMessage=false,2000
      );
    }
  }


}
