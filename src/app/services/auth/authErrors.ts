export function operatingError(error: any) {
  let errorMessage: string = '';

  switch (error.code) {
    case 'auth/admin-restricted-operation':
      errorMessage = 'This operation is restricted to administrators only.';
      break;
    case 'auth/argument-error':
      errorMessage = 'An argument error occurred.';
      break;
    case 'auth/app-not-authorized':
      errorMessage = 'This app is not authorized to use Firebase Authentication.';
      break;
    case 'auth/app-not-installed':
      errorMessage = 'The app is not installed.';
      break;
    case 'auth/captcha-check-failed':
      errorMessage = 'The reCAPTCHA check failed.';
      break;
    case 'auth/code-expired':
      errorMessage = 'The verification code has expired.';
      break;
    case 'auth/cordova-not-ready':
      errorMessage = 'Cordova is not ready.';
      break;
    case 'auth/cors-unsupported':
      errorMessage = 'CORS is not supported.';
      break;
    case 'auth/credential-already-in-use':
      errorMessage = 'This credential is already associated with a different user account.';
      break;
    case 'auth/custom-token-mismatch':
      errorMessage = 'The custom token corresponds to a different audience.';
      break;
    case 'auth/requires-recent-login':
      errorMessage = 'This operation is sensitive and requires recent authentication. Log in again before retrying this request.';
      break;
    case 'auth/dependent-sdk-initialized-before-auth':
      errorMessage = 'Another dependent SDK was initialized before the auth instance.';
      break;
    case 'auth/dynamic-link-not-activated':
      errorMessage = 'The dynamic link is not activated.';
      break;
    case 'auth/email-change-needs-verification':
      errorMessage = 'The email change requires verification.';
      break;
    case 'auth/email-already-in-use':
      errorMessage = 'The email address is already in use by another account.';
      break;
    case 'auth/emulator-config-failed':
      errorMessage = 'The emulator config failed.';
      break;
    case 'auth/expired-action-code':
      errorMessage = 'The action code has expired.';
      break;
    case 'auth/cancelled-popup-request':
      errorMessage = 'The popup request was cancelled.';
      break;
    case 'auth/internal-error':
      errorMessage = 'An internal error occurred.';
      break;
    case 'auth/invalid-api-key':
      errorMessage = 'The provided API key is invalid.';
      break;
    case 'auth/invalid-app-credential':
      errorMessage = 'The app credential is invalid.';
      break;
    case 'auth/invalid-app-id':
      errorMessage = 'The app ID is invalid.';
      break;
    case 'auth/invalid-user-token':
      errorMessage = 'The user token is invalid.';
      break;
    case 'auth/invalid-auth-event':
      errorMessage = 'The auth event is invalid.';
      break;
    case 'auth/invalid-cert-hash':
      errorMessage = 'The certificate hash is invalid.';
      break;
    case 'auth/invalid-verification-code':
      errorMessage = 'The verification code is invalid.';
      break;
    case 'auth/invalid-continue-uri':
      errorMessage = 'The continue URL is invalid.';
      break;
    case 'auth/invalid-cordova-configuration':
      errorMessage = 'The Cordova configuration is invalid.';
      break;
    case 'auth/invalid-custom-token':
      errorMessage = 'The custom token is invalid.';
      break;
    case 'auth/invalid-dynamic-link-domain':
      errorMessage = 'The dynamic link domain is invalid.';
      break;
    case 'auth/invalid-email':
      errorMessage = 'The email address is invalid.';
      break;
    case 'auth/invalid-emulator-scheme':
      errorMessage = 'The emulator scheme is invalid.';
      break;
    case 'auth/invalid-credential':
      errorMessage = 'The credential is invalid.';
      break;
    case 'auth/invalid-message-payload':
      errorMessage = 'The message payload is invalid.';
      break;
    case 'auth/invalid-multi-factor-session':
      errorMessage = 'The multi-factor session is invalid.';
      break;
    case 'auth/invalid-oauth-client-id':
      errorMessage = 'The OAuth client ID is invalid.';
      break;
    case 'auth/invalid-oauth-provider':
      errorMessage = 'The OAuth provider is invalid.';
      break;
    case 'auth/invalid-action-code':
      errorMessage = 'The action code is invalid.';
      break;
    case 'auth/unauthorized-domain':
      errorMessage = 'The domain is not authorized.';
      break;
    case 'auth/wrong-password':
      errorMessage = 'The password is invalid.';
      break;
    case 'auth/invalid-persistence-type':
      errorMessage = 'The persistence type is invalid.';
      break;
    case 'auth/invalid-phone-number':
      errorMessage = 'The phone number is invalid.';
      break;
    case 'auth/invalid-provider-id':
      errorMessage = 'The provider ID is invalid.';
      break;
    case 'auth/invalid-recipient-email':
      errorMessage = 'The recipient email is invalid.';
      break;
    case 'auth/invalid-sender':
      errorMessage = 'The sender is invalid.';
      break;
    case 'auth/invalid-verification-id':
      errorMessage = 'The verification ID is invalid.';
      break;
    case 'auth/invalid-tenant-id':
      errorMessage = 'The tenant ID is invalid.';
      break;
    case 'auth/multi-factor-info-not-found':
      errorMessage = 'The multi-factor info was not found.';
      break;
    case 'auth/multi-factor-auth-required':
      errorMessage = 'Multi-factor authentication is required.';
      break;
    case 'auth/missing-android-pkg-name':
      errorMessage = 'An Android Package Name must be provided if the Android App is required to be installed.';
      break;
    case 'auth/missing-app-credential':
      errorMessage = 'The app credential is missing.';
      break;
    case 'auth/auth-domain-config-required':
      errorMessage = 'Auth domain configuration is required.';
      break;
    case 'auth/missing-verification-code':
      errorMessage = 'The verification code is missing.';
      break;
    case 'auth/missing-continue-uri':
      errorMessage = 'The continue URL is missing.';
      break;
    case 'auth/missing-iframe-start':
      errorMessage = 'The iframe start is missing.';
      break;
    case 'auth/missing-ios-bundle-id':
      errorMessage = 'An iOS Bundle ID must be provided if an iOS App is required to be installed.';
      break;
    case 'auth/missing-or-invalid-nonce':
      errorMessage = 'The nonce is missing or invalid.';
      break;
    case 'auth/missing-multi-factor-info':
      errorMessage = 'The multi-factor info is missing.';
      break;
    case 'auth/missing-multi-factor-session':
      errorMessage = 'The multi-factor session is missing.';
      break;
    case 'auth/missing-phone-number':
      errorMessage = 'The phone number is missing.';
      break;
    case 'auth/missing-verification-id':
      errorMessage = 'The verification ID is missing.';
      break;
    case 'auth/app-deleted':
      errorMessage = 'The app has been deleted.';
      break;
    case 'auth/account-exists-with-different-credential':
      errorMessage = 'An account already exists with the same email address but different sign-in credentials.';
      break;
    case 'auth/network-request-failed':
      errorMessage = 'A network error occurred.';
      break;
    case 'auth/null-user':
      errorMessage = 'The user is null.';
      break;
    case 'auth/no-auth-event':
      errorMessage = 'No auth event.';
      break;
    case 'auth/no-such-provider':
      errorMessage = 'User was not linked to an account with the given provider.';
      break;
    case 'auth/operation-not-allowed':
      errorMessage = 'The operation is not allowed.';
      break;
    case 'auth/operation-not-supported-in-this-environment':
      errorMessage = 'This operation is not supported in the current environment.';
      break;
    case 'auth/popup-blocked':
      errorMessage = 'The popup was blocked.';
      break;
    case 'auth/popup-closed-by-user':
      errorMessage = 'The popup was closed by the user.';
      break;
    case 'auth/provider-already-linked':
      errorMessage = 'User can only be linked to one identity for the given provider.';
      break;
    case 'auth/quota-exceeded':
      errorMessage = 'The quota has been exceeded.';
      break;
    case 'auth/redirect-cancelled-by-user':
      errorMessage = 'The redirect was cancelled by the user.';
      break;
    case 'auth/redirect-operation-pending':
      errorMessage = 'A redirect operation is already pending.';
      break;
    case 'auth/rejected-credential':
      errorMessage = 'The credential was rejected.';
      break;
    case 'auth/second-factor-already-in-use':
      errorMessage = 'The second factor is already in use.';
      break;
    case 'auth/maximum-second-factor-count-exceeded':
      errorMessage = 'The maximum number of second factors has been exceeded.';
      break;
    case 'auth/tenant-id-mismatch':
      errorMessage = 'The tenant ID does not match the expected ID.';
      break;
    case 'auth/timeout':
      errorMessage = 'The operation has timed out.';
      break;
    case 'auth/user-token-expired':
      errorMessage = 'The user token has expired.';
      break;
    case 'auth/too-many-requests':
      errorMessage = 'Too many requests. Please try again later.';
      break;
    case 'auth/unauthorized-continue-uri':
      errorMessage = 'The domain of the continue URL is not whitelisted.';
      break;
    case 'auth/unsupported-first-factor':
      errorMessage = 'The first factor is unsupported.';
      break;
    case 'auth/unsupported-persistence-type':
      errorMessage = 'The persistence type is unsupported.';
      break;
    case 'auth/unsupported-tenant-operation':
      errorMessage = 'The tenant operation is unsupported.';
      break;
    case 'auth/unverified-email':
      errorMessage = 'The email is unverified.';
      break;
    case 'auth/user-cancelled':
      errorMessage = 'The user cancelled the operation.';
      break;
    case 'auth/user-not-found':
      errorMessage = 'The user was not found.';
      break;
    case 'auth/user-disabled':
      errorMessage = 'The user account has been disabled.';
      break;
    case 'auth/user-mismatch':
      errorMessage = 'The supplied credentials do not match the previously signed in user.';
      break;
    case 'auth/user-signed-out':
      errorMessage = 'The user is signed out.';
      break;
    case 'auth/weak-password':
      errorMessage = 'The password is weak.';
      break;
    case 'auth/web-storage-unsupported':
      errorMessage = 'Web storage is unsupported.';
      break;
    case 'auth/already-initialized':
      errorMessage = 'The instance has already been initialized.';
      break;
    case 'auth/recaptcha-not-enabled':
      errorMessage = 'reCAPTCHA is not enabled.';
      break;
    case 'auth/missing-recaptcha-token':
      errorMessage = 'The reCAPTCHA token is missing.';
      break;
    case 'auth/invalid-recaptcha-token':
      errorMessage = 'The reCAPTCHA token is invalid.';
      break;
    case 'auth/invalid-recaptcha-action':
      errorMessage = 'The reCAPTCHA action is invalid.';
      break;
    case 'auth/missing-client-type':
      errorMessage = 'The client type is missing.';
      break;
    case 'auth/missing-recaptcha-version':
      errorMessage = 'The reCAPTCHA version is missing.';
      break;
    case 'auth/invalid-recaptcha-version':
      errorMessage = 'The reCAPTCHA version is invalid.';
      break;
    case 'auth/invalid-req-type':
      errorMessage = 'The request type is invalid.';
      break;
    case 'auth/invalid-hosting-link-domain':
      errorMessage = 'The hosting link domain is invalid.';
      break;
    default:
      errorMessage = 'An unknown error occurred.';
      break;
  }

  return errorMessage;
}
