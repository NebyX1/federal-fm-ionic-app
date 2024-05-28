import React, { useState, useRef, useEffect } from "react";

// Importamos los componentes de Ionic que vamos a usar
import {
  IonPage,
  IonContent,
  IonIcon,
  IonRange,
  IonSpinner,
  IonText,
  IonButton,
  IonAlert,
} from "@ionic/react";

// Importamos los estilos de la página Home
import styles from "../theme/modules/main.module.css";

// Importamos los iconos de Ionicons que vamos a usar
import { pauseCircleOutline as pauseIcon } from 'ionicons/icons';
import { playCircleOutline as playIcon } from 'ionicons/icons';
import { heart } from 'ionicons/icons';
import { powerOutline } from 'ionicons/icons';

// Importamos el componente de Metadata que no vamos a usar por el momento
import Metadata from "../components/Metadata";

// Importamos el módulo de App de Capacitor
import { App } from "@capacitor/app";

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const audioRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);

  // Cerramos la aplicación al presionar el botón de apagado
  const handleCloseApp = () => {
    App.exitApp();
  };


  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const handleCanPlay = () => {
      setIsLoading(false);
      setHasLoaded(true);
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: "Federal FM 99.1",
        });
        navigator.mediaSession.setActionHandler("play", togglePlayPause);
        navigator.mediaSession.setActionHandler("pause", togglePlayPause);
      }
    };

    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [volume]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      if ("mediaSession" in navigator) {
        navigator.mediaSession.playbackState = "paused";
      }
    } else {
      if (!hasLoaded) {
        setIsLoading(true);
      }
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          if ("mediaSession" in navigator) {
            navigator.mediaSession.playbackState = "playing";
          }
        })
        .catch((error) => {
          console.error("Error al reproducir el audio:", error);
          setIsLoading(false);
        });
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.detail.value / 100;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className={styles.background}></div>
        <IonButton
          onClick={() => setShowAlert(true)}
          color="success"
          shape="round"
          style={{ position: "absolute", top: 10, right: 60 }}
        >
           <IonIcon slot="icon-only" icon={heart}></IonIcon>
        </IonButton>
        <IonButton
          onClick={handleCloseApp}
          color="danger"
          shape="round"
          style={{ position: "absolute", top: 10, right: 10 }}
        >
           <IonIcon slot="icon-only" icon={powerOutline}></IonIcon>
        </IonButton>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Creado por:"}
          message={"Neby_X"}
          buttons={["OK"]}
        />
        <div className="text-center">
          <div className={styles.logo}></div>
          {/* <Metadata /> */}
          <div className={styles.buttons}>
            <div
              style={{
                backgroundColor: "transparent",
                boxShadow: "none",
                border: "none",
                padding: 0,
                margin: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={togglePlayPause}
            >
              <IonIcon
                icon={isPlaying ? pauseIcon : playIcon}
                style={{ fontSize: "64px", color: "#fff" }}
              />
            </div>
            <div className="mt-4">
              <IonRange value={volume * 100} onIonChange={handleVolumeChange} />
            </div>
          </div>
          {isLoading && (
            <div className="mt-2">
              <IonSpinner color="light" />
              <IonText color="light">Cargando...</IonText>
            </div>
          )}
          <audio ref={audioRef}>
            <source
              src="http://usa15.ciudaddigital.com.uy:8040/FederalFM"
              type="audio/mpeg"
            />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
