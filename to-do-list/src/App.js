
import './App.css';
import TodoForms from './component/TodoForms';
import TodoList from './component/TodoList';
import TodoProvider from './context/TodoProvider';

function App() {
  return (
    <div >
      <header className='App'>
        <h1>TODO List</h1>
       
       <TodoProvider>
        <TodoForms/>
        <TodoList/>

       </TodoProvider>
       </header>
    </div>
  );
}

export default App;
