import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfLabel } from '../../Redux/action';
import { fabric } from 'fabric';

interface DataImg {
    id: number;
    name: string;
    url: string;
}
interface Props {
    dataImg: DataImg;
    checkMouse: boolean;
}

const Fabric: React.FC<Props> = ({ ...Props }) => {
    const dispatch = useDispatch();
    const checkHandleMouse = useSelector((state: any) => state.checkHandleMouse);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const startCoordsRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        console.log(checkHandleMouse);

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Xác định kích thước canvas
        const fabricCanvas = new fabric.Canvas(canvas, {
            width: canvas.width,
            height: canvas.height,
            selection: false,
        });

        fabricCanvas.on(Props.checkMouse ? 'mouse:down' : '', function (options) {
            const pointer = fabricCanvas.getPointer(options.e);
            startCoordsRef.current = { x: pointer.x, y: pointer.y };
        });

        fabricCanvas.on(Props.checkMouse ? 'mouse:up' : '', function (options) {
            const pointer = fabricCanvas.getPointer(options.e);
            const endX = pointer.x;
            const endY = pointer.y;

            const selectedArea = {
                // label: inputValue,

                startX: startCoordsRef.current.x,
                startY: startCoordsRef.current.y,
                endX,
                endY,
            };

            // Vẽ hình chữ nhật
            const rect = new fabric.Rect({
                left: Math.min(startCoordsRef.current.x, endX),
                top: Math.min(startCoordsRef.current.y, endY),
                width: Math.abs(endX - startCoordsRef.current.x),
                height: Math.abs(endY - startCoordsRef.current.y),
                stroke: 'red', // Màu viền
                strokeWidth: 2,
                fill: 'transparent',
                selectable: true, // Không chọn được
                evented: true, // Không tương tác được
                opacity: 1,
            });
            rect.bringToFront();
            // Thêm hình chữ nhật vào canvas
            fabricCanvas.add(rect);

            // console.log('Selected Area:', selectedArea);
            dispatch(getInfLabel(selectedArea));
        });

        return () => {
            fabricCanvas.dispose();
        };
    }, [Props.dataImg]);

    return (
        <canvas
            width={870}
            height={410}
            ref={canvasRef}
            style={{
                border: '1px solid black',
            }}
        ></canvas>
    );
};

export default Fabric;
