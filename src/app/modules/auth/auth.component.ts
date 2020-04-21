import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../providers/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;

  @ViewChild("login") loginForm: NgForm;
  @ViewChild("signup") signupForm: NgForm;

  model: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin() {
    if (!this.loginForm.valid) {
      return console.log("Form is not valid");
    }
    this.isLoading = true;

    const email: string = this.loginForm.value.email;
    const password: string = this.loginForm.value.password;

    this.authService.signin(email, password).subscribe(
      res => {
        this.isLoading = false;
        this.loginForm.reset();
        this.router.navigate(["./dashboard"]);
      },
      error => {
        this.isLoading = false;
        if (error.error.error.hasOwnProperty("errors")) {
          alert(error.error.error.errors);
        } else {
          alert(error.error.error);
        }
      }
    );
  }

  onSignup() {
    if (!this.signupForm.valid) {
      return console.log("Form is not valid");
    }
    this.isLoading = true;

    const fullname: string = this.signupForm.value.fullname;
    const email: string = this.signupForm.value.email;
    const password: string = this.signupForm.value.password;
    const password_confirmation: string = this.signupForm.value
      .password_confirmation;

    this.authService
      .signup(fullname, email, password, password_confirmation)
      .subscribe(
        () => {
          this.isLoading = false;
          this.signupForm.reset();
          this.router.navigate(["./dashboard"]);
        },
        error => {
          this.isLoading = false;
          alert(error.error.error.message);
        }
      );
  }
}
