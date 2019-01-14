import { Contest } from './contest';

export interface Company {
  _id: string;
  name: string;
  city: string;
  address: string;
  director: string;
  pib: string;
  numberOfEmployees: string;
  email: string;
  website: string;
  bussinessArea: string;
  logoImage: string;
  contests: Contest[];
  reviewAllowed: boolean;
}
