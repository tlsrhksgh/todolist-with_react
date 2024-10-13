import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const changeCategory = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text} </span>
      {category !== Categories.DOING && (
        <button onClick={() => changeCategory(Categories.DOING)}>Doing</button>
      )}
      {category !== Categories.TO_DO && (
        <button onClick={() => changeCategory(Categories.TO_DO)}>ToDo</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => changeCategory(Categories.DONE)}>Done</button>
      )}
    </li>
  );
}

export default ToDo;
