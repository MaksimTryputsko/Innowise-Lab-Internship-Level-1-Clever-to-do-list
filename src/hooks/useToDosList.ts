import { useSelector } from "react-redux";
import { IInitialState } from "store/reducers/toDosListReducer";

interface IState {
  toDos: IInitialState;
}
export const useToDosList = () => {
  const { toDos, toDosForMonth } = useSelector((state: IState) => state.toDos);
  return { toDos, toDosForMonth };
};
