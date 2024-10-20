import  { useContext } from 'react';
import { TaskContext } from './context';

export const Task = ({ task, boardId, listId }) => {
  const { deleteTask, toggleTaskCompletion } = useContext(TaskContext);

  return (
    <div className={`mt-2 p-2 border rounded shadow bg-white ${task.done ? 'bg-green-100' : ''}`}>
      <h4 className={`font-medium ${task.done ? 'line-through' : ''}`}>{task.title}</h4>
      <p className={task.done ? 'line-through' : ''}>{task.description}</p>
      <div className="flex space-x-2">
        <button
          onClick={() => toggleTaskCompletion(boardId, listId, task.id)}
          className={`px-2 py-1 ${task.done ? 'bg-yellow-500' : 'bg-blue-500'} text-white rounded hover:bg-opacity-80`}
        >
          {task.done ? 'Undo' : 'Done'}
        </button>
        <button
          onClick={() => deleteTask(boardId, listId, task.id)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-opacity-80"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export const List = ({ list, boardId }) => {
  const { addTaskToList } = useContext(TaskContext);

  const handleAddTask = () => {
    const taskTitle = prompt("Enter task title:");
    const taskDescription = prompt("Enter task description:");
    if (taskTitle) addTaskToList(boardId, list.id, { id: Date.now(), title: taskTitle, description: taskDescription, done: false });
  };

  return (
    <div className="p-4 border rounded shadow bg-gray-100">
      <h3 className="text-lg font-semibold">{list.title}</h3>
      <button onClick={handleAddTask} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Add Task</button>
      <div className="mt-4">
        {list.tasks.map(task => (
          <Task key={task.id} task={task} boardId={boardId} listId={list.id} />
        ))}
      </div>
    </div>
  );
};

export const Board = ({ board }) => {
  const { addListToBoard } = useContext(TaskContext);

  const handleAddList = () => {
    const listTitle = prompt("Enter list title:");
    if (listTitle) addListToBoard(board.id, listTitle);
  };

  return (
    <div className="p-4 border rounded shadow-lg bg-blue-50">
      <h2 className="text-xl font-bold">{board.title}</h2>
      <button onClick={handleAddList} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Add List</button>
      <div className="flex flex-col space-y-4 mt-4">
        {board.lists.map(list => (
          <List key={list.id} list={list} boardId={board.id} />
        ))}
      </div>
    </div>
  );
};

