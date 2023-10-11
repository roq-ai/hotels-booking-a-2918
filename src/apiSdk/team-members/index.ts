import queryString from 'query-string';
import { TeamMemberInterface, TeamMemberGetQueryInterface } from 'interfaces/team-member';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTeamMembers = async (
  query?: TeamMemberGetQueryInterface,
): Promise<PaginatedInterface<TeamMemberInterface>> => {
  return fetcher('/api/team-members', {}, query);
};

export const createTeamMember = async (teamMember: TeamMemberInterface) => {
  return fetcher('/api/team-members', { method: 'POST', body: JSON.stringify(teamMember) });
};

export const updateTeamMemberById = async (id: string, teamMember: TeamMemberInterface) => {
  return fetcher(`/api/team-members/${id}`, { method: 'PUT', body: JSON.stringify(teamMember) });
};

export const getTeamMemberById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/team-members/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteTeamMemberById = async (id: string) => {
  return fetcher(`/api/team-members/${id}`, { method: 'DELETE' });
};
