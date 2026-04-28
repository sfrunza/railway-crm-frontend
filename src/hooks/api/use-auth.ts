import { login, logout, type LoginResponse } from '@/api/endpoints/auth';
import { extractError } from '@/lib/axios';
import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth-store';

export function useAuth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('return_to');
  const { user, clearAuth } = useAuthStore();

  const { mutate: loginMutation, isPending: isPendingLogin } = useMutation<LoginResponse, Error, { email_address: string, password: string }>({
    mutationFn: ({ email_address, password }) => login(email_address, password),
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem('session_token', data.token);
        if (returnTo) {
          navigate(returnTo);
          return;
        }
        navigate('/');
      }
    },
    onError: (err) => {
      // useAuthStore.getState().clearAuth();
      toast.error(extractError(err));
    },
  });

  // const { mutate: getSessionMutation, isPending: isPendingGetSession } = useMutation<User, Error>({
  //   mutationFn: getSession,
  //   onSuccess: (data) => {
  //     useAuthStore.getState().setUser(data);
  //   },
  //   onError: (err) => {
  //     toast.error(extractError(err));
  //   },
  // });

  const { mutate: logoutMutation, isPending: isPendingLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // useAuthStore.getState().clearAuth();
      clearAuth();
      localStorage.removeItem('session_token');
      queryClient.clear();
      window.location.assign('/auth/login');
    },
  });

  return {
    user,
    login: loginMutation,
    isPendingLogin,
    logout: logoutMutation,
    isPendingLogout
  };
}; 