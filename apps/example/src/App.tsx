import { Theme } from '@radix-ui/themes';
import "@radix-ui/themes/styles.css";
import { DialogProvider } from 'react-dialog-hub';
import './App.css';
import { MUIDialogsSection } from './dialogs/mui';
import { PlainDialogsSection } from './dialogs/plain';
import { RadixDialogsSection } from './dialogs/radix';

//
export default function App() {
  return <>
    <Theme>
      <DialogProvider>
        <div className="main-container">
          <main>
            <h1>React Dialog Hub</h1>
            <PlainDialogsSection />
            <MUIDialogsSection />
            <RadixDialogsSection />
          </main>
        </div>
      </DialogProvider>
    </Theme>
  </>
}


