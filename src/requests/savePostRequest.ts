import API from "../services/api";
import { AxiosResponse } from "axios";

class savePostRequest {
  public static async update(
    id: number
  ): Promise<AxiosResponse> {
    return await API.authPost(`bookmarks/${id}`, {
      data: {},
      headers: {
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVldG9vbmltLmNvbS9hcGkvdjEvdXNlcnMvbG9naW4iLCJpYXQiOjE3MjE4MTg5MzksImV4cCI6MTcyNjYxODkzOSwibmJmIjoxNzIxODE4OTM5LCJqdGkiOiIzSFQxZGZPVjBwQ1RueGtEIiwic3ViIjoiMjE4OTIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0._CB_jA6y_DeocZXO7CXZ-lksqXq19t1F-qgModRDzBM",
      },
      isUseLoading: true,
    });
  }
}
//
export default savePostRequest;