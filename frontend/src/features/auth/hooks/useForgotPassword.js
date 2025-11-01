import { useState } from 'react';
import authService from '../services/authService';

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const forgotPassword = async (email) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      await authService.forgotPassword(email);
      setIsSuccess(true);
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || 'Có lỗi xảy ra, vui lòng thử lại';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setIsSuccess(false);
    setIsLoading(false);
  };

  return {
    forgotPassword,
    isLoading,
    error,
    isSuccess,
    resetState
  };
};

export default useForgotPassword;