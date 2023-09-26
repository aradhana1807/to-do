import Footer from './components/Footer';
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
      <div className="wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
        </svg>
      </div>
      <Footer />
    </>
  );
}

export default App;
