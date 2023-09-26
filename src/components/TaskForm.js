import { useState } from "react";
import { motion } from "framer-motion"
export default function TaskForm({ onAdd }) {
  const [taskName, setTaskName] = useState('');
  function handleSubmit(ev) {
    ev.preventDefault();
    onAdd(taskName);
    setTaskName('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text"
        value={taskName}
        onChange={ev => setTaskName(ev.target.value)}
        placeholder="Your next task..." />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >+</motion.button>
    </form>
  );
}