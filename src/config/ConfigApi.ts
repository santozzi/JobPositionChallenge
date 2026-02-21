export interface ApiNimbleGravity {
  BASE_URL: string;
}

export function configAPI(): ApiNimbleGravity {
  const {VITE_BASE_URL} = import.meta.env;

  if (!VITE_BASE_URL) throw new Error("VITE_BASE_URL no esta en env");
  
  const config: ApiNimbleGravity = {
    BASE_URL:VITE_BASE_URL
  };

  return config;
}