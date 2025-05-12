"use client";

import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signature = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const getMousePos = (canvas: HTMLCanvasElement, evt: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (evt.clientX - rect.left) * (canvas.width / rect.width),
      y: (evt.clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getMousePos(canvas, e);
    setLastPosition(pos);

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getMousePos(canvas, e);
    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    setLastPosition(pos);
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsSaved(false);
    toast.info('امضا پاک شد');
  };

  const saveSignature = async () => {
    if (!canvasRef.current) return;

    try {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      setIsSaved(true);
      toast.success('امضا با موفقیت ثبت شد!');
    } catch (error) {
      console.error('خطا در ثبت امضا:', error);
      toast.error('خطا در ثبت امضا!');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <ToastContainer position="top-center" rtl={true} />

      <h2 className="text-xl font-bold text-gray-800 mb-4">ثبت امضا</h2>

      <div className="mb-4">
        <canvas
          ref={canvasRef}
          width={500}
          height={200}
          className="border border-gray-300 rounded-md w-full h-48 bg-white cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
        />
      </div>

      <div className="flex justify-between gap-2">
        <button
          onClick={clearSignature}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition flex-1"
        >
          پاک کردن
        </button>

        <button
          onClick={saveSignature}
          disabled={isSaved}
          className={`px-4 py-2 rounded-md transition flex-1 ${
            isSaved ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isSaved ? 'امضا ثبت شد' : 'ثبت امضا'}
        </button>
      </div>
    </div>
  );
};

export default Signature;