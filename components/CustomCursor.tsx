import { useEffect, useState } from 'react';
import styled from 'styled-components';

const isMobile = () => {
  const ua = navigator.userAgent;
  return /Android|Mobi/i.test(ua);
};

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  let transform = '';
  let background = '';

  if (linkHovered) {
    transform = 'translate(-50%, -50%) scale(8)';
    background = '#fefefe';
  }

  if (clicked) {
    transform = 'translate(-50%, -50%) scale(0.9)';
    background = '#fefefe';
  }

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => {
      setOpacity(1);
    };

    const onMouseLeave = () => {
      setOpacity(0);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, input, .card').forEach((el) => {
        el.addEventListener('mouseover', () => setLinkHovered(true));
        el.addEventListener('mouseout', () => setLinkHovered(false));
      });
    };

    handleLinkHoverEvents();

    document.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseenter', onMouseEnter);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mousedown', onMouseDown);
    document.body.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mousedown', onMouseDown);
      document.body.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  if (typeof navigator !== 'undefined' && isMobile()) {
    return null;
  }

  return (
    <Cursor
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: `${opacity}`,
        transform: `${transform}`,
        backgroundColor: `${background}`,
      }}
    />
  );
};

const Cursor = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #fefefe;
  border-radius: 100%;
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;

  transition: all 300ms ease;
  transition-property: opacity, background-color, transform, mix-blend-mode;
`;
