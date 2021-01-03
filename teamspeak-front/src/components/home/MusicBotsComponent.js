import React from 'react';
import Typography from '@material-ui/core/Typography';
import ScrollAnimation from 'react-animate-on-scroll';
import { Grid, Box } from '@material-ui/core';
export default function MusicBotsComponent(){
    return(
        <Grid style={{marginTop: 30}} item xs={11} sm={10} md={9} lg={7}>
            <Box display={{xs:'none', md: 'block'}}>
                    
            <ScrollAnimation offset={80} animateOnce={true} animateIn="fadeIn">

                    <Typography variant="h5">
    
                    MusicBots para nuestros usuarios.
                    </Typography>
                <p className="lead">* Cualquier usuario puede usar los bots desde el chat de ts3.</p>
                <p>Para usar los bots de música, ya dentro del servidor sólo debes enviarle un mensaje por
                chat privado al bot haciendo doble click en él y luego escribiendo el comando deseado seguido
                de enter.</p>
                </ScrollAnimation>
                <div className="row">
                <ScrollAnimation offset={80} animateOnce={true} animateIn="fadeInLeft">
                <div className="col">
                <Typography variant="h6">Modos de uso.</Typography>
                    <p className="lead">
                        Puedes usar los bots para reproducir música desde <b>youtube</b> o desde una emisora de <b>radio online</b>, o bien subir música desde el computador (requiere cuenta externa, contactar admin).
                    </p>
                    <p>
                        <b>!come</b> traer al bot hacia el canal donde te encuentras.<br/>
                        <b>!goaway</b> devuelve al bot hacia el canal por defecto (lobby)
                    </p>

                </div>
                </ScrollAnimation>
                </div>
                
                <div className="py-4 row">
                <div className="col">
                <ScrollAnimation offset={80} animateOnce={true} animateIn="fadeInRight">
                    <Typography variant="h6">Comandos disponibles</Typography>
                    <div className="py-2">
                    <h3 className="lead"><b>Youtube Music</b></h3>
                    <p>
                        Sólo ingresa el comando con la opción que desees con el formato <b>!comando opcion</b>.<br/>
                        !yt https://www.youtube.com/watch?v=hHUbLv4ThOo
                    </p>
                    </div>
                    </ScrollAnimation>
                    <div className="">
                    <ScrollAnimation offset={80} animateOnce={true} animateIn="fadeInUp">
                    <table className="py-2 table-striped table-hover">
                        <thead>
                            <tr>
                             <th className="musicbot-table-col">Comando</th>
                        
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                        <td>!playing</td>
                        <td>Muestra la canción que se está reproduciendo actualmente</td>
                        </tr>
                        <tr>
                        <td>!next</td>
                        <td>reproducción de la siguiente pista (solo cuando una lista de reproducción está activa)</td>
                        </tr>
                        <tr>
                        <td>!prev</td>
                        <td>reproduce la pista anterior (solo cuando una lista de reproducción está activa)</td>
                        </tr>
                        <tr>
                        <td>!search "nombrecancion/id"</td>
                        <td>buscar pistas</td>
                        </tr>
                        <tr>
                        <td>!play "nombrecancion/id"</td>
                        <td>reproduce una pista por su id o busca una pista y reproduce la primera coincidencia</td>
                        </tr>
                        <tr>
                        <td>!queue "nombrecancion/id"</td>
                        <td>encolar una pista por su id o buscar una pista y encolar la primera coincidencia</td>
                        </tr>
                        <tr>
                        <td>!volume up </td>
                        <td>aumentar el volumen</td>
                        </tr>
                        <tr>
                        <td>!volume down</td>
                        <td>bajar el volumen</td>
                        </tr>
                        <tr>
                        <td>!volume "valor"</td>
                        <td>establece el volumen en "valor" (entre 0 y 100)</td>
                        </tr>
                        <tr>
                        <td>!playlist "nombreplaylist"</td>
                        <td>comienza a reproducir la lista de reproducción "nombreplaylist"</td>
                        </tr>
                        <tr>
                        <td>!say "mensaje"</td>
                        <td>usa texto a voz (si está configurado) para decir el texto dado</td>
                        </tr>
                        <tr>
                        <td>!qyt "url"</td>
                        <td>encolar un "url" a través de youtube-dl externo (si está habilitado); cuidado: el archivo se descargará primero y luego se reproducirá, por lo que puede haber un ligero retraso antes de que comience la reproducción</td>
                        </tr>
                        <tr>
                        <td>!yt "url"</td>
                        <td>reproduce un "url" a través de youtube-dl externo (si está habilitado); cuidado: el archivo se descargará primero y luego se reproducirá, por lo que puede haber un ligero retraso antes de que comience la reproducción</td>
                        </tr>
                        <tr>
                        <td>!ytdl "url"</td>
                        <td>reproduce un "url" a través de youtube-dl externo (si está habilitado); cuidado: el archivo se descargará primero y luego se reproducirá, por lo que puede haber un ligero retraso antes de que comience la reproducción; Además, el archivo será almacenado.</td>
                        </tr>
                        <tr>
                        <td>!qytdl "url"</td>
                        <td>agrega un "url" a través de youtube-dl externo (si está habilitado) a la cola; cuidado: el archivo se descargará primero y luego se pondrá en cola, por lo que puede haber un ligero retraso antes de que comience la reproducción; Además, el archivo será almacenado.</td>
                        </tr>
                    </tbody>
                    </table>
                    </ScrollAnimation>
                </div>
                </div>
                </div>
                <div className="py-4 row">
                <ScrollAnimation offset={80} animateOnce={true} animateIn="fadeIn">
                <div className="col">
                    <h3 className="lead"><b>Radio Streaming</b></h3>
                    <p>
                        Puedes reproducir una radio en streaming enviándole un mensaje de chat al bot, con el comando <b>!stream urlradio</b>. Algunos ejemplos y radios Chilenas son las que se presentan a continuación.<br/>
                        Ejemplo: !stream https://redirector.dps.live/disney/mp364k/icecast.audio
                    </p>
                    <table className="table-striped table-hover">
                        <thead>
                        <tr>
                        <th className="musicbot-table-col">Radio</th>
                        <th>URL Streaming</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                        <td>40 Principales 95.2 FM</td>
                        <td>http://18493.live.streamtheworld.com/LOS40_CHILE_SC</td>
                        </tr>
                        <tr>
                        <td>ADN Radio Chile 91.7 FM</td>
                        <td>http://18553.live.streamtheworld.com/ADNAAC_SC</td>
                        </tr>
                        <tr>
                        <td>Digital FM</td>
                        <td>https://unlimited11-cl.dps.live/digitalfm/aac/icecast.audio</td>
                        </tr>
                        <tr>
                        <td>Radio Disney 104.9 FM</td>
                        <td>https://redirector.dps.live/disney/mp364k/icecast.audio</td>
                        </tr>
                        <tr>
                        <td>Romantica 104.1 FM</td>
                        <td>https://redirector.dps.live/romantica/mp3/icecast.audio</td>
                        </tr>
                        <tr>
                        <td>Radio Imagina 88.1 FM</td>
                        <td>http://14943.live.streamtheworld.com/IMAGINAAAC_SC</td>
                        </tr>
                        <tr>
                        <td>Radio Universal 94.7 FM</td>
                        <td>http://s00.midns.net/pitrufquenApp</td>
                        </tr>
                        <tr>
                        <td>Radio Paulina 89.3 FM</td>
                        <td>http://185.105.4.100:8141</td>
                        </tr>
                        </tbody>
                    </table>
                   
                </div>
                </ScrollAnimation>
                </div>
                <div data-aos="fade-zoom" data-aos-duration="1000" className="row">
                <div className="col">
                    <p><b>No olvides ingresar el comando completo indicando la acción a realizar con el "!acción opción" </b></p>
                    <p>Si se presenta algún problema, o quieres agregar alguna otra radio no dudes en hablarnos.</p>
                </div>
                </div>
            </Box>
            </Grid>
    )
}