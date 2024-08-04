import API from "../services/api";
import { AxiosResponse } from "axios";

class postRequest {
  public static async update(
    id: number
  ): Promise<AxiosResponse> {
    return await API.authPut(
      `https://meetoonim.com/api/v1/posts/${id}/like`,
      {
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVldG9vbmltLmNvbS9hcGkvdjEvdXNlcnMvbG9naW4iLCJpYXQiOjE3MjE2Mjg0MTIsImV4cCI6MTcyNjQyODQxMiwibmJmIjoxNzIxNjI4NDEyLCJqdGkiOiJYcnhjcjVYcHFaVWN4dzh6Iiwic3ViIjoiMjE4OTIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.xoGfmLwAp4rAdXmQ_sC5cvVhvzp4N3HSRzUEoztCP2Y",
        },
        isUseLoading: true,
      }
    );
  }
}

export default postRequest;
//
