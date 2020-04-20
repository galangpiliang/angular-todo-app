import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";
import {
  faTrash,
  faEdit,
  faStar,
  faCheck,
  faDotCircle as farCircle
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  private userSub: Subscription;

  isLoading: boolean = false;
  singleLoading: string = null;
  dataTasks = [];
  dataPagination = {
    totalPages: 1,
    page: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
  };
  dataUser = null;

  faTrash = faTrash;
  faEdit = faEdit;
  faStar = faStar;
  farStar = farStar;
  faCheck = faCheck;
  farCircle = farCircle;

  @ViewChild("addTaskForm") addTaskForm: NgForm;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  // UserData Action
  doLogout() {
    this.authService.signout();
    this.router.navigate(["./auth"]);
  }

  doUpdateProfile(form: NgForm) {
    console.log(form);
    const data = {
      fullname: form.value.fullname,
      email: form.value.email
    };
    this.isLoading = true;
    this.authService.updateUser(data).subscribe(
      res => {
        console.log(res);
        this.isLoading = false;
        alert("Your data has been updated, please relogin!");
        this.doLogout();
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  doUploadPicture(form: NgForm) {
    const data = new FormData();
    data.append("image", this.fileInput);
    this.isLoading = true;
    this.authService.updateUser(data).subscribe(
      res => {
        console.log(res);
        this.isLoading = false;
        alert("Your data has been updated, please relogin!");
        this.doLogout();
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }
  // End UserData Action

  // Tasks Action
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

  doCompleteTask(task) {
    const updatedTask = {
      _id: task._id,
      completion: !task.completion
    };
    this.updateTask(updatedTask);
  }

  doImportanceTask(task) {
    const updatedTask = {
      _id: task._id,
      importanceLevel: task.importanceLevel === 1 ? 3 : 1
    };
    this.updateTask(updatedTask);
  }

  doUpdateTask(task) {
    const updatedTask = {
      _id: task._id,
      title: this.input[task._id]
    };
    this.updateTask(updatedTask);
    // fired toggle again
    this.toggle = {
      [task._id]: !this.toggle[task._id]
    };
  }

  updateTask(task) {
    this.singleLoading = task._id;
    this.dataStorageService.updateTask(task).subscribe(
      res => {
        this.singleLoading = null;
        console.log(res);
        // update local state data
        let index = this.dataTasks.findIndex(item => item._id === task._id);
        this.dataTasks[index] = res.data;
      },
      error => {
        console.log(error);
        this.singleLoading = null;
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

  getAllTask(page) {
    this.isLoading = true;
    this.dataStorageService.getTasks(page).subscribe(
      res => {
        console.log(res, res.data.docs);
        this.dataTasks = res.data.docs;
        delete res.data.docs;
        this.dataPagination = res.data;
        this.isLoading = false;
        console.log(this.dataPagination);
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }
  // End Tasks Action

  // Angular Life Cycle
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.dataUser = user;
      this.getAllTask(1);
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  // End Angular Life Cycle

  // Component Interaction
  toggle: any = {};
  input: any = {};
  doToggle(input) {
    typeof input === "string"
      ? (this.toggle = {
          [input]: !this.toggle[input]
        })
      : (this.toggle = {
          [input._id]: !this.toggle[input._id]
        });
    this.input = {
      [input._id]: input.title
    };
    console.log(this.input[input._id]);
  }

  fileInput: File;
  fileInputHandler(event) {
    this.fileInput = event.target.files[0];
  }
  // End Component Interaction
}
