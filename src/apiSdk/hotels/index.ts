import queryString from 'query-string';
import { HotelInterface, HotelGetQueryInterface } from 'interfaces/hotel';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getHotels = async (query?: HotelGetQueryInterface): Promise<PaginatedInterface<HotelInterface>> => {
  return fetcher('/api/hotels', {}, query);
};

export const createHotel = async (hotel: HotelInterface) => {
  return fetcher('/api/hotels', { method: 'POST', body: JSON.stringify(hotel) });
};

export const updateHotelById = async (id: string, hotel: HotelInterface) => {
  return fetcher(`/api/hotels/${id}`, { method: 'PUT', body: JSON.stringify(hotel) });
};

export const getHotelById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/hotels/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteHotelById = async (id: string) => {
  return fetcher(`/api/hotels/${id}`, { method: 'DELETE' });
};
