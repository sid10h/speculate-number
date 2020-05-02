import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NumberGuessComponent } from './number-guess/number-guess.component';


const routes: Routes = [
  {
    path: '',
    component: NumberGuessComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
