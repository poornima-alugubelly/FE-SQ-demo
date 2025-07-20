// Issue: Inconsistent interface with UserData in UserProfile
export interface User {
  id: string;
  fullName: string;
  emailAddress: string;
  passwordHash: string;
  age?: number;
  // Missing 'name' and 'password' fields, uses different naming
}
