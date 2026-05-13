export const AUTH_TOKEN_KEY = "auth_token";

export const storeAuthToken = (token: string | null) => {
  if (token && token !== "null") {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

export const loadAuthToken = (): string | null => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token && token !== "null" ? token : null;
};

export const resolveToken = (searchParams: URLSearchParams): string | null => {
  const queryToken = searchParams.get("token");
  if (queryToken && queryToken !== "null") {
    return queryToken;
  }
  return loadAuthToken();
};
