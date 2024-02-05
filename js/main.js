gsap.registerPlugin(ScrollTrigger) 
gsap.registerPlugin(ScrollToPlugin)


let spline=document.querySelector('.spline')
let loading=document.querySelector('.loading_page')
let section1=document.querySelector('.section1')
let spline_txt=document.querySelector('.spline_txt')

//로딩화면
function pageLoading(){
   let container=document.querySelector('#progress');
   let battery=document.querySelector('.battery')
   let progressBar=document.querySelector('.progress-bar');
   let progressText=document.querySelector('.progress-text');
   var imgLoad = imagesLoaded('body');
   let imgTotal=imgLoad.images.length;
   
   let imgLoaded=0;
   let current=0;
   let progressTimer;
   let topValue;
   
   progressTimer=setInterval(updateProgress,1000/60)
   imgLoad.on( 'progress', function(){ //이미지 로드되는 중간중간 할 일
      imgLoaded++;
   } );
   
   function updateProgress(){
      let target=(imgLoaded/imgTotal)*100;
      console.log(target);
      current += (target - current)*0.1;
   
      progressBar.style.width=current + "%";
      progressText.innerHTML=Math.ceil (current) + "%"; //math.ceil()-> 올림
   
      if(current>99.9){
         clearInterval(progressTimer);
         container.classList.add('progress-complete');
         progressBar.style.width="100%";
         progressBar.style.opacity=0;
         battery.classList.add('color')
         
         gsap.to(container,{
            duration:0.3,
            yPercent:-100,
            delay:2,
         })
      }
   }
};
pageLoading()



let html=document.querySelector('html')
let body=document.querySelector('body')
function scrollDisable(){
   html.classList.add('hidden');
   body.classList.add('hidden');
}
function scrollAble(){
   html.classList.remove('hidden');
   body.classList.remove('hidden');
}
scrollDisable()

document.addEventListener("keydown", eheckKey, false);


function eheckKey(e) {
	if (e.key === 'a') {
		console.log('A키가 눌렸습니다.');
      gsap.to(window,0.5,{
         scrollTo:'.section1',
         delay:1,
      })
	}
	if (e.key === 's') {
		console.log('S키가 눌렸습니다.');
      gsap.to(window,0.5,{
         scrollTo:'.section2',
         delay:1,
      })
	}
	if (e.key === 'd') {
		console.log('D키가 눌렸습니다.');
      gsap.to(window,0.5,{
         scrollTo:'.section3',
         delay:1,
      })
      let mario_main=gsap.timeline()
      mario_main.from('.mario_logo',{
         xPercent:-150,
         duration:0.5,
         ease: "back.out(1.4)",
         delay:4.5
      })
      mario_main.from('.develope_date',{
         xPercent:200,
         duration:0.5,
         ease: "back.out(1.4)",
      })
 
	}
	if (e.key === 'f') {
		console.log('f키가 눌렸습니다.');
      scrollAble()
      
	}
   if(e.key === 'a'||e.key === 's'||e.key === 'd'){
      gsap.to('.spline',{
         display:"none",
         delay:4,
      })
   }
}

//화면전환 애니
function screenChange(location,time,scrollable){
   scrollDisable()
   let tlScreen=gsap.timeline()
   setTimeout(() => {
      tlScreen.to("li", {
         duration:0.1,
         scale:1,
         ease:"linear",
         stagger: {
            // wrap advanced options in an object
            each: 0.1,
            from: "random",
            grid: [10,20], //[가로갯수, 세로갯수]
            amount: 1,
            axis:"x"
         }
      });
      tlScreen.to("li", {
         duration:0.1,
         scale:0,
         ease:"linear",
         stagger: {
            // wrap advanced options in an object
            each: 0.1,
            from: "random",
            grid: [10,20], //[가로갯수, 세로갯수]
            amount: 1,
            axis:"x"
         }
      },`+=0.5`);
      gsap.to(window,0.5,{
         scrollTo:location,
         delay:1,
      })
   }, time);
   setTimeout(() => {
      
      if(scrollable){
         scrollAble()
         console.log("됨")
      }
   }, time+1);
}
//게임전환 애니
function gameChange(txt){
   gsap.to('.spline',{
      display:"block",
   });
   spline_txt.innerText=`키보드 - ${txt} - 키를 누르세요.`
   scrollDisable()
}
let nav_button=document.querySelector('nav')
nav_button.addEventListener('click',()=>{
   gameChange()
   spline_txt.innerHTML=`키보드 - A, S, D - 키를 눌러 게임을 선택하세요.`
})

