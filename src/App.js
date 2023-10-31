import './App.css';
import { io } from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import { LiMensaje, UlMensajes } from './components/ui-components';
import Cifrar from './components/Cifrar';

const socket = io('http://localhost:3000');

function App() {
    const [isConnected, setIsConnected] = useState(false);
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        socket.on('connect', () => setIsConnected(true));
        socket.on('chat_message', (data) => {
            setMensajes(mensajes => [...mensajes, data]);
        });

        return () => {
            socket.off('connect');
            socket.off('chat_message');
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (nuevoMensaje) {
            const newMessage = {
                body: nuevoMensaje,
                from: "Me",
            };
            setMensajes(state => [...state, newMessage]);
            setNuevoMensaje("");
            socket.emit("chat_message", nuevoMensaje);
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target.result;
                const newMessage = {
                    body: fileContent, // Contenido del archivo .txt
                    from: "Me",
                };
                setMensajes(state => [...state, newMessage]);
                socket.emit("chat_message", fileContent); // Enviar el contenido del archivo
            };
            reader.readAsText(selectedFile);
        }
    };

    return (
        <div className="App">
            <center>

                <div className='chat'>
                    <h1>Bienvenido al Chat</h1>
                    <h2>Estatus: {isConnected ? 'CONECTADO' : 'NO CONECTADO'}</h2>

                    <UlMensajes>
                        {mensajes.map((mensaje, i) => (
                            <LiMensaje key={i} isMe={mensaje.from === 'Me'}>{mensaje.from}: {mensaje.body}</LiMensaje>
                        ))}
                    </UlMensajes>

                    <input
                        type="text"
                        value={nuevoMensaje}
                        onChange={e => setNuevoMensaje(e.target.value)}
                    />

                    <button onClick={handleSubmit}>Enviar Mensaje</button>
                    <p></p>

                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleFileUpload}>Enviar Contenido de Archivo</button>

                </div>

            </center>
            

            <center><Cifrar/></center>

        </div>
    );
}

export default App;

