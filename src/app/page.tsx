'use client';

import { useState, useEffect } from 'react';
import TodoItem from '@/components/TodoItems';

export default function Home() {
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <main className="min-h-screen bg-red-400 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">📝 Todo List</h1>
      <div className="flex gap-2 mb-4 w-full max-w-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Add a new task"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </div>
      <div className="w-full max-w-md">
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo.text}
            index={index}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            completed={todo.completed}
          />
        ))}
      </div>
    </main>
  );
}
