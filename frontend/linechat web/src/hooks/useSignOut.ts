import { useAuthStore } from '../stores/authStore'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores/userStore';
import { useUserSettingStore } from '../stores/userSettingStore';

export const useSignOut = () => {
  const clearBearerToken = useAuthStore(state => state.clearBearerToken);
  const clearUserDetails = useUserStore((state) => state.clearUserDetails)
  const setIsOnline = useUserStore((state) => state.setIsOnline)
  const setDarkMode = useUserSettingStore((state) => state.setDarkMode)
  const navigate = useNavigate();

  const signOut = (redirectTo = '/') => {
    clearBearerToken();
    clearUserDetails();
    setIsOnline(false);
    setDarkMode(false);
    navigate(redirectTo);
  }

  return signOut;
}