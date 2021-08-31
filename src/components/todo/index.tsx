import { useState } from 'react';
import useTodo from '../../hooks/useTodo';

const Todo = (props: any) => {
    const [text, setText] = useState<string>('');
    const { todos, addTodo, cancelTodoByIdx } = useTodo();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const onSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTodo(text);
            setText('');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={onChangeHandler}
                onKeyUp={onSubmit}
            />
            <div>
                {
                    todos.map((todo, idx) => (
                        <div key={idx} >
                            <input type="checkbox" onChange={() => cancelTodoByIdx(idx)}> </input>
                            < label > {todo.text} </label>
                            < span onClick={() => cancelTodoByIdx(idx)}> X </span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Todo;