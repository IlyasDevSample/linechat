import { useAuthStore } from '../stores/authStore'
import { useNavigate } from 'react-router-dom'

export const useSignOut = () => {
  const clearBearerToken = useAuthStore(state => state.clearBearerToken);
  const navigate = useNavigate();

  const signOut = (redirectTo = '/') => {
    clearBearerToken();
    navigate(redirectTo);
  }

  return signOut;
}