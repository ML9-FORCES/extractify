import React, { useEffect, useRef, useContext } from 'react'
import { CanvasContext } from '../../pages/Display/Display';

function Canvas({ imgPath, height, width, keys, data }) {
    const canvas = useRef(null);
    const { setCtx } = useContext(CanvasContext)

    const drawimg = (context) => {
        const image = new Image();
        image.src = imgPath;
        image.onload = () => {
            context.drawImage(image, 0, 0, width, height);
        };
    }
    useEffect(() => {
        const context = canvas.current.getContext('2d');
        setCtx(context);
        drawimg(context);
    }, []);

    return (
        <div>
            <canvas ref={canvas} height={height} width={width} />
        </div>
    )
}

export default Canvas
