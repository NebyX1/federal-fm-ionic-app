import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IonText } from '@ionic/react';

const Metadata = () => {
  const [currentTrack, setCurrentTrack] = useState("Cargando información...");

  useEffect(() => {
    const fetchCurrentTrack = () => {
      console.log("Fetching track info...");
      axios.get('/api/status-json.xsl')
        .then(response => {
          console.log("Track info response:", response.data);
          if (response.data && response.data.icestats && response.data.icestats.source && response.data.icestats.source.length > 0) {
            const trackInfo = response.data.icestats.source[1].server_name;
            setCurrentTrack(trackInfo);
          } else {
            console.error("Unexpected response structure:", response.data);
            setCurrentTrack("Información no disponible");
          }
        })
        .catch(error => {
          console.error("Error fetching track info:", error);
          setCurrentTrack("No se pudo cargar la información");
        });
    };

    fetchCurrentTrack();
    const interval = setInterval(fetchCurrentTrack, 30000); // Actualiza cada 30 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <div style={{ color: 'white', marginTop: '20px' }}>
      <IonText>{currentTrack}</IonText>
    </div>
  );
};

export default Metadata;
