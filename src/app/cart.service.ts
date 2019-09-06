import { Injectable } from '@angular/core';
import {find,remove} from '../../node_modules/lodash';

@Injectable({
  providedIn: 'root'
})
export class CartService {  
  private Order=[];  
  private total=[];
  
  constructor() { 
    this.total.push(0);
  }
  addToCart(food:any){
    
    this.total[0]+=Number(food.pricePerUnit);
    let tempFood=find(this.Order,function(obj){
      if(obj.id===food.$itemkey){
        obj.Quantity++;
        obj.Amount=obj.Quantity*Number(food.pricePerUnit);        
        return true;
      }
    });
    if(!tempFood){
      this.Order.push({
        "name":food.itemName,
        "id":food.$itemkey,
        "Quantity":1,
        "Amount":food.pricePerUnit
      });
    }
  }
  removeFromCart(food){       
    let Ord=this.Order;
    let amt=this.total;
    let tempFood=find(this.Order,function(obj){
      if(obj.id===food.$itemkey){
        if(obj.Quantity==1){          
          amt[0]-=Number(food.pricePerUnit);
          remove(Ord,function(Cobj){
              return Cobj.id==food.$itemkey;
          });           
        }
        else{                    
          amt[0]-=Number(food.pricePerUnit);
          obj.Quantity--;
          obj.Amount=obj.Quantity*Number(food.pricePerUnit);
        }        
        return true;
      }
    });
    
  }
  getTotal(){
    return this.total;
  }
  getCart(){
    return this.Order;
  }
}
