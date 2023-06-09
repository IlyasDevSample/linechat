import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

export const useAuthRedirect = (redirectTo = '/dashboard') => {
  const getBearerToken = useAuthStore((state) => state.getBearerToken);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getBearerToken();
    if (token) {
      navigate(redirectTo, { replace: true });
    }
  }, [getBearerToken, navigate, redirectTo]);
};
