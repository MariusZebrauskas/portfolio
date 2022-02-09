import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ClipLoader from 'react-spinners/ClipLoader';
import cv from './cv.png';
import axios from 'axios';
import {
  Freelance,
  H1,
  H12,
  Header,
  Ofice,
  Remote,
  Wrapper,
  WrapperHeader,
  P,
  WrapperIconsMain,
  IconWrapper,
  FormSubmit,
  NameAndEmail,
  Input,
  Button,
  PButon,
  H14,
  TextArea,
  H1Connect,
  WrapperIconConnect,
  GithubIcon,
  LinkedInIcon,
  Cv,
  IconWrapperHover,
  WrapperCv,
  ImgCv,
  WrapperX,
  X,
  PHover,
} from './stylesContat';
import MessageBeenSend from './MessageBeenSend';
import Warning from '../../shared/warning/Warning';

const Contatc = ({ setOpenWelcome, setAudioSound }) => {
  // loading color
  const [color, setColor] = useState('#334455');
  const onMouseEnter = () => {
    setColor('white');
  };
  const onMouseLeave = () => {
    setColor('#334455');
  };
  // loading
  const [loading, setLoading] = useState(false);
  // error
  const [error, setError] = useState(false);

  // message info
  let name = useRef();
  let email = useRef();
  let message = useRef();
  // if message been send turn on thank you pages
  const [messageSend, setMessageSend] = useState(false);
  // chek background color by input value "" or "text" or ""
  const [nameInput, setNameInput] = useState(undefined);
  const [emailInput, setEmailInput] = useState(undefined);
  const [messageInput, setMessageInput] = useState(undefined);
  const onChangeHandler = (props) => {
    // this function sets background color when add text on input
    if (props === 'name') {
      if (!name.current.value) {
        return setNameInput(undefined);
      }
      return setNameInput(name.current.value);
    }
    if (props === 'email') {
      if (!email.current.value) {
        return setEmailInput(undefined);
      }
      return setEmailInput(email.current.value);
    }
    if (props === 'message') {
      if (!message.current.value) {
        return setMessageInput(undefined);
      }
      return setMessageInput(message.current.value);
    }
  };

  useEffect(() => {
    // scroll up on render
    window.scroll(0, 0);
    // change state to open image deep
    setOpenWelcome('deep');
    return () => {};
  }, []);
  // message to backend
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessageSend(false);
    axios
      .post('/message', {
        name: name.current.value,
        email: email.current.value,
        message: message.current.value,
      })
      .then((response) => {
        if (response.data.success) {
          console.log('i run response code 200');
          console.log('response:', response);
          setAudioSound('email');
          setMessageSend(true);
          setLoading(false);
          setError(false);
        } else {
          setLoading(false);
          setError(true);
          throw new Error('message not been send');
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        console.log(error);
      });
  };

  useEffect(() => {
    gsap.fromTo(
      '.animate',
      {
        opacity: 0,
        y: '2rem',
      },
      {
        delay: 0.5,
        opacity: 1,
        y: 0,
        stagger: 0.2,
      }
    );
  }, []);

 // audio on clikc links
 const linkAudioHandler = (params) => {
  console.log('params:', params)
  if (params === 'gitAudio') {
    hoverGit.reverse();
    return setAudioSound(params);
  }
  if (params === 'linkedAudio') {
    hoverLinkt.reverse();
    return setAudioSound(params);
  }
  if (params === 'resumeAudio') {
    hoverResume.reverse();
    return setAudioSound(params);
  }
  
};


  // onclick animation
  const onClick = () => {
    let tl = gsap.timeline();
    tl.to('.button', {
      duration: 0.2,
      scale: 1.01,
      ease: 'back.out(1.7)',
    }).to('.button', {
      duration: 0.2,
      scale: 1,
      ease: 'back.out(1.7)',
    });
  };
  
  // show  hide cv handler
  
  const cvHandler = (swich) => {
    linkAudioHandler('resumeAudio');
    let tl2 = gsap.timeline();
    if (swich === 'turnON') {
      tl2
        .fromTo(
          '.animateFadeIN',
          {
            opacity: 0,
            zIndex: -10000,
          },
          {
            duration: 0.1,
            opacity: 1,
            zIndex: 10000,
          }
        )
        .fromTo(
          '.animatePopUp',
          {
            opacity: 0,
            scale: 0.4,
          },
          {
            delay: 0.1,
            opacity: 1,
            scale: 1,
            stagger: 0.5,
          }
        );
    }
    if (swich === 'turnOFF') {
      tl2
        .fromTo(
          '.animatePopUp',
          {
            opacity: 1,
            scale: 1,
          },
          { duration: 0.5, opacity: 0, scale: 0.4, stagger: 0.1, ease: 'power4.out' }
        )
        .fromTo(
          '.animateFadeIN',
          {
            opacity: 1,
            zIndex: 10000,
          },
          {
            delay: 0.2,
            duration: 0.05,
            opacity: 0,
            zIndex: -10000,
          },
          '<'
        );
    }
  };
  // hover links animationTimer
  // GIT HOVER
  let duration = 0.4;
  let hoverGit = gsap.fromTo(
    '.bounceGit',
    {
      scale: 1,
    },
    {
      scale: 0,
      repeat: -1,
      yoyo: true,
      paused: true,
      duration: duration,
      backgroundColor: '#7089a1',
    }
  );
  // LINKEED HOVER
  let hoverLinkt = gsap.fromTo(
    '.bounceLinked',
    {
      scale: 1,
    },
    {
      scale: 0,
      repeat: -1,
      yoyo: true,
      paused: true,
      duration: duration,
      backgroundColor: '#7089a1',
    }
  );
  // REsume HOVER_GIT
  let hoverResume = gsap.fromTo(
    '.bounceResume',
    {
      scale: 1,
    },
    {
      scale: 0,
      repeat: -1,
      yoyo: true,
      paused: true,
      duration: duration,
      backgroundColor: '#7089a1',
    }
  );
  const onHover = (params) => {
    if (params === 'gitHover') {
      hoverGit.play();
    }
    if (params === 'linkedInHover') {
      hoverLinkt.play();
    }
    if (params === 'resumeHover') {
      hoverResume.play();
    }
  };
  // leave links animationTimer
  const onLeave = (params) => {
    // GIT
    if (params === 'gitLeave') {
      gsap.to('.bounceGit', {
        scale: 1,
        backgroundColor: '#334455',
      });
      hoverGit.pause();
    }
    // LINKED
    if (params === 'linkedInLeave') {
      gsap.to('.bounceLinked', {
        scale: 1,
        backgroundColor: '#334455',
      });
      hoverLinkt.pause();
    }
    // RESUME
    if (params === 'resumeLeave') {
      gsap.to('.bounceResume', {
        scale: 1,
        backgroundColor: '#334455',
      });
      hoverResume.pause();
    }
  };
 
  return (
    <Wrapper>
      <WrapperCv className='animateFadeIN'>
        <ImgCv className='animatePopUp' src={cv} />
        <WrapperX className='animatePopUp' onClick={() => cvHandler('turnOFF')}>
          <X />
        </WrapperX>
      </WrapperCv>
      <Header className='animate'>contact</Header>
      <WrapperHeader className='animate'>
        <H1Connect>Lets Connect</H1Connect>
      </WrapperHeader>
      <WrapperIconConnect>
        <IconWrapperHover
          href='https://github.com/MariusZebrauskas?tab=repositories'
          target='_blank'
          className='animate'
          onMouseEnter={() => onHover('gitHover')}
          onMouseLeave={() => onLeave('gitLeave')}
          onClick={() => linkAudioHandler('gitAudio')}
        >
          <GithubIcon />
          <PHover>
            <span className='bounceGit'></span>GitHub
          </PHover>
        </IconWrapperHover>
        <IconWrapperHover
          onMouseEnter={() => onHover('linkedInHover')}
          onMouseLeave={() => onLeave('linkedInLeave')}
          onClick={() => linkAudioHandler('linkedAudio')}
          href='https://www.linkedin.com/in/m-z-javascript/'
          target='_blank'
          className='animate'
        >
          <LinkedInIcon />
          <PHover>
            <span className='bounceLinked'></span>LinkedIn
          </PHover>
        </IconWrapperHover>
        <IconWrapperHover
          onMouseEnter={() => onHover('resumeHover')}
          onMouseLeave={() => onLeave('resumeLeave')}
          onClick={() => cvHandler('turnON')}
          className='animate'
          mt='-.2rem'
        >
          <Cv>CV</Cv>
          <PHover>
            <span className='bounceResume'></span>Resume
          </PHover>
        </IconWrapperHover>
      </WrapperIconConnect>
      <WrapperHeader className='animate'>
        <H1>Web Developer</H1>
        <H12>Looking For Work</H12>
      </WrapperHeader>
      <WrapperIconsMain className='animate'>
        <IconWrapper>
          <Ofice />
          <P>Office</P>
        </IconWrapper>
        <IconWrapper freelance>
          <Freelance />
          <P>Freelance</P>
        </IconWrapper>
        <IconWrapper>
          <Remote />
          <P>Remote Working</P>
        </IconWrapper>
      </WrapperIconsMain>
      {!messageSend ? (
        <>
          <H14 className='animate'>Drop Me A Line</H14>
          <FormSubmit onSubmit={submitHandler}>
            <NameAndEmail>
              <Input
                className='animate'
                name='true'
                ref={name}
                type='text'
                required
                placeholder='Name'
                nameInput={nameInput}
                onChange={() => onChangeHandler('name')}
              />
              <Input
                className='animate'
                ref={email}
                type='email'
                required
                placeholder='Email'
                emailInput={emailInput}
                onChange={() => onChangeHandler('email')}
              />
            </NameAndEmail>
            <TextArea
              className='animate'
              ref={message}
              type='text'
              rows='4'
              required
              placeholder='Message'
              messageInput={messageInput}
              onChange={() => onChangeHandler('message')}
            />
            <Button
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className='animate button'
              type='submit'
              onClick={onClick}
            >
              <PButon className='hoverButtonText'>
                <ClipLoader loading={loading} zindex={99} color={color} size={18} />
                Send
              </PButon>
            </Button>
          </FormSubmit>
        </>
      ) : (
        <MessageBeenSend />
      )}
      {error && <Warning>Oops Something Went Wrong</Warning>}
    </Wrapper>
  );
};

export default Contatc;
