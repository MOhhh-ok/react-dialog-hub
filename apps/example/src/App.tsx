import { DialogProvider } from 'react-dialog-hub';
import './app.css';
import { PlainDialogsSection } from './dialogs/plain';

export default function App() {
  return <DialogProvider>
    <main>
      <h1>React Dialog Hub</h1>
      <PlainDialogsSection />
    </main>
  </DialogProvider>
}


