import {HttpHeaderResponse, HttpHeaders} from "@angular/common/http";

export const TypeJson = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

export const AuthBearer = {
  options: new HttpHeaderResponse({
    headers: new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache"
    })
  })
};
