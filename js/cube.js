var scene;   //scene object
var camera;
var cubeMesh;


//animation variables
var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init(){

    if (Detector.webgl) {
        renderer = new THREE.WebGLRenderer({antialias:true});
    } else {
        // If its not supported, instantiate the canvas renderer to support all non WebGL browsers
        renderer = new THREE.CanvasRenderer();
    }

     // Set the background color of the renderer to black, with full opacity
    // renderer.setClearColor(0x000000,1);

    //I make transparent background of canvas
    renderer = new THREE.WebGLRenderer( { alpha: true } );
      // Get the size of the inner window (content area) to create a full size renderer
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

       // Set the renderers size
    renderer.setSize( 800, 250 );

    // Get the DIV element from the HTML document by its ID and append the renderers DOM
    //object to it
    document.getElementById("cube3js").appendChild(renderer.domElement);

     // Create the scene, in which all objects are stored
    scene = new THREE.Scene();

    // Now that we have a scene, we want to look into it. Therefore we need a camera.
 // Three.js offers three camera types:
  //  - PerspectiveCamera (perspective projection)
 //  - OrthographicCamera (parallel projection)
 //  - CombinedCamera (allows to switch between perspective / parallel projection
 //    during runtime)
 // In this example we create a perspective camera. Parameters for the perspective
  // camera are ...
  // ... field of view (FOV),
  // ... aspect ratio (usually set to the quotient of canvas width to canvas height)
  // ... near and
// ... far.
// Near and far define the cliping planes of the view frustum. Three.js provides an
 // example (http://mrdoob.github.com/three.js/examples/
 // -> canvas_camera_orthographic2.html), which allows to play around with these
// parameters.
// The camera is moved 10 units towards the z axis to allow looking to the center of
// the scene.
// After definition, the camera has to be added to the scene.
    camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 100);
    camera.position.set(0, 0, 10);
    camera.lookAt(scene.position);
    scene.add(camera);

    // Create the cube
    //parameters width, height, depth

    var boxGeometry = new THREE.BoxGeometry(2, 2, 2);

    // Applying different materials to the faces is a more difficult than applying one
     // material to the whole geometry. We start with creating an array of
     // THREE.MeshBasicMaterial.

     // Define six colored materials

     // var boxMaterials = [
     //    new THREE.MeshBasicMaterial({color:0XFFFFFF}),
     //    new THREE.MeshBasicMaterial({color:0XFFFFFF}),
     //    new THREE.MeshBasicMaterial({color:0XFFFFFF}),
     //    new THREE.MeshBasicMaterial({color:0XFFFFFF}),
     //    new THREE.MeshBasicMaterial({color:0XFFFFFF}),
     //    new THREE.MeshBasicMaterial({color:0xFFFFFF}),
     // ];

     // Create a MeshFaceMaterial, which allows the cube to have different materials on
     // each face

     // var boxMaterial = new THREE.MeshFaceMaterial(boxMaterials); //if I want every layer to be different color

     var boxMaterial = new THREE.MeshBasicMaterial({color:0XFFFFFF});

     // Create a mesh and insert the geometry and the material. Translate the whole mesh
     // by 1.5 on the x axis and by 4 on the z axis and add the mesh to the scene.
     boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
     boxMesh.position.set(0, 0, 0);
     scene.add(boxMesh);

     // move mouse and: left   click to rotate,
    //                 middle click to zoom,
    //                 right  click to pan
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.minDistance = 9;
    controls.maxDistance = 12;
    controls.rotateSpeed = 0.3;


    //GUI WITH COLOR CHANGE

    gui = new dat.GUI();

    parameters = {
        x: 0, y: 30, z: 0,
        color:  "#ff0000", // color (change "#" to "0x")
    };

    var boxMeshColor = gui.addColor( parameters, 'color' ).name('Color (Diffuse)').listen();
    boxMeshColor.onChange(function(value){ // onFinishChange
        boxMesh.material.color.setHex( value.replace("#", "0x") );
    });

    gui.open();
    updateBoxMesh();
}

function updateBoxMesh(){
    var newMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
}


function animate(){
    // Define the function, which is called by the browser supported timer loop. If the
    // browser tab is not visible, the animation is paused. So 'animateScene()' is called
    // in a browser controlled loop.
    requestAnimationFrame(animate);
    // Map the 3D scene down to the 2D screen (render the frame)
    render();
}

function render(){
    renderer.render(scene,camera);
}
