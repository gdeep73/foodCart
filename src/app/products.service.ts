import { Injectable } from '@angular/core';
import {SampleData} from '../app/MockData';
import * as _ from '../../node_modules/lodash';
import {HttpClient, HttpHeaders} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private foodList=SampleData;
  private Order=[];
  private foodOrder=[];
  private total=[];
  private foodTotal=[];
  constructor() { 
    this.total.push(0);
    this.foodTotal.push(0);
  }
  getData(){
    return this.foodList;
  }
  
  addToCart(food:any){
    this.total[0]+=food.foodPrice;
    let tempFood=_.find(this.Order,function(obj){
      if(obj.id===food.foodId){
        obj.Quantity++;
        obj.Amount=obj.Quantity*food.foodPrice;        
        return true;
      }
    });
    if(!tempFood){
      this.Order.push({
        "name":food.foodName,
        "id":food.foodId,
        "Quantity":1,
        "Amount":food.foodPrice
      });
    }
  }
  addFoodToCart(food:any){
    this.foodTotal[0]+=food.pricePerUnit;
    let tempFood=_.find(this.foodOrder,function(obj){
      if(obj.itemkey===food.itemkey){
        obj.Quantity++;
        obj.Amount=obj.Quantity*food.pricePerUnit;        
        return true;
      }
    });
    if(!tempFood){
      this.Order.push({
        "name":food.foodName,
        "itemkey":food.itemkey,
        "Quantity":1,
        "Amount":food.pricePerUnit
      });
    }
  }


  removeFromCart(food){
    this.total[0]-=food.foodPrice;
    let Ord=this.Order;
    let tempFood=_.find(this.Order,function(obj){
      if(obj.id===food.foodId){
        if(obj.Quantity==1){
          _.remove(Ord,function(Cobj){
              return Cobj.id==food.foodId;
          });          
        }
        else{
          obj.Quantity--;
          obj.Amount=obj.Quantity*food.foodPrice;
        }        
        return true;
      }
    });
    
  }
  
  getCart(){
    return this.Order;
  }
  getFoodCart(){
    return this.foodOrder;
  }
  getTotal(){
    return this.total;
  }

}
