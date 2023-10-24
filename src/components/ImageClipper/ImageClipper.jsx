import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import './image-clipper.css';

function initUI(ctx) {
    ctx.strokeStyle = "red"; // Border color
    ctx.lineWidth = 2; // Border width

    ctx.beginPath();
    ctx.arc(200, 200, 150, 0, 2 * Math.PI, false);
    ctx.fill(); // Fill the circle
    ctx.stroke(); // Draw the circle border
    ctx.closePath();
}

function ImageClipper() {
    const [imageSrc, setImageSrc] = useState(null);
    const canvasRef = useRef(null);
    let [ctx, setCanvasCtx] = useState(undefined);

    useLayoutEffect(() => {
        let bla = canvasRef.current.getContext('2d');
        setCanvasCtx();
        initUI(bla);
    }, []);


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                const canvas = canvasRef.current;

                const aspectRatio = img.width / img.height;

                // Set the maximum width and height for the canvas
                const maxWidth = canvas.width;
                const maxHeight = canvas.height;

                // Calculate new dimensions while preserving aspect ratio
                let newWidth, newHeight;

                if (img.width > maxWidth) {
                    newWidth = maxWidth;
                    newHeight = newWidth / aspectRatio;
                } else if (img.height > maxHeight) {
                    newHeight = maxHeight;
                    newWidth = newHeight * aspectRatio;
                } else {
                    newWidth = img.width;
                    newHeight = img.height;
                }

                // Calculate the position to center the image on the canvas
                const x = (canvas.width - newWidth) / 2;
                const y = (canvas.height - newHeight) / 2;

                // Draw the image on the canvas with the new dimensions
                ctx.drawImage(img, x, y, newWidth, newHeight);

            };
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div>
                <canvas ref={canvasRef} width={400} height={400} />
            </div>
            <label htmlFor="image-upload" className="image-upload-button-label">
                Custom Upload
            </label>
            <input type="file" id="image-upload" name="image-upload" accept="image/*" onChange={handleImageUpload} />

        </>
    );
}

export { ImageClipper };
