import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

const TestFabric: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const startCoordsRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Xác định kích thước canvas
        const canvasWidth = 800;
        const canvasHeight = 600;

        const fabricCanvas = new fabric.Canvas(canvas, {
            width: canvasWidth,
            height: canvasHeight,
            selection: false,
        });

        // Tạo và thêm tấm ảnh vào canvas
        // fabric.Image.fromURL('https://hapobeauty.vn/upload/photos/shares/news-11-2023/hinh-nen-anime-3.png', (img) => {
        //     // Đặt vị trí của ảnh để nó căn giữa canvas
        //     const width = typeof img.width !== 'undefined' ? img.width : 0;
        //     const height = typeof img.height !== 'undefined' ? img.height : 0;

        //     img.set({
        //         left: canvasWidth / 2 - width / 2,
        //         top: canvasHeight / 2 - height / 2,
        //         selectable: false,
        //         evented: false,
        //     });
        //     fabricCanvas.add();
        // });

        fabricCanvas.on('mouse:down', function (options) {
            const pointer = fabricCanvas.getPointer(options.e);
            startCoordsRef.current = { x: pointer.x, y: pointer.y };
        });

        fabricCanvas.on('mouse:up', function (options) {
            const pointer = fabricCanvas.getPointer(options.e);
            const endX = pointer.x;
            const endY = pointer.y;

            const selectedArea = {
                startX: startCoordsRef.current.x,
                startY: startCoordsRef.current.y,
                endX,
                endY,
            };

            console.log('Selected Area:', selectedArea);
        });

        return () => {
            fabricCanvas.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} width={800} height={600} style={{ backgroundColor: 'rgb(5, 128, 52)' }}></canvas>;
};

export default TestFabric;
