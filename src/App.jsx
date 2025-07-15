import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailsPage from './pages/NoteDetailsPage';
import {Route, Routes} from 'react-router';

function App() {
  return (
    <>
      <div className="relative h-full w-full">
        <Routes>
            <Route path='/' element={ <HomePage /> } />
            <Route path='/create' element={ <CreatePage /> } />
            <Route path='/note/:id' element={ <NoteDetailsPage /> } />
        </Routes>
      </div>
    </>
  )
}

export default App