// -------------------------------🎃section1-----------------------------

let metal_logo=document.querySelector('.metal_logo')
let insert_coin=document.querySelector('.insert_coin')
let selectDoor=document.querySelectorAll(".select_door")
let metal_main=document.querySelector('.section1 .scene1')
let tl=gsap.timeline({
   scrollTrigger: {
      trigger: ".section1 .scene1",
      start: "top top", // 상단에서 시작
      end: "bottom 30%",
      scrub:true,
      toggleActions: "restart none none reverse ",
      pin:true
    }
})
tl.to(".metal_logo",{
   yPercent: -200,
 })
tl.to('.insert_coin',{
   y:250,
},"<")
tl.to(".metal_gif",{
   opacity:0
})

metal_main.addEventListener('click',()=>{
   screenChange('.section1 .scene2',500)

   let tl2=gsap.timeline({
      toggleActions: "restart reset restart reverse "
   })
   tl2.from(selectDoor[0],{
      top:"0%",
      delay:3.5
   },)
   tl2.from(selectDoor[1],{
      top:"0%",
   },"-=0.3")
   tl2.from(selectDoor[2],{
      top:"0%",
   },"-=0.3")
   tl2.from(selectDoor[3],{
      top:"0%",
   },"-=0.3")
})

let playerBoxs=document.querySelectorAll('.player_box')
let p1p=document.querySelectorAll('.p1 p')
let playerInner=document.querySelectorAll('.player_inner')

playerBoxs.forEach((e, i)=>{
   e.addEventListener('mousemove',()=>{
      p1p[0].classList.remove('active')
      p1p[1].classList.remove('active')
      p1p[2].classList.remove('active')
      p1p[3].classList.remove('active')
      p1p[i].classList.add('active')
   })
   e.addEventListener('click',()=>{
      playerInner[i].style.transform= 'scale(1.3)';
      e.querySelector(".door_img").style.display="block"
      gsap.to(selectDoor[i],{
         y:"100%",
         delay:1,
         duration:1,
         ease: "bounce.out",
      });
      screenChange('.section1 .scene3',3000,true)
      setTimeout(() => {
         missionPlay()
      }, 6000);
   })
})

// ---------------------------sec1 scene3-----------------------

let scene3_bg =document.querySelector('.scene3_bg')
let metal_character=document.querySelector('.my_character')
let scene3Header=document.querySelector('.scene3_header')
let sec1coin=document.querySelector('.section1 .scene3 .coin')
let coinBlink=setInterval(() => {
   sec1coin.classList.toggle('blink')
}, 1000);

function metalTime(){
   let time=document.querySelector('.scene3 .time')
   let seconds = 60;

   const intervalId = setInterval(()=>{
      time.innerText = seconds;
      seconds--;
   
      if (seconds < 0) {
         seconds=60;
         /* clearInterval(intervalId); */
      }
   }, 1000);
}
metalTime()


//배경이동
let tl3=gsap.timeline({
   scrollTrigger:{
      trigger:'.scene3 .container',
      start:'top top',
      end:'+=5000',
      scrub:true,
      toggleActions: "restart reset restart reset ",
      pin:true,
    }
})
tl3.to(scene3_bg,{
  xPercent:-75,
  ease:"none"
})
tl3.to(metal_character,{
   x: (scene3_bg.offsetWidth * 0.75),
   ease:"none"
},"<")

//미션스타트 애니
let mission_start=document.querySelector('.mission_start')
let startFonts = document.querySelectorAll('.mission_start .fonts')

function missionPlay(){
   mission_start.style.opacity=1
   startFonts.forEach(function(textanimation,index){
      gsap.from(textanimation,0.5,{
         delay:(index + 1) * .1,
         xPercent:-500,yPercent:-500,
         opacity:1,
      })
   }) 
   gsap.to(mission_start,{
      delay:2.5,
      function(){
         mission_start.classList.add("blink")
      }
   })
}






