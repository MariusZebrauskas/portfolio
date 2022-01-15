import React, { useState, useEffect } from 'react';

import { Li, P, MyWorkIcon } from '../menustyles';

const MyWork = ({
  data,
  animationTimer,
  activatemenu,
  activework,
  adjustImg,
  openWelcome,
  openImgPortfolio,
  setAudioSound,
}) => {
  const [click, setClick] = useState(false);
  const openMenuHandler = () => {
    if (click) {
      return;
    }
    setClick(true);
    adjustImg();
    activatemenu(false, true, false);
    openImgPortfolio('myWork');
    setAudioSound('myWork');
  };
  useEffect(() => {
    if (click) {
      setTimeout(() => {
        setClick(false);
      }, animationTimer);
    }
  }, [click]);
  return (
    <Li
      openWelcome={openWelcome}
      activework={activework}
      myWork
      click={click}
      onClick={openMenuHandler}
    >
      <MyWorkIcon />
      <P>{data}</P>
    </Li>
  );
};

export default MyWork;
