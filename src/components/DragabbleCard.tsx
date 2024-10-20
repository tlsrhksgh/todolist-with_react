import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 5px;
  padding: 10px 10px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
  display: flex;
  justify-content: space-between;
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DragabbleCard({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDragabbleCardProps) {
  const setToDos = useSetRecoilState(toDoState);

  const deleteItem = () => {
    localStorage.removeItem(toDoId.toString());
    setToDos((allBoards) => {
      const curBoard = [...allBoards[boardId]];

      curBoard.splice(index, 1);

      return {
        ...allBoards,
        [boardId]: curBoard,
      };
    });
  };

  return (
    <Draggable draggableId={toDoText} index={index}>
      {(provide, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provide.innerRef}
          {...provide.draggableProps}
          {...provide.dragHandleProps}
        >
          {toDoText}
          <button onClick={deleteItem}>❌</button>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
