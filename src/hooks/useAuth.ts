import { useAuthUser } from "store/authStore";

export const useAuth = () => {
  // const { email, id } = useAuthUser(state => state.user);
  const { email, id } = {
    email: "pola@gmail.com",
    id: "1sWlfKcnMUWcsshuR8n6UxYQ0uv2",
  };
  return { isAuth: Boolean(email), email, id };
};
