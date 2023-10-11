import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PropertyManagerInterface {
  id?: string;
  user_id: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface PropertyManagerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  phone_number?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
}
