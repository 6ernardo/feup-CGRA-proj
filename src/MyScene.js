import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyGarden } from "./objects/MyGarden.js";
import { MyPanorama } from "./objects//MyPanorama.js";
import { MyPlane } from "./objects/MyPlane.js";
import { MyRockSet } from "./objects/MyRockSet.js";
import { MyBee } from "./objects/MyBee.js";
import { MyHive } from "./objects/MyHive.js"
import { MyPollen } from "./objects/MyPollen.js"
import { MyGrassPatch } from "./objects/MyGrassPatch.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.garden = new MyGarden(this);
    this.rockset = new MyRockSet(this, 4, 2);
    this.hive = new MyHive(this, 8, 10);
    this.pollen = new MyPollen(this, 15, 15);
    this.grasspatch = new MyGrassPatch(this);

    let texture = new CGFtexture(this, "src/images/panorama.jpg");
    this.panorama = new MyPanorama(this, texture);

    this.bee = new MyBee(this);

    //Objects connected to MyInterface
    this.displayPanorama = true;
    this.displayAxis = false;
    this.displayGarden = true;
    this.displayRockSet = true;
    this.scaleFactor = 1;
    this.speedFactor = 1;
    this.gardenRows = 5;
    this.gardenColumns = 5;

    this.enableTextures(true);

  this.texture = new CGFtexture(this, "src/images/ground.jpg");
  this.appearance = new CGFappearance(this);
  this.appearance.setTexture(this.texture);
  this.appearance.setTextureWrap('REPEAT', 'REPEAT');

  this.garden_displacement = {x: 10, y: -25, z: 10};
  this.previous_velocity = {x: 0, y: 0, z: 0};
  this.previous_velocity_flag = false; //if true, this velocity is valid
  this.hive_coords = {x: -23.4, y: -18, z: 36.6}

  this.starttime = Date.now();
  this.setUpdatePeriod(30);
  }

  initLights() {
    this.lights[0].setPosition(0, 50, 0, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();

    this.lights[1].setPosition(40, 10, 40, 1);
    this.lights[1].setDiffuse(0.4, 0.4, 0.4, 1.0);
    this.lights[1].setSpecular(0.4, 0.4, 0.4, 1.0);
    this.lights[1].enable();
    this.lights[1].update();

    
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  checkKeys() {
    var text="Keys pressed: ";
    var keysPressed = false;

    if (this.gui.isKeyPressed("KeyW")) {
      this.bee.accelerate(0.01 * this.speedFactor);
      text += " W ";
      keysPressed = true;
    }
    
    if (this.gui.isKeyPressed("KeyS")) {
      this.bee.accelerate(-0.01 * this.speedFactor);
      text += " S ";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyA")) {
      this.bee.turn(5 * Math.PI / 180 * this.speedFactor);
      text += " A ";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyD")) {
      this.bee.turn(-5 * Math.PI / 180 * this.speedFactor);
      text += " D ";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyR")) {
      this.bee.reset();
      text += " R ";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyF")) {
      this.bee.descend(this.speedFactor);
      text += " F ";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyP")) {
      console.log(this.previous_velocity);
      this.bee.ascend(this.speedFactor, this.previous_velocity);
      text += " P ";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyO")) {
      if(this.bee.pollen_display && this.bee.position.y == 0){
        this.bee.gotohive(this.speedFactor, this.hive_coords)
      }
      text += " O ";
      keysPressed = true;
    }

    if (keysPressed) console.log(text);
  }

  update(t) {
    this.time_diff = (t - this.starttime) / 1000.0;

    this.oscilation = Math.sin(this.time_diff * Math.PI * 2);
    this.wings = Math.sin(this.time_diff * Math.PI * 12);
    this.bee.update(this.oscilation, this.wings, 3, this.hive_coords);


    let flower_hit_check = this.garden.check_flower_hit(this.bee.position, this.garden_displacement);
    if(flower_hit_check == 2){
      this.bee.pollen_display = true;
      if(this.previous_velocity_flag){
        this.previous_velocity.x = this.bee.velocity.x;
        this.previous_velocity.y = this.bee.velocity.y;
        this.previous_velocity.z = this.bee.velocity.z;
        this.previous_velocity_flag = false;
      }
      this.bee.velocity = {x: 0, y: 0, z: 0};
    }
    else if(flower_hit_check == 1) this.bee.velocity = {x: 0, y: 0, z: 0};
    else {
      if(this.bee.position.y == 0){
        this.previous_velocity.x = this.bee.velocity.x;
        this.previous_velocity.y = this.bee.velocity.y;
        this.previous_velocity.z = this.bee.velocity.z;
      } 
      this.previous_velocity_flag = true;
    } 

    //grass
    this.grasspatch.update(t);

    this.checkKeys();
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    if (this.displayPanorama) this.panorama.display();

    this.pushMatrix();
    this.translate(0, -25, 0);
    this.scale(2.5, 2.5, 2.5);
    this.grasspatch.display();
    this.popMatrix();

    if (this.displayGarden){
      this.pushMatrix();
      this.translate(this.garden_displacement.x, this.garden_displacement.y, this.garden_displacement.z);
      this.garden.display(this.gardenRows, this.gardenColumns);
      this.popMatrix();
    } 


    if(this.displayRockSet){
      this.pushMatrix();
      this.translate(-30, -25, 30);
      this.rockset.display();
      this.popMatrix();
  }

    this.pushMatrix();
    this.translate(this.hive_coords.x, this.hive_coords.y, this.hive_coords.z);
    this.rotate(90* Math.PI / 180, 0, 1, 0);
    this.hive.display();
    this.popMatrix();

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-25,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    // ---- END Primitive drawing section

    this.pushMatrix();
    this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    this.bee.display();
    this.popMatrix();
  }

}
