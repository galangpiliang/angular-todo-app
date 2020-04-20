import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [FormsModule, CommonModule],
  exports: [LoadingSpinnerComponent, FormsModule, CommonModule]
})
export class SharedModule {}
