
particlesJS("particles-js", {
    particles: {
      number: { value: 600, density: { enable: true, value_area: 600 } },
      color: { value: "#ff0000" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 5 },
        image: { src: "img/github.svg", width: 100, height: 100 },
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
      },
      size: {
        value: 5,
        random: true,
        anim: { enable: true, speed: 10, size_min: 0.1, sync: false },
      },
      line_linked: {
        enable: false,
        distance: 500,
        color: "#ffffff",
        opacity: 0.4,
        width: 2,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "bubble" },
        onclick: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 0.5 } },
        bubble: {
          distance: 400,
          size: 4,
          duration: 0.3,
          opacity: 1,
          speed: 3,
        },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });
// /////////////////////////////////////////////////
// Wallet Things

document.getElementById('wallet-connection').addEventListener('click', connecttowallet)


let accounts = undefined;

async function connecttowallet()  {
  // Check for etherium
  if(window.ethereum){
    // We have ethereum
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if(accounts){
      console.log(accounts);
      // Adding the account to localStorage
      localStorage.setItem('eth-wallet-add', accounts[0]);
      // Go to the homepage
      window.open('/homepage/dashboard-user-index.html', "_self")
  
    }
    else{
      alert("Login Failed!")
    }
  }
  else{
    alert("Non Dapp Browser detected!")
  }
}