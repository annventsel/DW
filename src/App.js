import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ArticlePage from './components/ArticlePage'
import StartPage from './components/StartPage';
import ConfigPage from './components/ConfigPage';
import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';

const DWApp = () => {
  useEffect(() => {
    const handleKeyUp = (event) => {
      switch(event.key) {
        case 'ArrowUp':
          // Прокрутить вверх на один экран
          window.scrollBy(0, -window.innerHeight);
          break;
        case 'ArrowDown':
          // Прокрутить вниз на один экран
          window.scrollBy(0, window.innerHeight);
          break;
        case 'Enter':
          // Функция выбора (в настоящее время не используется)
          break;
        case '#':
          // Прокрутить вниз до навигационной области внизу страницы
          window.scrollTo(0, document.body.scrollHeight);
          break;
        case '0':
          // Прокрутить вверх до верхней части страницы
          window.scrollTo(0, 0);
          break;
        case '*':
          // Перейти к списку языков на странице конфигурации
          window.location.href = '/config';
          break;
        default:
          break;
      }
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <ApolloProvider client={client}> 
    <Router>
      <Routes>
        <Route path="/a/:id" element={<ArticlePage />} />
        <Route path="/s/:id" element={<StartPage />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/" element={<Navigate to="/s/home" />} />
      </Routes>
    </Router>
    </ApolloProvider>
  );
};

export default DWApp;