import Company from "./company";
//
interface UserInterface {
  id: number;
  followers_count: number;
  followings_count: number;
  is_followed_by_current_user: boolean;
  is_blocked_by_current_user: boolean;
  is_friend: boolean;
  username: string;
  email: string;
  f_name: string;
  l_name: string;
  avatar: string;
  open_to_status: string;
  open_to_image: string;
  province: string;
  city: string;
  mobile_number: string;
  description: string;
  job_title: string;
  is_company: boolean;
  company_id: number;
  birth_date: string;
  banner: string;
  video: string;
  wallet_amount: number;
  company: Company[];
  golden_end_date: string;
  account_settlement_in_progress: boolean;
  shaba_number: number;
  is_shaba_number_verified: boolean;
}

class User {
  followings_count: number;
  is_followed_by_current_user: boolean;
  is_blocked_by_current_user: boolean;
  is_friend: boolean;
  username: string;
  email: string;
  f_name: string;
  l_name: string;
  avatar: string;
  open_to_status: string;
  open_to_image: string;
  province: string;
  city: string;
  mobile_number: string;
  description: string;
  job_title: string;
  is_company: boolean;
  company_id: number;
  birth_date: string;
  banner: string;
  video: string;
  wallet_amount: number;
  company: Company[];
  golden_end_date: string;
  account_settlement_in_progress: boolean;
  shaba_number: number;
  is_shaba_number_verified: boolean;
  constructor(data: UserInterface) {
    this.followings_count = data.followings_count;
    this.is_followed_by_current_user =
      data.is_followed_by_current_user;
    this.is_blocked_by_current_user =
      data.is_blocked_by_current_user;
    this.is_friend = data.is_friend;
    this.username = data.username;
    this.email = data.email;
    this.f_name = data.f_name;
    this.l_name = data.l_name;
    this.avatar = data.avatar;
    this.open_to_status = data.open_to_status;
    this.open_to_image = data.open_to_image;
    this.province = data.province;
    this.city = data.city;
    this.mobile_number = data.mobile_number;
    this.description = data.description;
    this.job_title = data.job_title;
    this.is_company = data.is_company;
    this.company_id = data.company_id;
    this.birth_date = data.birth_date;
    this.banner = data.banner;
    this.video = data.video;
    this.wallet_amount = data.wallet_amount;
    this.company = data.company;
    this.golden_end_date = data.golden_end_date;
    this.account_settlement_in_progress =
      data.account_settlement_in_progress;
    this.shaba_number = data.shaba_number;
    this.is_shaba_number_verified =
      data.is_shaba_number_verified;
  }
}

export default User;