//대화창 활성화 위치

let  scene3 = document.querySelector('.scene3')
let metal_txt_box=document.querySelectorAll('.metal_txt_box')
let section2=document.querySelector('.section2')

 window.addEventListener('scroll',()=>{
   let scene3Top= scene3.offsetTop
   let viewportTop=window.pageYOffset
   let percent=(viewportTop - scene3Top)/(scene3.offsetHeight-window.innerHeight)*100

   if(percent>=0 && percent<31){
      metal_txt_box.forEach((e)=>{
         e.classList.remove('active')
         e.style.opacity=1
      })
   }
 
   if(percent>=31 && percent<64){
      metal_txt_box[0].classList.add('active')
      metal_txt_box[1].classList.remove('active')
      metal_txt_box[2].classList.remove('active')
      
   }
   if(percent>=64 && percent<97){
      metal_txt_box[0].classList.remove('active')
      metal_txt_box[1].classList.add('active')
      metal_txt_box[2].classList.remove('active')
   /*    gsap.to(window,{
         scrollTo: {y:'.section2', offsetY: window.innerHeight},
      }) */
   }
   if(percent>=97 && percent<=100){
      metal_txt_box[0].classList.remove('active')
      metal_txt_box[1].classList.remove('active')
      metal_txt_box[2].classList.add('active')
      /* scrollDisable() */
   }
 })



 let next_btn=document.querySelectorAll('.next_btn')
 let prev_btn=document.querySelectorAll('.prev_btn')
 let slider=document.querySelectorAll('.slider')
 let end_btn = document.querySelector('.end_btn')

 //🎃슬릭만들기
 function slick() {
   // 각 슬라이드에 대한 count와 btnChanged 배열을 만듭니다.
   let counts = [1, 1, 1, 1];
   let btnChanged = [true, true, true, true];

   next_btn.forEach((e, i) => {
       e.addEventListener('click', function () {
           if (!btnChanged[i]) {
               btnChanged[i] = true;
           }
           slider[i].style.transform = `translateX(-${slider[i].firstElementChild.offsetWidth * (counts[i])}px)`;
           counts[i]++;
           if (counts[i] > slider[i].childElementCount) {
               counts[i] = 0;
               metal_txt_box[i].style.opacity=0
               scrollAble()
           }
           if(i==2 && counts[i] > slider[i].childElementCount-1){
            next_btn[2].style.display="none"
            end_btn.style.display="block"
           }
           console.log(counts[i]);
       });
   });

   prev_btn.forEach((e, i) => {
       e.addEventListener('click', function () {
           if (btnChanged[i]) {
               btnChanged[i] = false;
               counts[i]--
           }
           counts[i]--
           if (counts[i] < 0) {
              counts[i] = slider[i].childElementCount - 1;
            }
           slider[i].style.transform = `translateX(-${slider[i].firstElementChild.offsetWidth * counts[i]}px)`;
           console.log(counts[i]);
       });
   });
}
 
slick();



//메탈슬러그 종료 이벤트
let metal_tl=gsap.timeline({
   scrollTrigger:{
      trigger:'.section1 .scene2',
      start:'+=5500',
   }
 })
   metal_tl.to(window,{
    duration:1,
    scrollTo: {y:'.section2', offsetY: window.innerHeight},
   },'sd')
   metal_tl.to(window,{
      scrollDisable
   },'sd')


let mission_title=document.querySelector('.mission_end')

end_btn.addEventListener('click',()=>{

   let endFonts = document.querySelectorAll('.mission_end .fonts')

   mission_title.style.opacity=1
   metal_txt_box[2].classList.remove('active')

   gsap.to(metal_character,{
      x: (scene3_bg.offsetWidth * 0.75)+1500,
      ease:"none",
      duration:3,
      function(){
         metal_character.classList.add('run')
         metal_character.src="img/metal_running.gif"  
      }
   })
   endFonts.forEach(function(textanimation,index){
      gsap.from(textanimation,0.5,{
         delay:(index + 1) * .1,
         xPercent:-500,yPercent:-500,
         opacity:0,
      })
   }) 
   gsap.to(mission_title,{
      delay:2.5,
      function(){
         mission_title.classList.add("blink")
      }
   })
   setTimeout(() => {
      gameChange('S')   
   }, 5000);

})


