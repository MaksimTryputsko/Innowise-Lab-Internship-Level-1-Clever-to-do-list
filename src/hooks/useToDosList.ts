import { useAppSelector } from "./useAppSelector";

export const useToDosList = () => {
  const { toDos, toDosForMonth } = useAppSelector(state => state.toDos);
  return { toDos, toDosForMonth };
};
