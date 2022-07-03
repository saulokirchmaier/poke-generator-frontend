import { Routes, Route } from 'react-router-dom';

import { Main, All } from './Pages';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/all' element={<All />} />
    </Routes>
  )
}

export default App;
