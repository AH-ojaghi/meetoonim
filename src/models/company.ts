interface CompanyInterface {
  id: number;
  name: string;
  en_name: string;
  title: string;
  company_category_id: number;
  banner: number;
  image: number;
  city_id: string;
  province_id: string;
  city_name: string;
  province_name: string;
  description: string;
  website: string;
  founded_at: string;
  company_size: string;
  email: string;
  email_verified_at: string;
}

class Company {
  id: number;
  name: string;
  en_name: string;
  title: string;
  company_category_id: number;
  banner: number;
  image: number;
  city_id: string;
  province_id: string;
  city_name: string;
  province_name: string;
  description: string;
  website: string;
  founded_at: string;
  company_size: string;
  email: string;
  email_verified_at: string;
  constructor(data: CompanyInterface) {
    this.id = data.id;
    this.name = data.name;
    this.en_name = data.en_name;
    this.title = data.title;
    this.company_category_id =
      data.company_category_id;
    this.banner = data.banner;
    this.image = data.image;
    this.city_id = data.city_id;
    this.province_id = data.province_id;
    this.city_name = data.city_name;
    this.province_name = data.province_name;
    this.description = data.description;
    this.website = data.website;
    this.founded_at = data.founded_at;
    this.company_size = data.company_size;
    this.email = data.email;
    this.email_verified_at =
      data.email_verified_at;
  }
}

export default Company;
