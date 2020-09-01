import React from 'react';

import { Calendar } from './components/Calendar'

function App() {
  const [date, setDate] = React.useState(null)

  return (
    <div>
      {date && (
        <p>Выбранная дата: {date.toLocaleDateString()}</p>
      )}
      <Calendar onChange={setDate} />

    </div>
  );
}

export default App;
