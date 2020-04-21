import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import { NotFoundComponent } from "./404";
import { AuthGuard } from "./providers/auth.guard";

const routes: Routes = [
  {
    path: "auth",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/dashboard/dashboard.module").then(
        m => m.DashboardModule
      )
  },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
