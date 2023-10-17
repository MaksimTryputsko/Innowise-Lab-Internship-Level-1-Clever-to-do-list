import { useAppSelector } from "./useAppSelector";
import { IInitialState } from "store/reducers/toDoListReducer/toDosListReducer";

export const useToDosList = () => {
  const { toDos, toDosForMonth } = useAppSelector(
    state => state.toDos,
  ) as IInitialState;
  return { toDos, toDosForMonth };
};
