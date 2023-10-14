import { useAppSelector } from "./useAppSelector";

export const useAuth = () => {
  // const { email, id } = useAppSelector(state => state.user);
  const { email, id } = { email: "john@gmail.com", id: "sadasd12312321" };
  return { isAuth: Boolean(email), email, id };
};
