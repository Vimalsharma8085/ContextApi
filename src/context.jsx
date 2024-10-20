import  { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);

  const addBoard = (title) => {
    const newBoard = { id: Date.now(), title, lists: [] };
    setBoards((prev) => [...prev, newBoard]);
  };

  const addListToBoard = (boardId, listTitle) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id === boardId) {
          const newList = { id: Date.now(), title: listTitle, tasks: [] };
          return { ...board, lists: [...board.lists, newList] };
        }
        return board;
      })
    );
  };

  const addTaskToList = (boardId, listId, task) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: board.lists.map((list) => {
              if (list.id === listId) {
                return { ...list, tasks: [...list.tasks, task] };
              }
              return list;
            }),
          };
        }
        return board;
      })
    );
  };

  const deleteTask = (boardId, listId, taskId) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: board.lists.map((list) => {
              if (list.id === listId) {
                return {
                  ...list,
                  tasks: list.tasks.filter((task) => task.id !== taskId),
                };
              }
              return list;
            }),
          };
        }
        return board;
      })
    );
  };

  const toggleTaskCompletion = (boardId, listId, taskId) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: board.lists.map((list) => {
              if (list.id === listId) {
                return {
                  ...list,
                  tasks: list.tasks.map((task) =>
                    task.id === taskId ? { ...task, done: !task.done } : task
                  ),
                };
              }
              return list;
            }),
          };
        }
        return board;
      })
    );
  };

  return (
    <TaskContext.Provider value={{ boards, addBoard, addListToBoard, addTaskToList, deleteTask, toggleTaskCompletion }}>
      {children}
    </TaskContext.Provider>
  );
};
