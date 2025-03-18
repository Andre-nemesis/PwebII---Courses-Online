import React, { useState } from 'react';
import AppRoutes from './routes/Routes';
// import './styles/button.css';
// import './styles/div.css';
// import './styles/elements.css';
// import './styles/footer.css';
// import './styles/form.css';
// import './styles/geral.css';
// import './styles/header.css';
// import './styles/scrollbar.css';
// import './styles/section.css';
// import './styles/text.css';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(!!localStorage.getItem('token'));

  return <AppRoutes isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />;
}

export default App;