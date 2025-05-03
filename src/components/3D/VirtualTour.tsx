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
      panorama: "https://static.vecteezy.com/system/resources/previews/019/062/597/non_2x/full-spherical-seamless-hdri-360-panorama-in-interior-of-guest-living-room-hall-in-apartment-with-sofa-armchairs-and-dinner-table-in-equirectangular-projection-vr-content-photo.jpg",
      loadingImg: '',
      navbar: [
        'fullscreen'
      ],
    });

    return () => viewer.destroy();
  }, []);

  return (
    <div className='px-[20px]'>
      <div className='rounded-[13px] overflow-hidden' ref={containerRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
}
