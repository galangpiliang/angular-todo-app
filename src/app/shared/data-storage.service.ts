import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  baseUrl: string = "https://awesome-project-glints.herokuapp.com/api/v1";

  fetchTasks() {
    return this.http.get<any>(this.baseUrl + "/tasks?page=1");
  }

  addTask(title) {
    const d = new Date();
    let curDate = [
      d.getFullYear(),
      ("0" + (d.getMonth() + 1)).slice(-2),
      ("0" + d.getDate()).slice(-2)
    ].join("-");

    let task = {
      title: title,
      dueDate: curDate,
      importanceLevel: 1
    };
    return this.http.post<any>(this.baseUrl + "/tasks", task);
  }

  updateTask(task) {
    return this.http.put<any>(this.baseUrl + "/tasks?id=" + task._id, task);
  }

  deleteTask(id) {
    return this.http.delete<any>(this.baseUrl + "/tasks/?id=" + id);
  }
}
