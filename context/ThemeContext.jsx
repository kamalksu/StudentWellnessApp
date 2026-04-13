import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const BACKGROUND_THEMES = [
  { id: 'default', label: 'Default', colors: ['#EEF0FF', '#F5E6FF'] },
  { id: 'ocean', label: 'Ocean', colors: ['#E0F7FA', '#E8F5E9'] },
  { id: 'sunset', label: 'Sunset', colors: ['#FFF3E0', '#FCE4EC'] },
  { id: 'forest', label: 'Forest', colors: ['#E8F5E9', '#F1F8E9'] },
  { id: 'night', label: 'Night', colors: ['#E8EAF6', '#EDE7F6'] },
  { id: 'rose', label: 'Rose', colors: ['#FCE4EC', '#F3E5F5'] },
];

export const DEFAULT_QUOTES = [
  'Happiness can be found even in the darkest of times.',
  'You are stronger than you think.',
  'Take a deep breath. You are doing better than you think.',
  'Every day is a fresh start.',
  'Be kind to yourself.',
];

export const DEFAULT_TEMPLATES = [
  { id: '1', label: 'Something I am excited about...', prompt: 'Something I am excited about...' },
  { id: '2', label: 'I felt anxious about...', prompt: 'I felt anxious about...' },
  { id: '3', label: 'To-do plan for this week...', prompt: 'To-do plan for this week...' },
  { id: '4', label: 'What am I grateful for?', prompt: 'What am I grateful for today?' },
  { id: '5', label: 'What stressed me out today?', prompt: 'What stressed me out today?' },
];

export function ThemeProvider({ children }) {
  const [backgroundTheme, setBackgroundTheme] = useState(BACKGROUND_THEMES[0]);
  const [isDarkMode, setIsDarkMode] = useState(false); // ready for later
  const [quotes, setQuotes] = useState(DEFAULT_QUOTES);
  const [templates, setTemplates] = useState(DEFAULT_TEMPLATES);

  // Load saved preferences on startup
  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('backgroundTheme');
      const savedQuotes = await AsyncStorage.getItem('quotes');
      const savedTemplates = await AsyncStorage.getItem('templates');
      const savedDarkMode = await AsyncStorage.getItem('darkMode');

      if (savedTheme) setBackgroundTheme(JSON.parse(savedTheme));
      if (savedQuotes) setQuotes(JSON.parse(savedQuotes));
      if (savedTemplates) setTemplates(JSON.parse(savedTemplates));
      if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode));
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const updateBackgroundTheme = async (theme) => {
    setBackgroundTheme(theme);
    await AsyncStorage.setItem('backgroundTheme', JSON.stringify(theme));
  };

  const updateDarkMode = async (value) => {
    setIsDarkMode(value);
    await AsyncStorage.setItem('darkMode', JSON.stringify(value));
  };

  const updateQuotes = async (newQuotes) => {
    setQuotes(newQuotes);
    await AsyncStorage.setItem('quotes', JSON.stringify(newQuotes));
  };

  const updateTemplates = async (newTemplates) => {
    setTemplates(newTemplates);
    await AsyncStorage.setItem('templates', JSON.stringify(newTemplates));
  };

  return (
    <ThemeContext.Provider value={{
      backgroundTheme,
      isDarkMode,
      quotes,
      templates,
      updateBackgroundTheme,
      updateDarkMode,
      updateQuotes,
      updateTemplates,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);