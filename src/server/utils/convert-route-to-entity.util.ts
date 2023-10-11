const mapping: Record<string, string> = {
  'business-owners': 'business_owner',
  customers: 'customer',
  hotels: 'hotel',
  'property-managers': 'property_manager',
  'team-members': 'team_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
