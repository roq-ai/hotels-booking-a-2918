import queryString from 'query-string';
import { PropertyManagerInterface, PropertyManagerGetQueryInterface } from 'interfaces/property-manager';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPropertyManagers = async (
  query?: PropertyManagerGetQueryInterface,
): Promise<PaginatedInterface<PropertyManagerInterface>> => {
  return fetcher('/api/property-managers', {}, query);
};

export const createPropertyManager = async (propertyManager: PropertyManagerInterface) => {
  return fetcher('/api/property-managers', { method: 'POST', body: JSON.stringify(propertyManager) });
};

export const updatePropertyManagerById = async (id: string, propertyManager: PropertyManagerInterface) => {
  return fetcher(`/api/property-managers/${id}`, { method: 'PUT', body: JSON.stringify(propertyManager) });
};

export const getPropertyManagerById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/property-managers/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deletePropertyManagerById = async (id: string) => {
  return fetcher(`/api/property-managers/${id}`, { method: 'DELETE' });
};