//🏳‍🌈스크롤감지
function checkScrolling(character,game){
let scrolling
let preScrollTop = 0;

window.addEventListener('scroll', () => {
   let nextScrollTop = window.scrollY;
  
   if(preScrollTop < nextScrollTop) {
      character.classList.remove('back')
    }
   else { // (preScrollTop > nextScrollTop)
      character.classList.add('back')
    }
   preScrollTop = nextScrollTop;

   if (!scrolling) {
      character.classList.add('run')
      character.src=`img/${game}_running.gif`
      if(character.classList.contains('back')){
         character.src=`img/${game}_runningBack.gif`
       }
   }
   
   // 일정시간(250ms) 뒤에 스크롤 동작 멈춤을 감지
   clearTimeout(scrolling);
   scrolling = setTimeout(() => {
       
      character.classList.remove('run')
      
      character.src=`img/${game}_character.png`
       if(character.classList.contains('back')){
         character.src=`img/${game}_character_back.png`
       }

       scrolling = undefined;

   }, 170);

})

}
checkScrolling(metal_character,"metal")

// --------------------------------section2-------------------------------
let doom_main=document.querySelector('.section2 .scene1')
let doom_logo=document.querySelector('.doom_logo')
let doom_coin=document.querySelector('.doom_coin')
let tl5=gsap.timeline({
   scrollTrigger: {
      trigger: ".section2 .scene1",
      start: "top top", // 상단에서 시작
      end: "bottom 30%",
      scrub:true,
      toggleActions: "restart none none reverse ",
      pin:true
    }
})
tl5.to(".doom_logo",{
   yPercent: -200,
 })
tl5.to('.doom_coin',{
   y:250,
},"<")
tl5.to(".doom_bg",{
   opacity:0
})

doom_main.addEventListener('click',()=>{
   screenChange('.section2 .scene2',0,false)
})


//----------------------scene2-------------------

let stageEle=document.querySelector('.stage'),
    houseEle=document.querySelector('.house'),
    maxScrollValue, //실제 스크롤이 움직이는 값
    mousePos={x:0,y:0};



let tl4=gsap.timeline({
   scrollTrigger:{
      trigger:'.second-page',
      start:'top top',
      end:`+=10000`,
      scrub:0.5,
      toggleActions: "restart reset restart reset ",
      pin:'.second-page',
    }
})
tl4.to(houseEle,{
   z:0,
   ease:"none"
})

let sec2scene2=document.querySelector('.section2 .second-page')
let monsters=document.querySelectorAll('.monster')
let doom_cont=document.querySelectorAll('.doom_cont')
let close_btn=document.querySelectorAll('.doom_cont .close_btn')
let aim=document.querySelector('.aim')

//화면회전
function viewrotate(){
   sec2scene2.addEventListener('mousemove',function(e){
      mousePos.x=(e.clientX - (window.innerWidth / 2)) * 0.07;
      mousePos.y=-(e.clientY - ( window.innerHeight / 2)) * 0.05;
      stageEle.style.transform=`rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`
      aim.style.left=`${e.clientX - 30}px`
      aim.style.top=`${e.clientY - 30}px`
   })
}

viewrotate()

//화면회전 정지
function stoprotate(){
   sec2scene2.addEventListener("mousemove",(event)=>{
      stageEle.style.transform="none"
   })
}

//몬스터 이벤트
monsters.forEach((e)=>{
   e.addEventListener('click',()=>{
      e.src="img/monster1_die.gif"
      gsap.to(e,{
         delay:1.5,
         opacity:0
      })
   },true)
})

document.querySelector('.monster1').addEventListener('click',()=>{
   scrollDisable()
   setTimeout(()=>{
      doom_cont[0].style.visibility="visible"
      stoprotate()
   },1000)
})
document.querySelector('.monster2').addEventListener('click',()=>{
   scrollDisable()
   setTimeout(()=>{
      doom_cont[1].style.visibility="visible"
      stoprotate()
   },1000)
})

//둠 튜토리얼 닫기버튼
document.querySelector('.doom_tutorial .close_btn').addEventListener('click',()=>{
   document.querySelector('.doom_tutorial').classList.add('closed');
   scrollAble();
})

