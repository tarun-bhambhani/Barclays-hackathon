// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const HOSTNAME: string = "localhost";
const PORT_NUMBER: number = 3333;
const APPLICATION_NAME: string = '/EKart_Server';
//myshec259147l
//'+PORT_NUMBER+'
export const environment = {
  production: false,
  sellerAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/seller-api',
  //updateSellerAPI: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/seller-api',
  //updateCustomerAPI: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/customer-api',
  customerAPIUrl: 'http://localhost:3333/EKart_Server/user-controller/',
  customerCartUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/customerCart-api',
  //SellerProductManagementAPI: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/sellerProduct-api',
  sellerOrderAPI: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/sellerOrder-api',
  sellerProductAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/sellerProduct-api',
  customerProductAPI: 'http://localhost:3333/EKart_Server/products/getAllProducts',
  customerCardAPI: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/customerOrder-api/getCards/',
  customerCardVerifyAPI: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/customerOrder-api/cards/verify',
  customerPlaceOrderAPI: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/customerOrder-api/processOrder',
  customerAddCardAPI: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/customerOrder-api/cards/addCard',
  customerDeleteCardAPI: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/customerOrder-api/cards/delete/',
  customerAddTempAddressAPI: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/customerOrder-api/addAddress',
  addressAPI: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/address-api/getAddress/',
  updateCartAPI: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/customerOrder-api/updateCart', 
  cancelOrderAPI: 'http://' +HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/customerService-api/'
};