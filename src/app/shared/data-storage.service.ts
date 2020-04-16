import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  baseUrl: string = "https://awesome-project-glints.herokuapp.com/api/v1";

  fetchTasks(token) {
    console.log("token", token);
    return this.http.get<any>(this.baseUrl + "/tasks?page=1", {
      headers: {
        Authorization: token
      }
    });
  }
}