//둠 컨텐츠 닫기버튼
close_btn.forEach((e,i)=>{
   e.addEventListener('click',()=>{
      doom_cont[i].style.visibility="hidden";
      scrollAble();
      viewrotate();
   })
})


//몬스터 애니메이션 시점
let  scene2 = document.querySelector('.section2 .scene2')
window.addEventListener('scroll',()=>{
   let scene2Top=scene2.offsetTop;
   let viewportTop=window.pageYOffset;
   let percent=(viewportTop - scene2Top)/(scene2.offsetHeight-window.innerHeight)*100;

   if(percent>=15 && percent<25){
      monsters[0].classList.add('active');
   }
   if(percent>=25 && percent<63){
      monsters[1].classList.add('active');
   }
   if(percent>=58 && percent<90){
      monsters[2].classList.add('active');
      monsters[3].classList.add('active');
   }
   if(percent>=95 && percent<100){
   /* gsap.to('.big-door1',{
         xPercent:-100,
         duration:2.5,
         ease:"none"
      })
      gsap.to('.big-door2',{
         xPercent:100,
         duration:2.5,
         ease:"none"
      }) */
   }
 })

 //둠 보스 인트로
 let doom_tl=gsap.timeline({
   scrollTrigger:{
      trigger:'.section2 .scene2',
      start:'+=8700',
      /* toggleActions:'restart none none none' */
   }
 })
   doom_tl.to(window,{
    duration:2,
    ease:'linear',
    scrollTo: '+=800',
   },'doom')
   doom_tl.to(window,{
      scrollDisable
   },'doom')
   doom_tl.to('.big-door1',{
      xPercent:-100,
      duration:2.5,
      ease:"none"
   },'+=1.5')
   doom_tl.to('.big-door2',{
      xPercent:100,
      duration:2.5,
      ease:"none"
   },'<')



//총 발사
 let doomGun=document.querySelector('.doom_gun')
 stageEle.addEventListener('click',()=>{
   doomGun.src="img/gunfire_ani.gif"
   setTimeout(()=>{
      doomGun.src='img/doom_gun.png'
   },1300)
 })

 //얼굴방향
 let face=document.querySelector('.doom_face')
 stageEle.addEventListener('mousemove',(e)=>{
   if(e.clientX>=0 && e.clientX<window.innerWidth/3){
      face.style.background="0% 0%/ 100% 100% no-repeat url(../img/doom_face3.png)"
   }
   if(e.clientX>window.innerWidth/3 && e.clientX<window.innerWidth*2/3){
      face.style.background="0% 0%/ 100% 100% no-repeat url(../img/doom_face2.png)"
   }
   if(e.clientX>window.innerWidth*2/3 && e.clientX<=window.innerWidth){
      face.style.background="0% 0%/ 100% 100% no-repeat url(../img/doom_face1.png)"
   }
   e.clientX
 })


 //보스
 let boss=document.querySelector('.boss')
 boss.addEventListener('click',()=>{
   boss.classList.add('die')
   let tlboss=gsap.timeline()
   tlboss.to('.boss.die',{
      duration:1.3,
      z:'10vw',
      opacity:0.3
   })
   tlboss.to('.boss.die',{
      opacity:0,
      duration:0.5
   })
   screenChange('.section2 .scene3',2000,false)
   
 
 })

//둠 리스트창

 function doom_list() {
   let lists=document.querySelectorAll('.doom_list .list')
   let items=document.querySelectorAll('.list_item')
   let slider=document.querySelector('.item_slider')

   lists.forEach((e, i) => {
       e.addEventListener('click',()=>{
         slider.style.transform=`translateY(-${items[0].offsetHeight*i}px)`
         console.log(items)
       });
   });
}
doom_list()
let end_doom=document.querySelector('.end_doom')
end_doom.addEventListener('click',()=>{
   gameChange('D')
})


//----------------------------🎃section3---------------------------
//🎃scene1
let mario_start1=document.querySelector('.m_player.player1')
let mario_start2=document.querySelector('.m_player.player2')
mario_start1.addEventListener('click',()=>{
   screenChange('.section3 .scene2',1000,true)
})
mario_start2.addEventListener('click',()=>{
   screenChange('.section3 .scene2',1000,true)
})


