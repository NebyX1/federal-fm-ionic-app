// Importamos el Router de Ionic para conseguir los efectos de transición entre páginas nativos
import { IonReactRouter } from "@ionic/react-router";

// Importamos desde react-router-dom
import { Redirect, Route, Switch } from "react-router-dom";

// Importamos los elementos de Ionic para estilizar las barras de navegación
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonContent,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonPage,
} from "@ionic/react";

// Importamos los iconos que usaremos en nuestra barra de navegación
import {
  home as homeIcon,
  settings as settingsIcon,
  call as callIcon,
} from "ionicons/icons";

// Importamos los componentes que usaremos para las rutas de nuestra app
import Home from "../pages/Home";

const Router = () => {
  return (
    <IonReactRouter>
      {/* <IonTabs> */}
        <IonRouterOutlet>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          {/* Agrega más rutas según sea necesario */}
        </IonRouterOutlet>
        {/* <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={homeIcon} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="contact" href="/contact">
            <IonIcon icon={callIcon} />
            <IonLabel>Contact</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settingsIcon} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar> */}
      {/* </IonTabs> */}
    </IonReactRouter>
  );
};

export default Router;
