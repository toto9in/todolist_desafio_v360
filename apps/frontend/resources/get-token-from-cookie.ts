export const getTokenFromCookie = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  return (
    document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('JWT='))
      ?.split('=')[1] || ''
  );
};