//🎃scene2
let scene2_bg=document.querySelector('.scene2_bg')
let mario_character=document.querySelector('.mario_character')
let port_desc=document.querySelector('.port_desc')
let container = document.querySelectorAll('.port_desc .port')

let tl6=gsap.timeline({
   scrollTrigger:{
      trigger:'.section3 .scene2 .container',
      start:'top top',
      end:'+=15000',
      scrub:true,
      toggleActions: "restart reset restart reset ",
      pin:true,
    }
})
tl6.to('.scene2_bg',{
  /*  x: - (scene3_bg.offsetWidth - window.innerWidth), */
  xPercent:-90,
  ease:"none"
})
tl6.to('.mario_character',{
   x: (scene2_bg.offsetWidth * 0.9),
   ease:"none"
},"<")
tl6.to('.mario_sites',{
   x: (scene2_bg.offsetWidth * 0.9),
   ease:"none"
},"<")
/* tl6.to() */

checkScrolling(mario_character,"mario")


gsap.fromTo('.mario_sites',{
   xPercent:-130,
   },{
   xPercent:0,
   scrollTrigger:{
      trigger:'.port_desc',
      start:'+=2500',
      end:'+=700', 
      scrub:1, 
    }
})


gsap.to(port_desc,{
   x: - port_desc.offsetWidth + (container[0].offsetWidth * 4),
   ease:'none',
   scrollTrigger:{
     trigger:'.port_desc',
     start:'+=3200',
     end:'+=3000', 
     scrub:1,
   }
})
gsap.from('.works_title',{
   yPercent:-120,
   scrollTrigger:{
      trigger:'.port_desc',
      start:'+=3200',
      end:'+=100', 
      scrub:1,
   }
})
gsap.fromTo('.mario_sites',{
   xPercent:0,
   }, {
      xPercent:150,
   scrollTrigger:{
      trigger:'.port_desc',
      start:'+=6200',
      end:'+=700', 
      scrub:1, 
    }
})
gsap.set(".mario_sites", {xPercent:-130});
gsap.from('.skill_title.design',{
   yPercent:-150,
   duration:0.2,
   scrollTrigger:{
     trigger:'.port_desc',
     start:'+=9000',
     end:'+=1000', 
     toggleActions:"restart reverse restart reverse ",
   }
})
let flowers=document.querySelectorAll('.flower')
let tl7=gsap.timeline({
   scrollTrigger:{
      trigger:'.port_desc',
      start:'+=8900',
      end:'+=500', 
      scrub:1,
    }
})
tl7.from(flowers[0],{
   yPercent:100
})
tl7.from(flowers[1],{
   yPercent:100
})
tl7.from(flowers[2],{
   yPercent:100
})
tl7.from(flowers[3],{
   yPercent:100
})

gsap.from('.skill_title.web',{
   yPercent:-150,
   duration:0.2,
   scrollTrigger:{
     trigger:'.port_desc',
     start:'+=10600',
     end:'+=1000', 
     toggleActions:"restart reverse restart reverse ",
   }
})
let flags=document.querySelectorAll('.flag')
let tl8=gsap.timeline({
   scrollTrigger:{
      trigger:'.port_desc',
      start:'+=10400',
      end:'+=500', 
      scrub:1,
      toggleActions:''
    }
})
tl8.from(flags[0],{
   yPercent:1000
})
tl8.from(flags[1],{
   yPercent:1000
})
tl8.from(flags[2],{
   yPercent:1000
})
tl8.from(flags[3],{
   yPercent:1000
})

let mario_chat=document.querySelector('.mario_txt_box')
gsap.from(mario_chat,{
   width:0, height:0,opacity:0,
   ease:'none',
   duration:0.2,
   scrollTrigger:{
     trigger:'.port_desc',
     start:'+=12000',
     end:'+=1000', 
     toggleActions:"restart reset restart reset ",
   }
})


let contact_wrap= document.querySelector('.contact_wrap')


//폭죽
function fire (){

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

//Const
const FLAT = canvas.height
const FIREWORKS_COUNT = 20
const EXP_COUNT = 20
const AFTERIMG_COUNT = 10
const RADIUS = 2

//Class
class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    add(b) {
        this.x += b.x
        this.y += b.y
    }
    clone() {
        return new Vector(this.x, this.y)
    }
}

