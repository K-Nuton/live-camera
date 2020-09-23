class LiveCamera {
  constructor(camera_id, parent_node) {
    if (window.YT) return;
    
    this.init();
    
    this.parent = parent_node;
    
    this.wrapper = document.createElement("div");
    this.resize();
    parent_node.appendChild(this.wrapper);
    
    this.target = document.createElement("div");
    this.target.style.pointerEvents = "none";
    this.target.id = Math.random().toString(32).substring(2);
    
    this.wrapper.appendChild(this.target);
    
    window.onYouTubeIframeAPIReady = 
      () => this.create_player(camera_id);
    
    window.addEventListener(
      "resize", 
      () => requestAnimationFrame(this.resize.bind(this)), 
      false
    );
  }
  
  create_player(camera_id) {
    this.player = new YT.Player(
      this.target.id,
      {
        videoId: camera_id,
        width: "100%",
        height: "100%",
        events: {
          "onReady": this.ready
        },
        playerVars: {
          autoplay: 1,
          playsinline: 1,
          controls: 0, 
          modestbranding: 1,
          rel: 0
        }
      }
    );
  }
  
  resize() {
    const [pwidth, pheight] =
      [this.parent.clientWidth, this.parent.clientHeight];
    
    let width, height;
    if (pwidth * 0.9 * 9/16 < pheight * 0.9) {
      width = pwidth * 0.9;
      height = width * 9/16;
    } else {
      height = pheight * 0.9;
      width = height * 16/9;
    }
    
    this.wrapper.style.width = width + "px";
    this.wrapper.style.height = height + "px";
  }
  
  init() {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    const first_script = document.getElementsByTagName('script')[0];
    first_script.parentNode.insertBefore(script, first_script);
  }
    
  ready(event) {
    event.target.mute();
    event.target.playVideo();
  }
}