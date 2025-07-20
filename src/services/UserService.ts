import { useAuth } from '../hooks/useAuth';
import { User } from '../types/User';

// Issue: Service that depends on a hook (anti-pattern, cross-context)
export const UserService = {
  getCurrentUser: async (): Promise<User | null> => {
    // Issue: Directly using a hook in a service (should not do this)
    const { user } = useAuth();
    if (user) {
      return user;
    }
    // Issue: Inconsistent error handling
    return null;
  },

  // Issue: Inconsistent API usage compared to api.ts
  updateUserProfile: async (user: User) => {
    // Simulate an API call
    try {
      // Issue: No actual API call, inconsistent with api.ts
      localStorage.setItem('authUser', JSON.stringify(user));
      return { success: true };
    } catch (e) {
      // Issue: Inconsistent error handling
      return { success: false };
    }
  },
};
