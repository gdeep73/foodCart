import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';
import { CartService } from '../cart.service';
import * as _ from '../../../node_modules/lodash';
import{trigger,state,style,animate,transition} from '@angular/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations:[
    trigger('fadeInOut',[
      state('void',style({
        opacity:0,
        bottom:'0px'
      })),
      transition('void <=> *',animate(500))
    ])
  ]
})
export class ContactComponent implements OnInit {
  itemsArray=[];
  Order=[];
  totalAmount=[];
  show:boolean=false;
  message:string;
  OrderSaved:boolean=false;
  Orderno:string;
  constructor(private customerService:CustomerServiceService,private cartService:CartService) { }

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
    this.Order=this.cartService.getCart();
    this.totalAmount=this.cartService.getTotal();
  }
  addToCart(item){
    this.cartService.addToCart(item);
    this.message=item.itemName+" has been added to cart"
    this.show=true;
    setTimeout(()=>{
      this.show=false;
    },1000);
  }
  removeFromCart(food){
    this.cartService.removeFromCart(food);
  }
  isInCart(food){
    let exists= _.find(this.Order,function(obj){
       return obj.id==food.$itemkey;     
       
     });
     if(exists!=null){
       return true;
     }
     else{
       return false;
     }
   }
   confirmOrder(){
     let key=this.customerService.insertOrder(this.Order,this.totalAmount[0]);
     this.Orderno=key;
    this.OrderSaved=true;    
   }
   hideBox(){
     this.OrderSaved=false;
     this.Order=[];
     this.totalAmount[0]=0;
   }

}
