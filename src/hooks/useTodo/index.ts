import { useState, useEffect } from 'react';
import { getTodos, State, Todo } from '../../api/todo';

const useTodo = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        fetchTodo();
    }, []);

    async function fetchTodo() {
        const data: Todo[] = await getTodos();
        setTodos(data);
    }

    const addTodo = (text: string) => {
        setTodos([...todos, { id: todos.length, text, isActive: State.ACTIVE }]);
    }

    const cancelTodoByIdx = (idx: number) => {
        setTodos(todos.filter((todo: Todo, todoIdx: number) => todoIdx !== idx));
    }

    return {
        todos, addTodo, cancelTodoByIdx
    }
}

export default useTodo;