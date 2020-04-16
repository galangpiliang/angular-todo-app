import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  private userSub: Subscription;

  isLoading: boolean = false;
  dataTasks = null;
  dataUser = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    console.log("ngOnInit");
    this.isLoading = true;
    this.userSub = this.authService.user.subscribe(user => {
      if (!user) {
        this.router.navigate(["./auth"]);
      } else {
        this.dataUser = user;
        this.dataStorageService.fetchTasks(user.token).subscribe(
          res => {
            console.log(res, res.data.docs);
            this.dataTasks = res.data.docs;
            this.isLoading = false;
          },
          error => {
            console.log(error);
            this.isLoading = false;
          }
        );
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
