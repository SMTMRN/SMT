// Although the ApplicationConfig interface plays no role in dependency injection,
// it supports typing of the configuration object within the class.
export interface ApiConfig {
  apiBaseUrl: string;
  secret_key: string;
  payu_secret_key: string;
  defaultAuthorizationToken: string;
  apiEndpoints: any;
  getEndPoint: any;
}

// Configuration values for our app
export const API_CONFIG: ApiConfig = {
  apiBaseUrl: 'http://157.119.108.135:8005/',
  secret_key: '4r5t@W',
  payu_secret_key: '4r5s@W',
  defaultAuthorizationToken: '',

  apiEndpoints: [
    { endPointName: 'register', endPointValue: 'userregistration' },
    { endPointName: 'OTPverification', endPointValue: 'verifyotp' },
    { endPointName: 'login', endPointValue: 'userlogin' },
    { endPointName: 'SMTAccountDetails', endPointValue: 'smtaccountinfo' },
    { endPointName: 'recoverPWD', endPointValue: 'forgotpwd' },
    { endPointName: 'wishListView', endPointValue: 'viewwishlist' },
    { endPointName: 'resetPwd', endPointValue: 'resetpassword' },
    { endPointName: 'initiateOrder', endPointValue: 'initiateorder' },
    { endPointName: 'couponData', endPointValue: 'coupondata' },
    { endPointName: 'pinCode', endPointValue: 'pincode' },
    { endPointName: 'getDealersList', endPointValue: 'dealerslist' },
    { endPointName: 'paymentStatus', endPointValue: 'paymentstatus' },
    { endPointName: 'ordersCount', endPointValue: 'orderscount' },
    { endPointName: 'updateInitialOrder', endPointValue: 'updateinitiateorder' },
    { endPointName: 'checkOut', endPointValue: 'checkout' },
    { endPointName: 'logOut', endPointValue: 'logout' },
  ],

  getEndPoint(endpointName) {
    const result = API_CONFIG.apiEndpoints.filter(ep => ep.endPointName === endpointName);
    if (result.length > 0) {
      return result[0].endPointValue;
    } else {
      console.log('Something wrong with this api ' + endpointName);
    }
  }
};
