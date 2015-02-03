// var point = new Point(10, 5);

// var points[] = new Point(50, 50);

angryBool = true;


var pointArray = [
    [-100, 100],
    [-99,80],
    [-88,60],
    [-77,40],
    [-66,20],
    [-55,0],
    [-44,-20],
    [-33,-40],
    [-22,-60],
    [-11,-80],
    [0,-100],

    [99,80],
    [88,60],
    [77,40],
    [66,20],
    [55,0],
    [44,-20],
    [33,-40],
    [22,-60],
    [11,-80],

    [100, 100],

    [-40,20],
    [-20,20],
    [0,20],
    [20,20],
    [40,20]
];

// var pointArray = [
//     [-50, 100],
//     [-50,80],
//     [-50,60],
//     [-50,40],
//     [-50,20],
//     [-50,0],
//     [-50,-20],
//     [-50,-40],
//     [-50,-60],
//     [-50,-80],
//     [-50,-100],

//     [-40,-100],
//     [-30,-100],
//     [-20,-100],
//     [-10,-100],
//     [0,-100],
//     [10,-100],

//     [40,-75],
//     [50,-50],
//     [40,-25],



//     [-40,0],
//     [-30,0],
//     [-20,0],
//     [-10,0],
//     [0,0],
//     [10,0],

//     [40,75],
//     [50,50],
//     [40,25],

//     [-40,100],
//     [-30,100],
//     [-20,100],
//     [-10,100],
//     [0,100],
//     [10,100],
//     [20,100]
// ];

var scalePulse = 1;
var scaleDir = 1;


// Create a symbol, which we will use to place instances of later:
// var path = new Path.Circle({
//     center: [0, 0],
//     radius:  20,
//     fillColor: 'white',
//     strokeColor: 'white'
// });

var path = new Path.Rectangle({
    topLeft: [-20, -20],
    bottomRight: [20, 20],
    // radius:  0,
    fillColor: 'white',
    strokeColor: 'white'
});

var scaler = [];

var symbol = new Symbol(path);


// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}



// Place the instances of the symbol:
for (var i = 0; i < pointArray.length; i++) {

    var coords = pointArray[i];
    // The center position is a random point in the view:
    var center = new Point(view.center.x + coords[0],view.center.y + coords[1]);//Point.random() * view.size;
    // {"x": 1, "y": 2}
    // var center = new Point(coords.x, coords.y);
    var placedSymbol = symbol.place(center);

    var scScaleTemp = getRandomInt(4,8) / 5;
    var scSpeedTemp = getRandomInt(1,10) / 1000;

    scaler.push({"scScale": scScaleTemp, "scSpeed": scSpeedTemp, "scDir": 1 });

    placedSymbol.scale(scScaleTemp);
}




// The onFrame function is called up to 60 times a second:
function onFrame(event) {
    // Run through the active layer's children list and change
    // the position of the placed symbols:

    var val = $('#angriness_slider').slider("option", "value");
    // console.log(val);

    // scalePulse += 0.5 * scaleDir;

    // if (scalePulse > 10) {
    //     scaleDir *= -1;
    // } else if (scalePulse < -10 ) {
    //     scaleDir *= -1;
    // }


    // console.log(scalePulse);

    for (var i = 0; i < pointArray.length; i++) {

        var item = project.activeLayer.children[i];


        // item.scaling = 1.1;
        // console.litem.curves;

        // item.scaling = .5;


        var itScale = scaler[i].scScale;
        var itSpeed = scaler[i].scSpeed;
        var itDir = scaler[i].scDir;

        if (itScale >= 1.4) {
            scaler[i].scDir *= -1;
        } else if (itScale <= 0.8 ) {
            scaler[i].scDir *= -1;
        }

        itScale += itSpeed * scaler[i].scDir;
        scaleVar = itScale;

        scaler[i].scScale = itScale;

        // var scaleVar = val * scaler[i].scSpeed;

        item.scaling = scaleVar;


        item = path.smooth();



        // item.rotate(20-getRandomInt(0,40));


        // item.scaling = val;
        // item.radius =

        // if (scalePulse >= 2) {
        //     scaleDir *= -1;
        // } else if (scalePulse < 0.1 ) {
        //     scaleDir *= -1;
        // }

        // scalePulse += scaler[i] * scaleDir;

        // item.scaling = scalePulse;
        // console.log(scaler[i]);


    }
}