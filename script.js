    // Acceder al video y al marco
    const video = document.getElementById('video');
    const frameImg = document.getElementById('frame-img');

    // Accedemos al botón de captura
    const captureBtn = document.getElementById('capture-btn');

    // Obtener acceso a la cámara
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            // Asignar el stream de la cámara al elemento de video
            video.srcObject = stream;
            video.play();
        })
        .catch(function(error) {
            console.log('Se produjo un error al acceder a la cámara: ', error);
        });

    // Agregar un evento click al botón de captura
    captureBtn.addEventListener('click', function() {
        // Crear un lienzo para capturar la imagen y el marco
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Dibujar la imagen del video en el lienzo
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Dibujar el marco en el lienzo
        context.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

        // Crear un enlace para descargar la imagen
        const link = document.createElement('a');
        link.href = canvas.toDataURL(); // Obtener la URL de la imagen en formato base64
        link.download = 'foto_con_marco.png'; // Nombre del archivo de descarga

        // Simular un clic en el enlace para iniciar la descarga
        link.click();
    });

    // Función para verificar el tipo de dispositivo
    function verificarDispositivo() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // Verificar si es un dispositivo iOS
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            // Mostrar mensaje de incompatibilidad en un modal
            var modal = document.getElementById("modalIncompatible");
            modal.style.display = "block";
        } else {
            // No es un dispositivo iOS, continuar con el flujo normal de la página
            alert("El dispositivo es compatible");
        }
    }