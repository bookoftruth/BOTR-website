'use client';

import Window from './Window';

const PfpEditor = ({ windows, setWindows }) => {
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
        i === index ? { ...window, hidden: true } : window
      )
    );
  };

  return (
    <>
      {windows.map((window, index) => (
        <Window
          key={window.id}
          fullScreen={window.fullScreen}
          toggleFullScreen={toggleFullScreen}
          closed={window.closed}
          closeWindow={closeWindow}
          hidden={window.hidden}
          hideWindow={hideWindow}
          index={index}
          title={window.title}
          icon={window.icon}
        >
          <window.children />
        </Window>
      ))}
    </>
  );
};

export default PfpEditor;