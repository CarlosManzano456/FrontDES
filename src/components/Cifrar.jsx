import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import '../Style/style.css';


export default function Cifrar() {
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const [password, setPassword] = useState('');
    const [decryptedText, setDecryptedText] = useState('');

    const leerDes = (event) => {
        const { files } = event.target;
        if (files.length > 0) {
            const selectedFile = files[0];
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onload = (e) => {
                const fileText = e.target.result;
                setText(fileText);
            };
            reader.readAsText(selectedFile);
        }
    };

    const cifraDes = () => {
        if (password.length !== 8) {
            alert('La clave debe tener 8 caracteres');
            return;
        }

        const encryptedText = CryptoJS.DES.encrypt(text, password).toString();
        descargarArchivo(encryptedText, 'TextoCifrado.txt');
    };

    const descifraDes = () => {
        if (password.length !== 8) {
            alert('La clave debe tener 8 caracteres');
            return;
        }

        const decryptedBytes = CryptoJS.DES.decrypt(text, password);
        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        descargarArchivo(decryptedText, 'TextoDescifrado.txt');
    };

    const descargarArchivo = (contenido, nombreArchivo) => {
        const blob = new Blob([contenido], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = nombreArchivo;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="papu">
            <header className="messi">
                <h1>CIFRADO DES</h1>
                <h3>Ayala Gomez NIcolas Iñaki</h3>
                <h3>Carlos Emilio Manzano Solis</h3>
            </header>

            <div className="nico">
                <form>
                    <p>Selecciona un archivo de texto:</p>
                    <input type="file" id="archivodes" onChange={leerDes} className="carlos" />
                    <p>Ingresar clave:</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Solo 8 caracteres!"
                        maxLength="8"
                        minLength="8"
                        className="pepe"
                    />
                    <div className="botones">
                        <input
                            className="form-control"
                            type="button"
                            id="button"
                            value="Cifrar"
                            onClick={cifraDes}
                            style={{ marginRight: '1.5rem' }}
                        />
                        <input
                            className="form-control"
                            type="button"
                            id="button"
                            value="Descifrar"
                            onClick={descifraDes}
                            style={{ marginRight: '1.5rem' }}
                        />
                        <input type="reset" id="button" value="Limpiar" />
                    </div>
                </form>
            </div>
        </div>
    );
}

