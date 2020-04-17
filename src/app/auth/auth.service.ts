import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "./user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  baseUrl: string = "https://awesome-project-glints.herokuapp.com/api/v1";

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signup(
    fullname: string,
    email: string,
    password: string,
    password_confirmation: string
  ) {
    return this.http
      .post<any>(this.baseUrl + "/users", {
        fullname,
        email,
        password,
        password_confirmation
      })
      .pipe(
        tap(resData => {
          resData = resData.data;
          this.handleAuthentication(
            resData.id,
            resData.fullname,
            resData.email,
            resData.image,
            resData.token
          );
        })
      );
  }

  signin(email: string, password: string) {
    return this.http
      .post<any>(this.baseUrl + "/auth/login", {
        email,
        password
      })
      .pipe(
        tap(resData => {
          resData = resData.data;
          this.handleAuthentication(
            resData.id,
            resData.fullname,
            resData.email,
            resData.image,
            resData.token
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      id: string;
      fullname: string;
      email: string;
      image: string;
      _token: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.id,
      userData.fullname,
      userData.email,
      userData.image,
      userData._token
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  signout() {
    this.user.next(null);
    localStorage.removeItem("userData");
  }

  private handleAuthentication(
    id: string,
    fullname: string,
    email: string,
    image: string,
    token: string
  ) {
    const user = new User(id, fullname, email, image, token);
    this.user.next(user);
    localStorage.setItem("userData", JSON.stringify(user));
  }
}
