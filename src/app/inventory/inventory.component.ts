import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { HttpClient } from '@angular/common/http';
import * as _ from '../../../node_modules/lodash';
import {  trigger,  state,  style,  animate,  transition} from '@angular/animations';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  animations:[
    trigger("ShowHide",[
      state("show",style({
        display:'block'
      })),
      state("hide",style({
        display:'none'
      })),
      transition("* <=> *",[
        animate("0.5s")
      ])
    ])
  ]
})
export class InventoryComponent implements OnInit {
  dummyData:any;
  private Order=[];
  private CartObject={};
  private totalAmount=[];
  imageURL="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80";
  constructor(private service:ProductsService,private http:HttpClient) { }

  ngOnInit() {
    this.dummyData=this.service.getData();
    this.Order=this.service.getCart();
    this.totalAmount=this.service.getTotal();
  }
  addToCart(food:any){
    this.service.addToCart(food);    
  }
  getCart(){
    this.Order= this.service.getCart();
  }

  removeFromCart(food){
    this.service.removeFromCart(food);
  }
  isInCart(food){
    let exists= _.find(this.Order,function(obj){
       return obj.id==food.foodId;     
       
     });
     if(exists!=null){
       return true;
     }
     else{
       return false;
     }
   }
}
