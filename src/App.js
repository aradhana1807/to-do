import { useEffect, useState } from 'react';
import './App.css';
import Task from './components/Task';
import TaskForm from './components/TaskForm';
import appLogo from './images/nyankoapp.png'

function App() {

  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    return storedTasks ?? [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks || []);
  }, []);

  function addTask(name) {
    setTasks(prev => {
      return [...prev, { name: name, done: false }];
    });
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObj, index) =>
        index !== indexToRemove
      )
    })
  }

  const countComplete = tasks.filter(t => t.done).length;
  const totalTask = tasks.length;

  function getMotivation() {
    const perci = (countComplete / totalTask) * 100;

    if (perci === 0) {
      return 'Accomplish the task(s)! 😾'
    }

    if (perci === 100) {
      return 'Done and dusted for today! 😼';
    }

    if (perci > 0 && perci < 100) {
      return 'YOU CAN DO IT ! 🙀'
    }

    else {
      return 'Add some tasks! 😸'
    }
  }

  function renameTask(index, newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  }

  return (

    <>
      <main>
        <div className="appLogo-container">
          <img className="appLogo" src={appLogo} alt="nyanko-sensei" />
        </div>


        <h2>{countComplete}/{totalTask} complete</h2>
        <h2>{getMotivation()}</h2>
        <TaskForm onAdd={addTask} />
        {tasks.map((task, index) =>
        (<Task {...task}

          onEdit={newName => renameTask(index, newName)}
          onDelete={() => removeTask(index)}
          onToggle={done => updateTaskDone(index, done)} />
        ))}
      </main>

    </>
  );
}

export default App;
