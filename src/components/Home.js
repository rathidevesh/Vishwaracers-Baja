import React from 'react'
import{ useRef, useState,useEffect } from 'react';
import './Home.css';

// import homepageVehicleImage from '../Image/VR25-logo.png';
import homepageVehicleImage from '../Image/VR25HomeIMg.jpg';
import aboutImage from '../Image/awards.png';
import videobg from '../Video/VR25_HomePage_video.mp4';
import ScrollAnimation from './ScrollAnimation';


function Home() {
  const cardWrapperRef = useRef(null);
  const [currScroll, setCurrScroll] = useState(5);
  const [initPos, setInitPos] = useState(0);
  const [clicked, setClicked] = useState(false);

  const [awardCount, setAwardCount] = useState(0);
  const [carCount, setCarCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    if (cardWrapperRef.current) {
      setCurrScroll(cardWrapperRef.current.scrollLeft);
    }
  }, []);

  const widthToScroll = cardWrapperRef.current?.children[0]?.offsetWidth || 0;

  const handlePrevClick = () => {
    console.log("prevClicked");
    cardWrapperRef.current.scrollLeft -= widthToScroll;
  };

  const handleNextClick = () => {
    console.log("nextClicked");
    cardWrapperRef.current.scrollLeft += widthToScroll;
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    cardWrapperRef.current.classList.add('grab');
    setInitPos(e.clientX - cardWrapperRef.current.getBoundingClientRect().left);
    setCurrScroll(cardWrapperRef.current.scrollLeft);
    setClicked(true);
  };

  const handleMouseMove = (e) => {
    if (clicked) {
      const xPos = e.clientX - cardWrapperRef.current.getBoundingClientRect().left;
      cardWrapperRef.current.scrollLeft = currScroll - (xPos - initPos);
    }
  };

  const handleMouseUpAndLeave = () => {
    cardWrapperRef.current.classList.remove('grab');
    setClicked(false);
  };

  useEffect(() => {
    // Animation JavaScript
    function reveal() {
      var reveals = document.querySelectorAll(".reveal");

      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }

    window.addEventListener("scroll", reveal);

    

    // Use setInterval to increment the counts over time
    const awardInterval = setInterval(() => {
      setAwardCount((prevCounter) =>{
        if(prevCounter < 10){
          return prevCounter + 1;
        }
        else{
          clearInterval(awardInterval); // Stop the interval when counter reaches val
          return 10;
        }
      })
    }, 300);

    const carInterval = setInterval(() => {
      setCarCount((prevCounter) =>{
        if(prevCounter < 32){
          return prevCounter + 1;
        }
        else{
          clearInterval(carInterval); // Stop the interval when counter reaches val
          return 32;
        }
      })
    }, 250);

    const memberInterval = setInterval(() => {
      setMemberCount((prevCounter) =>{
        if(prevCounter < 40){
          return prevCounter + 1;
        }
        else{
          clearInterval(memberInterval); // Stop the interval when counter reaches val
          return 40;
        }
      })
    }, 200);

  }, [awardCount, carCount, memberCount]);




  return (
    <>
      <div className='homepage'>

        <div class="wrapper">
              <img src={homepageVehicleImage} alt=''/>
              <img src={homepageVehicleImage}  alt=''/>
              <img src={homepageVehicleImage} alt=''/>
              <img src={homepageVehicleImage}  alt=''/>
        </div>
        <div className="homeInfo">
          <div className="homeInfo-title">
            <div className="title-name">
                <div className="title-sub-name">
                  <h1>VISHWA<span style={{"color":"#fa5f1a"}}>RACERS</span></h1>
                </div>
            </div>
            <div className="title-spec">
                <h1>BA<span style={{"color":"#fa5f1a"}}>J</span>A</h1>
            </div>
          </div>
          {/* <h1 style={{"fontWeight":"bold","fontSize":"200px"}}>BAJA</h1> */}
          <div class="intro-engage-button">FROM CONCEPT TO REALITY, AND BEYOND</div>
        </div>
        
      </div>
         
         <div className="infoTags">
          <div className="info-desc-1">
              <video src={videobg} autoPlay loop muted style={{"width":"100%","height":"100%"}}></video>
          </div>
        
          <div className="info-desc-2 reveal fade-bottom">
              <div className="infoTag1">
                <h2>
                  <span style={{"fontSize":"6vw"}}>DREAM </span>
                </h2>
              </div>
              <div className="infoTag1">
                <h2>
                  <span style={{"fontSize":"8vw","textDecoration":"underline"}}>BELIEVE</span>
                </h2>
              </div>
              <div className="infoTag1">
                <h2>
                  <span style={{"fontSize":"10vw"}}>ACHEIVE.</span>
                </h2>
              </div>
            </div>
        </div>

      <div className="aboutInfo">
        <div className="aboutDescription reveal fade-left">
          <div className="aboutHeading">
              <span style={{fontSize:"4vw","color":"#00171F","padding":"0px 10px 0px 10px"}}>ABOUT US</span>
          </div>
          <div className="smallDec" style={{"padding":"0px 10px 0px 10px","color":"#00171F"}}>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, reiciendis eius odio id velit natus corporis eos molestias enim molestiae explicabo exercitationem cumque dolor nemo ipsa. Distinctio officiis dolorum autem debitis alias quae neque necessitatibus deserunt porro ad, at nam sit consequatur quod fugit repellat assumenda impedit aliquam et hic illum ab facere sint. Sit quis rem at perferendis enim fugit iusto amet! Sapiente odit adipisci voluptatum! Hic labore, a molestiae tempora magni at commodi dolore explicabo tempore quidem nobis quae corporis aut eligendi ullam veniam temporibus exercitationem dicta harum ea? Nostrum eveniet ipsum maiores perspiciatis illum unde, iure aspernatur!</p>
          </div>
          <div className="contactButton">
            <a href="/contact"><button type="button" class="engage-button">ENGAGE WITH US</button></a>
          </div>

        </div>

        <div className="aboutVideo ">
          {/* <video width="500px" height="500px" controls="controls">
            <source src="https://www.youtube.com/watch?v=lbQu3PZoEAU" type="video/mp4" />
          </video> */}
            <div className="home-video">
              <iframe style={{width:"100%","height":"100%"}}
              src="https://www.youtube.com/embed/lbQu3PZoEAU?autoplay=0&mute=1&playlist=lbQu3PZoEAU&loop=1">
              </iframe>
            </div>

        </div>
      </div>
      
      <div className="cardInfoHeading ">
        <h3>
          <span className='infoHeadings'>EXPLORE AMAZING  <span style={{color:"#fa5f1a"}}>FLEETS</span></span>
        </h3>
      </div>
      <div className="carInfo ">
        
        <div class="card reveal fade-bottom" style={{"width": "18rem"}}>
          <img src="https://cdn-8.motorsport.com/images/mgl/27vOVlK0/s8/daniel-ricciardo-mclaren-mcl35-1.jpg" class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Lorem.</h5>
            <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, quam?</p>
            <a href="#" class="btn btn-primary">Read More</a>
          </div>
        </div>
        <div class="card reveal fade-bottom" style={{"width": "18rem"}}>
          <img src="https://cdn-8.motorsport.com/images/mgl/27vOVlK0/s8/daniel-ricciardo-mclaren-mcl35-1.jpg" class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Lorem</h5>
            <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, quam?</p>
            <a href="#" class="btn btn-primary">Read More</a>
          </div>
        </div>
        <div class="card reveal fade-bottom" style={{"width": "18rem"}}>
          <img src="https://cdn-8.motorsport.com/images/mgl/27vOVlK0/s8/daniel-ricciardo-mclaren-mcl35-1.jpg" class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Lorem</h5>
            <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, quam?</p>
            <a href="#" class="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
      
      <div className="model-section-image">
        <div className="model-image">
         {/* <img src={aboutImage} alt="Car image" /> */}
         {/* <img src="https://pbs.twimg.com/media/FLfU5dYaAAQC_ku?format=jpg&name=4096x4096" alt="Car image" /> */}
         {/* <img src="https://www.imeche.org/images/default-source/oscar/Formula-Student/fs_awards17_large.jpg?sfvrsn=9483d912_0" alt="Car image" /> */}
         {/* <img src="https://www.brookes.ac.uk/getmedia/48355b46-c8cf-4472-83b1-fd0f585ed16c/1OBR800.png" alt="Car image" /> */}
         <img src="https://c4.wallpaperflare.com/wallpaper/575/526/560/car-sports-car-wallpaper-preview.jpg" alt="Car image" />
         {/* <img src="https://www.bajasae.net/cdsweb/SharedComponents/public_assets/img/trophies.jpg" alt="Car image" /> */}
        </div>
        <div className="model-image-desc">
          <h1> <span style={{color:"#fa5f1a"}}>FALCON</span> 85</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit explicabo omnis qui magni rerum doloremque vero facilis, quae quas quod.</p>
        </div>
      </div>

      <div className="awardsInfo">
        <div className="currentAwards">
          <h2>
            <span style={{ fontSize: "3vw" }}>
              <span style={{ color: "#fa5f1a" }}>{awardCount}+ </span>AWARDS
            </span>
          </h2>
        </div>
        <div className="currentAwards">
          <h2>
            <span style={{ fontSize: "3vw" }}>
              <span style={{ color: "#fa5f1a" }}>|</span>
            </span>
          </h2>
        </div>
        <div className="currentCars">
          <h2>
            <span style={{ fontSize: "3vw" }}>
              <span style={{ color: "#fa5f1a" }}>{carCount} </span>CARS
            </span>
          </h2>
        </div>
        <div className="currentAwards">
          <h2>
            <span style={{ fontSize: "3vw" }}>
              <span style={{ color: "#fa5f1a" }}>|</span>
            </span>
          </h2>
        </div>
        <div className="currentMembers">
          <h2>
            <span style={{ fontSize: "3vw" }}>
              <span style={{ color: "#fa5f1a" }}>{memberCount} </span>MEMBERS
            </span>
          </h2>
        </div>
      </div>

      <div className="awards-section-image">
        <div className="award-image">
         {/* <img src={aboutImage} alt="Car image" /> */}
         {/* <img src="https://pbs.twimg.com/media/FLfU5dYaAAQC_ku?format=jpg&name=4096x4096" alt="Car image" /> */}
         {/* <img src="https://www.imeche.org/images/default-source/oscar/Formula-Student/fs_awards17_large.jpg?sfvrsn=9483d912_0" alt="Car image" /> */}
         {/* <img src="https://www.brookes.ac.uk/getmedia/48355b46-c8cf-4472-83b1-fd0f585ed16c/1OBR800.png" alt="Car image" /> */}
         <img src="https://pbs.twimg.com/media/FkHdcl2XwAM2W_p?format=jpg&name=4096x4096" alt="AWARDSimage" />
         {/* <img src="https://www.bajasae.net/cdsweb/SharedComponents/public_assets/img/trophies.jpg" alt="Car image" /> */}
        </div>
        <div className="award-image-desc">
          <h1> <span style={{color:"#fa5f1a"}}>ACHEIVEMENTS</span> CORNER</h1>
          <div className="acheivement-details">
            <div className="acheivement-logo">
              <i class="fa-solid fa-award" style={{fontSize:"30px"}}></i>
            </div>
            <div className="acheivement">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ab?</p>
            </div>
          </div>
          <div className="acheivement-details">
            <div className="acheivement-logo">
              <i class="fa-solid fa-award" style={{fontSize:"30px"}}></i>
            </div>
            <div className="acheivement">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, odio. Eius harum maxime molestiae eum ipsam assumenda placeat, alias qui?</p>
            </div>
          </div>
          <div className="acheivement-details">
            <div className="acheivement-logo">
              <i class="fa-solid fa-award" style={{fontSize:"30px"}}></i>
            </div>
            <div className="acheivement">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor maxime nisi perferendis deserunt beatae hic voluptatem necessitatibus minima perspiciatis aperiam quae officia dolores id rem, dicta fugiat facere possimus! Minima?</p>
            </div>
          </div>
          <div className="acheivement-details">
            <div className="acheivement-logo">
              <i class="fa-solid fa-award" style={{fontSize:"30px"}}></i>
            </div>
            <div className="acheivement">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora incidunt cumque dolore, optio eos laboriosam repellendus nam suscipit autem sapiente?</p>
            </div>
          </div>
          <div className="acheivement-details">
            <div className="acheivement-logo">
              <i class="fa-solid fa-award" style={{fontSize:"30px"}}></i>
            </div>
            <div className="acheivement">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ab?</p>
            </div>
          </div>
        </div>
      </div>
        

      <div className="farmerTagLine">
        <h6>
          <span className='infoHeading' style={{"fontSize":"4vw"}}>WE <span style={{color:"#fa5f1a"}}>BELIEVE</span> OUR FARMERS</span>
        </h6>
      </div>
      <div className="farmerClass">
      <div className="farmingImages">
      <div class="wrapper">
              <img className="farmImg" src='https://indiacsr.in/wp-content/uploads/2023/04/Eating-Healthily.jpg' alt=''/>
              <img className="farmImg" src='https://agronicfood.com/wp-content/uploads/2020/02/0-4.png'  alt=''/>
              <img className="farmImg" src='https://s3.amazonaws.com/bizenglish/wp-content/uploads/2021/07/12095052/Picture-2-A-proud-Sri-Lankan-dairy-farmer.jpg' alt=''/>
              <img className="farmImg" src='https://files.globalgiving.org/pfil/1891/pict_original.jpg?m=1195034976000'  alt=''/>
          </div>
        </div>
        <div className="farmerBenefits reveal fade-bottom">
            <p style={{"padding":"0px 10px 0px 10px","textAlign":"justify"}}>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas culpa optio, repellendus quibusdam rerum voluptatem. Ipsam necessitatibus et, porro laudantium delectus ipsum ad incidunt ullam, tenetur fugiat qui repellendus quasi facere minima quo odit aperiam praesentium atque quod sunt natus, nobis impedit magnam. Adipisci ab veritatis, quis pariatur rerum labore similique, nesciunt nisi vel, corrupti odit autem nam error praesentium. Nemo aperiam dolorum placeat consectetur aliquam ipsa quisquam! Ullam laborum molestias minima obcaecati dolorum quisquam, porro incidunt facilis. Laudantium corrupti recusandae eaque veritatis consequatur distinctio quidem veniam sed explicabo, perferendis voluptatibus minus nisi modi suscipit molestiae. Temporibus impedit minima quam cum, debitis, provident quaerat quos deserunt itaque minus illo reprehenderit assumenda voluptas, vitae commodi excepturi architecto repellat? Perferendis sunt reprehenderit incidunt earum voluptas maxime laboriosam enim. Eaque reiciendis alias beatae tempore, placeat possimus exercitationem sed minus corporis doloribus velit voluptates rem accusamus itaque maiores aut, rerum, voluptas fuga fugiat quia!
            </p>
        </div>
      </div>

      <div className="upcomings">
        <h4>
          <span className='infoHeadings' style={{"fontSize":"3vw"}}>MEET OUR NEW <span style={{color:"#fa5f1a"}}>AUTOBEAUTIES</span> </span>
        </h4>

        <span className='upcomingsHeading' style={{"fontSize":"1.5vw","color":"white"}}>INTRODUCING OUR LATEST ADDITION TO OUR COLLECTION</span>
        
      </div>

      <div className="newUpcomings">
      <div className="carInfo car-upcomings">
        <div class="card reveal fade-bottom" style={{"width": "18rem"}}>
        <span className="badge rounded-pill bg-danger" style={{zIndex:"111"}}>New</span>
          <img src="https://media.formula1.com/image/upload/content/dam/fom-website/manual/Misc/2021-Master-Folder/F1%202021%20LAUNCH%20RENDERING%20(2).jpg" class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Lorem.</h5>
            <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, quam?</p>
            <a href="#" class="btn btn-primary">Read More</a>
          </div>
        </div>
        <div class="card reveal fade-bottom" style={{"width": "18rem"}}>
        <span className="badge rounded-pill bg-danger" style={{zIndex:"111"}}>New</span>
          <img src="https://media.formula1.com/image/upload/content/dam/fom-website/manual/Misc/2021-Master-Folder/F1%202021%20LAUNCH%20RENDERING%20(2).jpg" class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Lorem</h5>
            <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, quam?</p>
            <a href="#" class="btn btn-primary">Read More</a>
          </div>
        </div>
        <div class="card reveal fade-bottom" style={{"width": "18rem"}}>
        <span className="badge rounded-pill bg-danger" style={{zIndex:"111"}}>New</span>
          <img src="https://media.formula1.com/image/upload/content/dam/fom-website/manual/Misc/2021-Master-Folder/F1%202021%20LAUNCH%20RENDERING%20(2).jpg" class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Lorem</h5>
            <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, quam?</p>
            <a href="#" class="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
      </div>

      <section id='team-descriptions'>
        <div className="teamMiniDesc " >
          <div className="teamDesc reveal fade-bottom">
              <div className="teamVishwaracers">
                <h4>
                  <span style={{fontSize:"3.5vw","color":"#fa5f1a"}}>TEAM VR25</span>
                </h4>
              </div>
              <div className="team-description" style={{color:"#fff"}}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias architecto laborum, ex repellat, voluptatem doloremque itaque quaerat sed, incidunt beatae aut pariatur amet error. Eligendi ea non eum ipsam quae. Explicabo vero, debitis veritatis delectus provident dolorum corporis omnis molestiae rerum, eum numquam magnam tempore officia enim soluta ducimus autem eius minima commodi maiores impedit sunt! Ab, impedit corporis ex sint iste assumenda dignissimos? Illo at neque id eligendi inventore cumque explicabo temporibus qui incidunt voluptatibus repellendus sed beatae optio quaerat, possimus animi labore itaque exercitationem quisquam numquam fugit voluptas aliquid. Aperiam iure odio similique voluptate minus labore obcaecati quis, quasi magnam incidunt veritatis illum ducimus quod, eos perferendis. Maiores laborum ipsa eum! Sint dolore laudantium cupiditate veniam molestiae nulla ab repellat possimus et cumque distinctio sequi assumenda, iste recusandae ea officiis. Laudantium neque eligendi accusamus, esse earum, non molestiae iusto cum vitae dolores voluptas asperiores fuga eveniet odio magni.</p>
              </div>
              <a href="/team"><button type="button" class="team-engage-button">KNOW MORE</button></a>
          </div>
          <div className="teamImg reveal fade-bottom">
            <img src="https://media.licdn.com/dms/image/D4D22AQFmMp44s99M3w/feedshare-shrink_800/0/1682914945632?e=2147483647&v=beta&t=9sAPC6CtNXZZXMvgZ8pMl1e3YJLgr7IlntV8CT7iriQ" alt="Team-Image"/>
          </div>
        </div>
      </section>


      <div className="reviewTagline">
        <div className="TaglineHeading reveal fade-left">
          <h3>
            <span style={{fontSize:"3.5vw","color":"#252525"}}>EXPERIENCED BY <span style={{color:"#fa5f1a"}}>VR25 CLIENTS.</span> </span>
          </h3>
        </div>

        <div className="Tagline-Icon">
        <i class="fa-solid fa-quote-right" style={{fontSize:"3.5vw","color":"#fa5f1a"}}></i>
        </div>
      </div>

      <div className="home-review-section">
              <div class="review-wrapper">
                    <button class="arrow prev" style={{"width":"60px","height":"60px","border-radius" :"50%"}}onClick={handlePrevClick} ><i class="ri-arrow-left-s-line"
                        
                       style={{"border-radius": "50%"}}></i></button>
                    <button class="arrow next" style={{"width":"60px","height":"60px","border-radius" :"50%"}} onClick={handleNextClick} ><i class="ri-arrow-right-s-line" style={{"border-radius": "50%"}}></i></button>
                    
                    <div class="card-wrapper" ref={cardWrapperRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUpAndLeave} onMouseLeave={handleMouseUpAndLeave}>
                        
                        <div class="card-item">
                            <img src="https://cdn.wallpapersafari.com/13/50/xeNjrU.jpg" alt=""/>
                            <div class="card-info">
                                <a href="#" class="card-title" style={{"text-align": "center"}}>
                                  Lorem, ipsum.
                                </a>
                                <p class="card-description" style={{"text-align": "start"}}>
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates minima, ab qui, sint tenetur cumque, culpa tempora sit porro amet iste architecto. Vel ad quisquam incidunt eos sit laborum molestias ipsum impedit hic voluptas et, animi alias rem quas dolorum?
                                </p>

                            </div>
                        </div>
                        <div class="card-item">
                            <img src="https://cdn.wallpapersafari.com/13/50/xeNjrU.jpg" alt=""/>
                            <div class="card-info">
                                <a href="#" class="card-title" style={{"text-align": "center"}}>
                                  Lorem, ipsum.
                                </a>
                                <p class="card-description" style={{"text-align": "start"}}>
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates minima, ab qui, sint tenetur cumque, culpa tempora sit porro amet iste architecto. Vel ad quisquam incidunt eos sit laborum molestias ipsum impedit hic voluptas et, animi alias rem quas dolorum?
                                </p>

                            </div>
                        </div>
                        <div class="card-item">
                            <img src="https://cdn.wallpapersafari.com/13/50/xeNjrU.jpg" alt=""/>
                            <div class="card-info">
                                <a href="#" class="card-title" style={{"text-align": "center"}}>
                                  Lorem, ipsum.
                                </a>
                                <p class="card-description" style={{"text-align": "start"}}>
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates minima, ab qui, sint tenetur cumque, culpa tempora sit porro amet iste architecto. Vel ad quisquam incidunt eos sit laborum molestias ipsum impedit hic voluptas et, animi alias rem quas dolorum?
                                </p>

                            </div>
                        </div>
                        <div class="card-item">
                            <img src="https://cdn.wallpapersafari.com/13/50/xeNjrU.jpg" alt=""/>
                            <div class="card-info">
                                <a href="#" class="card-title" style={{"text-align": "center"}}>
                                  Lorem, ipsum.
                                </a>
                                <p class="card-description" style={{"text-align": "start"}}>
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates minima, ab qui, sint tenetur cumque, culpa tempora sit porro amet iste architecto. Vel ad quisquam incidunt eos sit laborum molestias ipsum impedit hic voluptas et, animi alias rem quas dolorum?
                                </p>

                            </div>
                        </div>
                        <div class="card-item">
                            <img src="https://cdn.wallpapersafari.com/13/50/xeNjrU.jpg" alt=""/>
                            <div class="card-info">
                                <a href="#" class="card-title" style={{"text-align": "center"}}>
                                  Lorem, ipsum.
                                </a>
                                <p class="card-description" style={{"text-align": "start"}}>
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates minima, ab qui, sint tenetur cumque, culpa tempora sit porro amet iste architecto. Vel ad quisquam incidunt eos sit laborum molestias ipsum impedit hic voluptas et, animi alias rem quas dolorum?
                                </p>

                            </div>
                        </div>
                        <div class="card-item">
                            <img src="https://cdn.wallpapersafari.com/13/50/xeNjrU.jpg" alt=""/>
                            <div class="card-info">
                                <a href="#" class="card-title" style={{"text-align": "center"}}>
                                  Lorem, ipsum.
                                </a>
                                <p class="card-description" style={{"text-align": "start"}}>
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates minima, ab qui, sint tenetur cumque, culpa tempora sit porro amet iste architecto. Vel ad quisquam incidunt eos sit laborum molestias ipsum impedit hic voluptas et, animi alias rem quas dolorum?
                                </p>

                            </div>
                        </div>
                        <div class="card-item">
                            <img src="https://cdn.wallpapersafari.com/13/50/xeNjrU.jpg" alt=""/>
                            <div class="card-info">
                                <a href="#" class="card-title" style={{"text-align": "center"}}>
                                  Lorem, ipsum.
                                </a>
                                <p class="card-description" style={{"text-align": "start"}}>
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates minima, ab qui, sint tenetur cumque, culpa tempora sit porro amet iste architecto. Vel ad quisquam incidunt eos sit laborum molestias ipsum impedit hic voluptas et, animi alias rem quas dolorum?
                                </p>

                            </div>
                        </div>
                        
                    </div>
                </div>
        </div>


        

      








        










    </>


      
        

    
  )
}

export default Home

{/* <img className="homepage-vehicle-image" src="https://lh3.googleusercontent.com/kgJ7dcL7ErCnYfnQU9a9t6C1WFgJB1OjFR86BA6HdQ5_vjOsTIDliVpX0AOxJsWy7B38XmqmOQqZ0ShtDac9FCM=w16383" alt="BajaVehicleImage" /> */}
{/* <img className="homepage-vehicle-image" src={homepageVehicleImage} alt="BajaVehicleImage" /> */}