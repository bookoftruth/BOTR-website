'use client';

import { useState } from 'react';
import Window from './Windows/Window';
import { windowsConfig } from '@/utils/utils';
import Layout from '../../layout/Layout';
import BottomBar from './BottomBar';

const ImageEditor = () => {
  const [windows, setWindows] = useState(windowsConfig);
  const theme = 'editor';

  const activateWindow = (index) => {
    setWindows((prevWindows) => {
      const activatedWindow = prevWindows[index];
      const wasClosed = activatedWindow.closed;

      const highestZIndex = Math.max(...prevWindows.map((w) => w.zIndex));
      const activatedZIndex = activatedWindow.zIndex;

      const highestOpeningOrder = Math.max(...prevWindows.map((w) => w.openingOrder));
      const activatedOpeningOrder = activatedWindow.openingOrder;

      return prevWindows
        .map((window) =>
          window.zIndex > activatedZIndex
            ? { ...window, zIndex: window.zIndex - 1 }
            : window
        )
        .map((window) =>
          window.openingOrder > activatedOpeningOrder
            ? { ...window, openingOrder: wasClosed ? window.openingOrder - 1 : window.openingOrder }
            : window
        )
        .map((window, i) =>
          i === index
            ? {
                ...window,
                zIndex: highestZIndex,
                openingOrder: wasClosed
                  ? highestOpeningOrder
                  : window.openingOrder,
                active: true,
                closed: false,
                hidden: false,
              }
            : { ...window, active: false }
        );
    });
  };

  const toggleFullScreen = (index) => {
    setWindows((prevWindows) =>
      prevWindows.map((window, i) =>
        i === index ? { ...window, fullScreen: !window.fullScreen } : window
      )
    );
  };

  const closeWindow = (index) => {
    setWindows((prevWindows) =>
      prevWindows.map((window, i) =>
        i === index ? { ...window, closed: true } : window
      )
    );
  };

  const hideWindow = (index) => {
    setWindows((prevWindows) =>
      prevWindows.map((window, i) =>
        i === index ? { ...window, hidden: true, active: false } : window
      )
    );
  };

  return (
    <Layout
      theme={theme}
      activateWindow={activateWindow}
    >
      {windows.map((window, index) => (
        <Window
          key={index}
          zIndex={window.zIndex}
          fullScreen={window.fullScreen}
          toggleFullScreen={toggleFullScreen}
          closed={window.closed}
          closeWindow={closeWindow}
          hidden={window.hidden}
          hideWindow={hideWindow}
          active={window.active}
          activateWindow={activateWindow}
          index={index}
          title={window.title}
          icon={window.icon}
          description={window.description}
        >
          <window.children fullScreen={window.fullScreen} />
        </Window>
      ))}
      <BottomBar theme={theme} windows={windows} activateWindow={activateWindow} />
    </Layout>
  );
};

export default ImageEditor;