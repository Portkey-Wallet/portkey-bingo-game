import { createContext } from 'react';
import { AppContextType } from './type';

export const AppContext = createContext<AppContextType | null>(null);
