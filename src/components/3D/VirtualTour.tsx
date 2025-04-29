"use client"
import { useEffect, useRef } from 'react';
import PhotoSphereViewer from 'photo-sphere-viewer';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';

export default function VirtualTour() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new PhotoSphereViewer.Viewer({
      container: containerRef.current,
      panorama: 'https://static.vecteezy.com/system/resources/previews/015/631/794/non_2x/full-hdri-360-panorama-view-in-bedroom-room-in-luxury-elite-vip-expensive-hotel-or-apartment-in-equirectangular-seamless-spherical-projection-vr-ar-content-photo.jpg',
      loadingImg: '',
      navbar: [
        'fullscreen'
      ],
    });

    return () => viewer.destroy();
  }, []);

  return (
      <div className='rounded-[13px] overflow-hidden' ref={containerRef} style={{ width: '100%', height: '100vh' }} />
  );
}