class RGB {
    constructor(r, g, b, a = 1) {
        this.R = r
        this.G = g
        this.B = b
        this.A = a
    }
    toString() {
        return `rgb(${this.R}, ${this.G}, ${this.B}, ${this.A})`
    }
    alpha(value) {
        let A = value
        if (value < 0) {
            A = 0
        }
        return new RGB(this.R, this.G, this.B, A)
    }
}

class Fireworks {
    constructor(pos_x, pos_y, speedH, color = Palette[randint(Palette.length)]) {
        this.start = new Vector(pos_x, pos_y)
        this.color = color

        //Explosion Particle Count
        this.EXP_COUNT = EXP_COUNT

        // 0 : 상승, 1: 터짐
        this.mode = 0

        //Particle
        this.elevator = new Particle(pos_x, pos_y, 0, speedH, this.color)
        this.explosion = []
    }
    draw() {
        if (this.mode === 0) {
            this.elevate()
        } else {
            this.explode()
        }
    }
    elevate() {
        this.elevator.draw()
        this.elevator.move()
        this.elevator.vel.y += 0.01
        if (this.elevator.vel.y > 0) {
            const pos = this.elevator.pos
            for (var i = 0; i < this.EXP_COUNT; i++) {
                this.explosion.push(new Particle(pos.x, pos.y,
                    rand(1.5) * randSym(), rand(1.5) * randSym(), this.color))
            }
            this.mode = 1
        }
    }
    explode() {
        this.explosion.forEach(i => {
            i.vel.y += 0.002
            i.life -= 0.004
            i.draw()
            i.move()
        })
    }
}

class Particle {
    constructor(x, y, vel_x, vel_y, color) {
        this.AFTERIMG_COUNT = AFTERIMG_COUNT

        this.life = 1
        this.pos = new Vector(x, y)
        this.vel = new Vector(vel_x, vel_y)
        this.color = color
        this.afterimg = []
    }
    draw() {
        Circle(this.pos, RADIUS, this.color)
        for (var i = 0; i < this.afterimg.length; i++) {
            let _color = this.color.alpha(i / this.AFTERIMG_COUNT - 1 + this.life)
            Circle(this.afterimg[i], RADIUS, _color)
        }
    }
    move() {
        this.color = this.color.alpha(this.life)

        this.afterimg.push(this.pos.clone())
        this.pos.add(this.vel)
        while (true) {
            if (this.afterimg.length <= this.AFTERIMG_COUNT) {
                break
            }
            this.afterimg.shift()
        }
    }
}

const Palette = [
    new RGB(255, 105, 97),
    new RGB(232, 93, 4),
    new RGB(255, 255, 40),
    new RGB(66, 214, 164),
    new RGB(8, 204, 209),
    new RGB(89, 173, 246),
    new RGB(157, 248, 255),
    new RGB(199, 127, 232),
]


//Function
function selectColor(color) {
    ctx.beginPath()
    ctx.fillStyle = color.toString()
    ctx.strokeStyle = color.toString()
}

function Circle(pos, r, color) {
    selectColor(color)
    ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2, false)
    ctx.fill()
}

function randint(n) {
    // 0 ~ (n - 1)
    return Math.floor(Math.random() * n)
}

function rand(n) {
    return Math.random() * n
}

function randSym() {
    if (randint(2) == 0) {
        return 1
    }
    return -1
}

function getSym(n) {
    if (n < 0) {
        return -1
    }
    return +1
}

RenderList = [
]

function makeFireworks() {
    return new Fireworks(randint(canvas.width),
        FLAT, -rand(2) - 2)
}

function createFireworks() {
    RenderList.push(makeFireworks())
}

createFireworks()

let frame = 0
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (RenderList.length < FIREWORKS_COUNT && frame % 40 == 0) {
        createFireworks()
    }
    for (var i = 0; i < RenderList.length; i++) {
        let count = RenderList[i].explosion.length
        if (RenderList[i].mode == 1) {
            if (RenderList[i].explosion[count - 1].life <= 0) {
                RenderList[i] = makeFireworks()
            }
        }
    }
    RenderList.forEach(i => {
        i.draw()
    });

    frame++
    requestAnimationFrame(render)
}

render()
}
fire()

