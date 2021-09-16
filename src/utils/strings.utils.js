class Strings {
  // Global Strings
  static get INTERNAL_ERROR() { return 'Something went wrong, try again.'; }

  // JWTMiddleware
  static get EXPIRED_SESSION() { return 'Session expired, please login again.'; }

  // UserController
  static get CREATED_USER() { return 'User created successfully.'; }

  static get UPDATED_USER() { return 'User updated successfully.'; }

  // UserController BAD REQUEST
  static get USER_BAD_REQUEST() { return 'There are empty fields.'; }

  static get USER_ID_MISSING() { return 'Select a user to edit.'; }

  static get USER_EMAIL_MISSING() { return 'Email is required.'; }

  static get USER_PASSWORD_MISSING() { return 'Password is required.'; }

  static get USER_FIRSTNAME_MISSING() { return 'First name is required.'; }

  static get USER_LASTNAME_MISSING() { return 'Last name is required.'; }

  static get USER_CITY_MISSING() { return 'City is required.'; }

  static get USER_STATE_MISSING() { return 'State is required.'; }

  static get USER_COUNTRY_MISSING() { return 'Country is required.'; }

  static get USER_PHONE_MISSING() { return 'Phone is required.'; }

  // DoctorController
  static get CREATED_DOCTOR() { return 'Doctor added successfully.'; }

  static get NO_DOCTOR_SELECTED() { return 'Select a doctor.'; }

  static get DOCTOR_NOT_FOUND() { return 'The selected doctor doesn\'t exist.'; }

  static get DOCTOR_UPDATED() { return 'Doctor updated successfully.'; }

  static get DOCTOR_DELETED() { return 'Doctor deleted successfully.'; }

  static get INCOMPLETE_DATA() { return 'All fields must are required.'; }

  // DoesUserExistEmail
  static get EMAIL_EXISTS() { return 'The email has been already taken.'; }

  // DoesUserExistID
  static get USER_NO_EXIST() { return 'The user cannot be found.'; }

  // AuthService
  static get NO_EMAIL_FOUND() { return 'This email is not registered.'; }

  static get WRONG_PASSWORD() { return 'Wrong credentials.'; }

  static get LOGIN_SUCCESSFUL() { return 'User logged in successfully.'; }

  static get PASSWORD_CHANGED() { return 'Password changed successfully.'; }
}

export default Strings;
