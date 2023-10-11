interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Business Owner', 'Team Member', 'Property Manager'],
  tenantName: 'Hotel',
  applicationName: 'Hotels Booking Application',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Manage personal customer information',
    'View hotel information',
    'Book a hotel',
    'Edit personal customer information',
  ],
  ownerAbilities: ['Manage user data', 'Manage hotel data', 'Manage business owner data', 'Manage customer data'],
  getQuoteUrl: 'https://app.roq.ai/proposal/2144548c-c959-4845-bdd1-589b3f56bc4d',
};
