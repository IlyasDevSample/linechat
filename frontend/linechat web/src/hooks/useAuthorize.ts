import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore'
import { useNavigate } from 'react-router-dom'

export const useAuthorize = () => {
  const getBearerToken = useAuthStore(state => state.getBearerToken);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getBearerToken();
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [getBearerToken, navigate])

}
