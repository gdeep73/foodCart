import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private customerService:CustomerServiceService) { }
  customerArray=[];
  showUpdateMessage:boolean;
  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      list=>{
        this.customerArray=list.map(item=>{
          return{
            $key:item.key,
            ...item.payload.val()
          };
        });
    });
      
  }
  onDelete($key){
    if(confirm("Are you sure you want to delete")){
      this.customerService.deleteCustomer($key);
      this.showUpdateMessage=true;
      setTimeout(()=>
        this.showUpdateMessage=false,2000
      );
    }
  }

}
