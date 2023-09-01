import {
  Component,
  OnInit,
  ElementRef,
  ViewChild, OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f',{static:false}) slaForm:NgForm;
subcription:Subscription
  editMode:boolean=false;
editedItemIndex:number;
editedItem:Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
   this.subcription= this.slService.startedEditing.
   subscribe((index:number) =>{
     this.editedItemIndex=index;
this.editMode=true;
this.editedItem=this.slService.getIngredient(index);
this.slaForm.setValue({
  name:this.editedItem.name,
  amount:this.editedItem.amount
})
   });
  }

  onSubmit(form:NgForm) {
const value=form.value
    const newIngredient = new Ingredient(value.name, value.amount);
if(this.editMode){
  this.slService.updateIngredient(this.editedItemIndex,newIngredient);
}else {
  this.slService.addIngredient(newIngredient);
}
this.editMode=false;
form.reset();
  }
  onClear(){
    this.slaForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
  this.subcription.unsubscribe();
  }

}
