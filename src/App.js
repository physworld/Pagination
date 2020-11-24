import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App(){
  const [messages, setMessages] = useState([])
  const [currentPage, setCurrentPage ] = useState(1)
  const [fetching, setFetching] = useState(true)



useEffect(( ) => {
  if(fetching) {
    axios.get(`https://jsonplaceholder.typicode.com/comments?_limit=23&_page=${currentPage}`)
    .then(response => 
      setMessages([...messages, ...response.data]),
      setCurrentPage( prevState => prevState + 1))

      .finally( () => setFetching (false));
  }  
},[fetching])

useEffect(() => {
  document.addEventListener('scroll', scrollHandler)
  return function()
  {
    document.removeEventListener('scroll', scrollHandler)
  };
}, [])

  const scrollHandler = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 ){
      setFetching(true);
    }

  }

  return(
    <div className = {'app'}>
      {messages.map(message =>
        <div key={message.id}>
            <div className = "message"> {message.id}. {message.body}</div>
        </div>
        )}
    </div>
  );
}

export default App;