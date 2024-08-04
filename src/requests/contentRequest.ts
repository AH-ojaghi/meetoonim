import API from "../services/api";
import { AxiosResponse } from "axios";
//
class contentRequest {
  public static async getPostContent(): Promise<AxiosResponse> {
    return await API.authGet(
      "https://meetoonim.com/api/v1/posts/?page=1",
      {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVldG9vbmltLmNvbS9hcGkvdjEvdXNlcnMvbG9naW4iLCJpYXQiOjE3MjEyMTU4MjcsImV4cCI6MTcyNjAxNTgyNywibmJmIjoxNzIxMjE1ODI3LCJqdGkiOiJpN3pPRlRXUnZUN2xkV2hNIiwic3ViIjoiMjE4OTIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.HQtTBA6rBRSM_IwglUvM6JGdFF4VQrAuyRkcvWa7d5I",
        },
        isUseLoading: true,
      }
    );
  }
}

export default contentRequest;
