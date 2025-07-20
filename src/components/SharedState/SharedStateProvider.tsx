import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { UserService } from '../../services/UserService'; // Cross-context dependency
import { useAuth } from '../../hooks/useAuth'; // Cross-context dependency
import { User } from '../../types/User';

// Inconsistent interface with other contexts
interface SharedStateContextType {
  user: User | null;
  updateUser: (user: User) => void;
  // Missing other state fields for demonstration
}

const SharedStateContext = createContext<
  SharedStateContextType | undefined
>(undefined);

export const SharedStateProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // Inconsistent error handling
      UserService.getCurrentUser()
        .then(setUser)
        .catch(() => setUser(null));
    }
  }, [isAuthenticated]);

  // Inconsistent state update
  const updateUser = (u: User) => {
    setUser(u);
    UserService.updateUserProfile(u);
  };

  return (
    <SharedStateContext.Provider value={{ user, updateUser }}>
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error(
      'useSharedState must be used within SharedStateProvider'
    );
  }
  return context;
};
