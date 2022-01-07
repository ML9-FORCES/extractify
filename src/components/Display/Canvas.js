import React, { useEffect, useRef, useContext, memo } from 'react'
import { CanvasContext } from '../../pages/Display/Display';

function Canvas({ imgPath, height, width }) {
    const canvas = useRef(null);
    const { setCtx } = useContext(CanvasContext)

    const drawing = (context) => {
        const image = new Image();
        image.src = imgPath;
        image.onload = () => {
            context.scale(0.5, 0.5)
            context.drawImage(image, 0, 0, 800, 1000);
        };
    }

    useEffect(() => {
        const context = canvas.current.getContext('2d');
        setCtx(context);
        drawing(context);
    }, []);

    return (
        <div>
            <canvas ref={canvas} height={height} width={width} />
        </div>
    )
}

export default memo(Canvas)
