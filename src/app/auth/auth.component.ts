import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  @ViewChild("login") loginForm: NgForm;
  @ViewChild("signup") signupForm: NgForm;

  constructor() {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // onLogin(form: NgForm) {
  //   console.log("onLogin", form);
  // }

  onLogin() {
    console.log("onLogin", this.loginForm);
  }

  onSignup() {
    console.log("onSignup", this.signupForm);
  }
}
