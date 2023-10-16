import { useAppSelector } from "./useAppSelector";

export const useAuth = () => {
  // const { email, id } = useAppSelector(state => state.user);
  const { email, id } = {
    email: "jokkaa@gmail.com",
    id: "ad123asd123",
  };
  return { isAuth: Boolean(email), email, id };
};
