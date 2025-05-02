'use client'
// Redux for state management
import { store } from "../hooks/react-redux/store";
import { Provider } from 'react-redux';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  );
} 