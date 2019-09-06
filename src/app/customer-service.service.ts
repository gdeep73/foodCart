import { Injectable } from '@angular/core';
import { FormControl,FormGroup,Validator, Validators } from '@angular/forms';
import{ AngularFireDatabase,AngularFireList} from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private firebase:AngularFireDatabase) { }
  customerList:AngularFireList<any>;
  OrderList:AngularFireList<any>;
  itemList:AngularFireList<any>;
  form=new FormGroup({
    $key:new FormControl(null),
    fullName:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    mobile:new FormControl('',[Validators.required,Validators.minLength(8)]),
    location:new FormControl('')
  });
  InventoryForm=new FormGroup({
    $itemkey:new FormControl(null),
    itemName:new FormControl('',Validators.required),
    quantity:new FormControl('',[Validators.required,Validators.maxLength(3)]),
    category:new FormControl('',[Validators.required]),
    pricePerUnit:new FormControl('',[Validators.pattern(/^\d{0,8}(\.\d{1,4})?$/)])
  });
  getCustomers(){
    this.customerList=this.firebase.list('customers');
    return this.customerList.snapshotChanges();
  }
  getItems(){
    this.itemList=this.firebase.list('items');
    return this.itemList.snapshotChanges();
  }
  insertCustomer(customer){
    let refObj= this.customerList.push({
      fullName:customer.fullName,
      email:customer.email,
      mobile:customer.mobile,
      location:customer.location
    });
    
  }
  insertOrder(Order,amount){
    this.OrderList=this.firebase.list("Order");
    let refObj=this.OrderList.push({
      order:Order,
      Total:amount
    });
    return refObj.key;

  }
  insertItem(item){
    let refObj=this.itemList.push({
      itemName:item.itemName,
      category:item.category,
      quantity:item.quantity,
      pricePerUnit:item.pricePerUnit
    });
    
  }
  populateForm(customer){
    this.form.setValue(customer);
  }
  populateItemForm(item){
    this.InventoryForm.setValue(item);
  }
  updateCustomer(customer){
    this.customerList.update(customer.$key,{
      fullName:customer.fullName,
      mobile:customer.mobile,
      email:customer.email,
      location:customer.location
    })
  }
  updateItem(item){
    this.itemList.update(item.$itemkey,{
      itemName:item.itemName,
      quantity:item.quantity,
      category:item.category,
      pricePerUnit:item.pricePerUnit
    })
  }

  deleteCustomer($key:string){
    this.customerList.remove($key);
  }
  deleteItem($itemkey:string){
    this.itemList.remove($itemkey);
  }
}
