import { useAppSelector } from "./useAppSelector";

export const useAuth = () => {
  // const { email, id } = useAppSelector(state => state.user);
  const { email, id } = {
    email: "koli@gmail.com",
    id: "213123pPPasd",
  };
  return { isAuth: Boolean(email), email, id };
};
