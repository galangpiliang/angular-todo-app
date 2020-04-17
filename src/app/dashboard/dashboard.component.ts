import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
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
  singleLoading: string = null;
  dataTasks = null;
  dataUser = null;

  @ViewChild("addTaskForm") addTaskForm: NgForm;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  doLogout() {
    this.authService.signout();
    this.router.navigate(["./auth"]);
  }

  doAddTask() {
    if (!this.addTaskForm.valid) {
      return console.log("Form is not valid");
    }
    this.isLoading = true;

    this.dataStorageService.addTask(this.addTaskForm.value.task).subscribe(
      newTask => {
        this.dataTasks.unshift(newTask.data);
        this.isLoading = false;
        this.addTaskForm.reset();
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  doDeleteTask(id) {
    this.singleLoading = id;

    this.dataStorageService.deleteTask(id).subscribe(
      () => {
        let filter = this.dataTasks.filter(task => {
          return task._id !== id;
        });
        this.dataTasks = filter;
        this.singleLoading = null;
      },
      error => {
        console.log(error);
        this.singleLoading = null;
      }
    );
  }

  getAllTask() {
    this.isLoading = true;
    this.dataStorageService.fetchTasks().subscribe(
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

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.dataUser = user;
      this.getAllTask();
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
