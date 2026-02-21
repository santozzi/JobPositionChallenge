export interface ApiNimbleGravity {
  BASE_URL: string;
  REPOSITORY: string;
}

export function configAPI(): ApiNimbleGravity {
  const {VITE_BASE_URL,VITE_REPOSITORY} = import.meta.env;

  if (!VITE_BASE_URL) throw new Error("VITE_BASE_URL no esta en env");
  if (!VITE_REPOSITORY) throw new Error("VITE_REPOSITORY no esta en env");
  
  const config: ApiNimbleGravity = {
    BASE_URL:VITE_BASE_URL,
    REPOSITORY:VITE_REPOSITORY
  };

  return config;
}