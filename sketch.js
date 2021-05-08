let theta = 0; //angle of rotation
let coordinates = []; //array to store the coordinates of the hypercube
let d = 2; //distance used to add perspective
let a = 150; //side length
let prCoordinates = []; //projected and rotated coordinates

function setup() {
  //background (WEBGL mode is used to have control over the camera angle)
  canvas = createCanvas(420, 420, WEBGL);
  canvas.center();

  //hardcoding the coordinates
  coordinates[0] = [[-1], [-1], [-1], [1]];
  coordinates[1] = [[1], [-1], [-1], [1]];
  coordinates[2] = [[1], [1], [-1], [1]];
  coordinates[3] = [[-1], [1], [-1], [1]];
  coordinates[4] = [[-1], [-1], [1], [1]];
  coordinates[5] = [[1], [-1], [1], [1]];
  coordinates[6] = [[1], [1], [1], [1]];
  coordinates[7] = [[-1], [1], [1], [1]];
  coordinates[8] = [[-1], [-1], [-1], [-1]];
  coordinates[9] = [[1], [-1], [-1], [-1]];
  coordinates[10] = [[1], [1], [-1], [-1]];
  coordinates[11] = [[-1], [1], [-1], [-1]];
  coordinates[12] = [[-1], [-1], [1], [-1]];
  coordinates[13] = [[1], [-1], [1], [-1]];
  coordinates[14] = [[1], [1], [1], [-1]];
  coordinates[15] = [[-1], [1], [1], [-1]];
}

function draw() {
  //background properties
  background(175);
  //changing camera angle
  rotateX(60);
  //changing angle input to degress
  angleMode(DEGREES);

  //rotation matrix (ZW)
  const rotationMatrix = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, cos(theta), -sin(theta)],
    [0, 0, sin(theta), cos(theta)],
  ];

  for (let i = 0; i < 16; i++) {
    rTemp = matrixMultiplication(rotationMatrix, coordinates[i]);

    let z = 1 / (d - rTemp.w); //to give perspective

    //projecting the coordinates to 3d
    let pTemp = new createVector(z * rTemp.x, z * rTemp.y, z * rTemp.z);
    pTemp.x *= a / 2;
    pTemp.y *= a / 2;
    pTemp.z *= a / 2;
    pTemp.w *= a / 2;
    prCoordinates[i] = pTemp;

    //for vertices
    stroke(255, 200);
    strokeWeight(20);
    noFill();
    point(pTemp.x, pTemp.y, pTemp.z);
  }

  //for sides
  for (let i = 0; i < 8; i++) {
    if (i < 4) {
      sides(0, i, i + 4);
      sides(8, i, i + 4);
      sides(0, i, i + 8);
      sides(0, i, (i + 1) % 4);
      sides(8, i, (i + 1) % 4);
      sides(0, i + 4, ((i + 1) % 4) + 4);
      sides(8, i + 4, ((i + 1) % 4) + 4);
    }
    sides(0, i, i + 8);
  }
  //changing the angle to rotate
  theta += 1;
}

//function to draw the sides
function sides(i, j1, j2) {
  strokeWeight(4);
  stroke(5);
  line(
    prCoordinates[j1 + i].x,
    prCoordinates[j1 + i].y,
    prCoordinates[j1 + i].z,
    prCoordinates[j2 + i].x,
    prCoordinates[j2 + i].y,
    prCoordinates[j2 + i].z
  );
}

//matrix multiplication function
function matrixMultiplication(m1, m2) {  

  if (m1[0].length == m2.length) {
    r = [];
    for (let j = 0; j < m1.length; j++) {
      r[j] = [];
      for (let i = 0; i < m2[0].length; i++) {
        let temp = 0;
        for (let n = 0; n < m1[0].length; n++) {
          temp += m1[j][n] * m2[n][i];
        }
        r[j][i] = temp;
      }
    }
    ans = new createVector4(r[0][0], r[1][0], r[2][0], r[3][0]);
    return ans
  }
}

//defined a class to create a vector with 4 dimensions
class createVector4 {
  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
}
