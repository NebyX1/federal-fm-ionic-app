import { IonApp, setupIonicReact } from "@ionic/react";
import "./theme/main.css";
import Router from "./router/Router";


setupIonicReact();

function App() {
  return (
    <IonApp>
      <Router />
    </IonApp>
  );
}

export default App;