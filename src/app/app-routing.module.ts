import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthComponent } from "./auth/auth.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "auth",
    canActivate: [AuthGuard],
    component: AuthComponent
  },
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
