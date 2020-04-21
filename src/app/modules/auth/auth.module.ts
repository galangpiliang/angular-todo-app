import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MustMatchDirective } from "../../providers/_helpers/must-match.directive";
import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [AuthComponent, MustMatchDirective],
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AuthComponent
      }
    ]),
    SharedModule
  ]
})
export class AuthModule {}
