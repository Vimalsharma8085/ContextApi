import { useContext } from 'react';
import { TaskContext, TaskProvider } from './context';
import { Board } from './components';

const App = () => {
  const { boards, addBoard } = useContext(TaskContext);

  const handleAddBoard = () => {
    const boardTitle = prompt("Enter board title:");
    if (boardTitle) addBoard(boardTitle);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Task Management App</h1>
      <button onClick={handleAddBoard} className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded">Add Board</button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {boards.map(board => (
          <Board key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
};


const WrappedApp = () => (
  <TaskProvider>
    <App />
  </TaskProvider>
);

export default WrappedApp;

