import { useSelector } from "react-redux/es/hooks/useSelector";
import { IInitialState } from "store/reducers/userReducer";

interface IState {
  user: IInitialState;
}

export const useAuthor = () => {
  const { email, id } = useSelector((state: IState) => state.user);
  return { isAuth: !!email, email, id };
};
