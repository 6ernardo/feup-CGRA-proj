import { CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MyCone } from '../components/MyCone.js';
import { MySphere } from '../components/MySphere.js';
import { MyPollen } from './MyPollen.js';

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject {

    constructor(scene, position = {x: 0, y: 0, z: 0}, orientation = 0, velocity = {x: 0, y:0, z: 0}) {
        super(scene);
        this.sphere = new MySphere(this.scene, 1, 15, 15);
        this.cone = new MyCone(this.scene, 1, 5, 6, 1);
        this.pollen = new MyPollen(this.scene, 10, 10);

        this.position = position;
        this.orientation = orientation;
        this.velocity = velocity;
        this.wing_angle = 0;
        this.oscilation;
        this.is_oscilating = true;
        this.pollen_display = false;

        this.initMaterials();
    }

    initMaterials(){
        this.head = new CGFappearance(this.scene);
        this.head.setAmbient(219/255, 181/255, 35/255, 1.0);
        this.head.setDiffuse(219/255, 181/255, 35/255, 1.0);
        this.head.setSpecular(219/255/2, 181/255/2, 35/255/2, 1.0);
        this.head.setShininess(10.0);

        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(1, 1, 0, 1.0);
        this.yellow.setDiffuse(1, 1, 0,  1.0);
        this.yellow.setSpecular(1, 1, 0,  1.0);
        this.yellow.setShininess(10.0);

        this.black = new CGFappearance(this.scene);
        this.black.setAmbient(0.1, 0.1, 0.1,  1.0);
        this.black.setDiffuse(0.15, 0.15, 0.15,  1.0);
        this.black.setSpecular(0.1, 0.1, 0.1,  1.0);

        this.wing = new CGFappearance(this.scene);
        this.wing.setAmbient(0.5, 1, 1, 0.10);
        this.wing.setDiffuse(0.5, 1, 1,  0.10);
        this.wing.setSpecular(0.5, 1, 1,  0.10);
        this.wing.setEmission(0, 0, 0, 0);

        this.beetex = new CGFtexture(this.scene, "src/images/beetex.jpg");
        this.yellow.setTextureWrap('REPEAT', 'REPEAT');
    }

    update(oscilation, wings, delta_t, hive_coords) {
        this.oscilation = oscilation;
        this.wing_angle = 20 * wings;

        let { x, y, z } = this.position;
        this.position.x = x + this.velocity.x * delta_t;
        this.position.y = y + this.velocity.y * delta_t;
        this.position.z = z + this.velocity.z * delta_t;

        if(this.position.y >= 0){
            this.is_oscilating = true;
            this.velocity.y = 0;
            this.position.y = 0;
        }

        if(this.position.y <= -22){
            this.is_oscilating = false;
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.velocity.z = 0;
            this.position.y = -22
        }

        if((this.position.x < hive_coords.x + 1 && this.position.x > hive_coords.x - 1) && 
        (this.position.y < hive_coords.y + 1 && this.position.y > hive_coords.y - 1) && 
        this.position.z < hive_coords.z + 1 && this.position.z > hive_coords.z - 1){
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.velocity.z = 0;
            this.pollen_display = false;
            this.is_oscilating = true;
        }
    }

    turn(v) {
        this.orientation += v;

        let norma = Math.sqrt(this.velocity.x ** 2 + this.velocity.z ** 2);
        this.velocity.x = norma * Math.sin(this.orientation);
        this.velocity.z = norma * Math.cos(this.orientation);
    }

    accelerate(v) {
        this.velocity.x += v * Math.sin(this.orientation);
        this.velocity.z += v * Math.cos(this.orientation);
    }

    reset() {
        this.position = {x: 0, y:0, z: 0};
        this.orientation = 0;
        this.velocity = {x: 0, y:0, z: 0};
    }

    descend(speedFactor) {
        this.velocity.y = -speedFactor/5;
        this.is_oscilating = false;
    }

    ascend(speedFactor, previous_velocity) {
        this.velocity.y = speedFactor/5;
        this.velocity.x = previous_velocity.x;
        this.velocity.z = previous_velocity.z;
        this.is_oscilating = false;
    }

    gotohive(speedFactor, hive_coords){
        let direction_vector = {x: hive_coords.x - this.position.x, y: hive_coords.y - this.position.y, z: hive_coords.z - this.position.z}
        let norma = Math.sqrt((hive_coords.x - this.position.x)**2+(hive_coords.y - this.position.y)**2+(hive_coords.z - this.position.z)**2);
        this.velocity.x = direction_vector.x / norma * speedFactor/5;
        this.velocity.y = direction_vector.y / norma * speedFactor/5;
        this.velocity.z = direction_vector.z / norma * speedFactor/5;
        this.is_oscilating = false;
    }

    display_left_legs(){
        //left front
        this.scene.pushMatrix();
        this.scene.translate(-1.5, -0.5, 0.5);
        this.scene.rotate( 15 * Math.PI / 180, 0, 1, 0);
        this.scene.rotate( -65 * Math.PI / 180, 0, 0, 1);
        this.scene.scale(0.15, 0.8, 0.15);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, -0.85, 0.28);
        this.scene.translate(-1.5, -0.5, 0.5);
        this.scene.rotate( 15 * Math.PI / 180, 0, 1, 0);
        this.scene.rotate( -35 * Math.PI / 180, 0, 0, 1);
        this.scene.scale(0.15, 0.8, 0.15);
        this.sphere.display();
        this.scene.popMatrix();

        //left mid
        this.scene.pushMatrix();
        this.scene.translate(-1.5, -0.5, 0);
        //this.scene.rotate( 15 * Math.PI / 180, 0, 1, 0);
        this.scene.rotate( -65 * Math.PI / 180, 0, 0, 1);
        this.scene.scale(0.12, 0.8, 0.12);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, -0.85, 0);
        this.scene.translate(-1.5, -0.5, 0);
        //this.scene.rotate( -15 * Math.PI / 180, 0, 1, 0);
        this.scene.rotate( -35 * Math.PI / 180, 0, 0, 1);
        this.scene.scale(0.15, 0.8, 0.15);
        this.sphere.display();
        this.scene.popMatrix();

        //left back
        this.scene.pushMatrix();
        this.scene.translate(-1.5, -0.5, -0.5);
        this.scene.rotate( -15 * Math.PI / 180, 0, 1, 0);
        this.scene.rotate( -65 * Math.PI / 180, 0, 0, 1);
        this.scene.scale(0.12, 0.8, 0.12);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, -0.85, -0.28);
        this.scene.translate(-1.5, -0.5, -0.5);
        this.scene.rotate( -15 * Math.PI / 180, 0, 1, 0);
        this.scene.rotate( -35 * Math.PI / 180, 0, 0, 1);
        this.scene.scale(0.15, 0.8, 0.15);
        this.sphere.display();
        this.scene.popMatrix();
    }

    display_right_legs(){
        //right front
        this.scene.pushMatrix();
        this.scene.translate(1.5, -0.5, 0.5);
        this.scene.rotate( -15 * Math.PI / 180, 0, 1, 0);
        this.scene.rotate( 65 * Math.PI / 180, 0, 0, 1);
        this.scene.scale(0.15, 0.8, 0.15);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, -0.85, 0.28);
        this.scene.translate(1.5, -0.5, 0.5);
        this.scene.rotate( -15 * Math.PI / 180, 0, 1, 0);
        this.scene.rotate( 35 * Math.PI / 180, 0, 0, 1);
        this.scene.scale(0.15, 0.8, 0.15);
        this.sphere.display();
        this.scene.popMatrix();

        //right mid
        this.scene.pushMatrix();
        this.scene.translate(1.5, -0.5, 0);
        //this.scene.rotate( -15 * Math.PI / 180, 0, 1, 0);
        this.scene.rotate( 65 * Math.PI / 180, 0, 0, 1);
        this.scene.scale(0.15, 0.8, 0.15);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, -0.85, 0);
        this.scene.translate(1.5, -0.5, 0);
        //this.scene.rotate( -15 * Math.PI / 180, 0, 1, 0);
        this.scene.rotate( 35 * Math.PI / 180, 0, 0, 1);
        this.scene.scale(0.15, 0.8, 0.15);
        this.sphere.display();
        this.scene.popMatrix();

        //right back
        this.scene.pushMatrix();
        this.scene.translate(1.5, -0.5, -0.5);
        this.scene.rotate( 15 * Math.PI / 180, 0, 1, 0);
        this.scene.rotate( 65 * Math.PI / 180, 0, 0, 1);
        this.scene.scale(0.15, 0.8, 0.15);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, -0.85, -0.28);
        this.scene.translate(1.5, -0.5, -0.5);
        this.scene.rotate( 15 * Math.PI / 180, 0, 1, 0);
        this.scene.rotate( 35 * Math.PI / 180, 0, 0, 1);
        this.scene.scale(0.15, 0.8, 0.15);
        this.sphere.display();
        this.scene.popMatrix();
    }

    display() {
        let { x, y, z } = this.position;
        
        if(this.is_oscilating) this.scene.translate(x, y + this.oscilation, z);
        else this.scene.translate(x, y, z)
        
        this.scene.rotate(this.orientation, 0, 1, 0);
        
        //head
        this.scene.pushMatrix();
        this.head.apply();
        this.scene.translate(0, 0, 1.6);
        this.scene.rotate(55 * Math.PI / 180, 1, 0, 0);
        this.scene.scale(0.7, 0.6, 1);
        this.sphere.display();
        this.scene.popMatrix();

        //torax
        this.scene.pushMatrix();
        this.yellow.setTexture(this.beetex);
        this.yellow.apply();
        this.scene.scale(1, 0.9, 1);
        this.scene.rotate(60*Math.PI/180, 1, 0, 0);
        this.sphere.display();
        this.scene.popMatrix();
    
        //abdomen
        this.scene.pushMatrix();
        this.yellow.apply();
        this.scene.rotate(-30 * Math.PI / 180, 1, 0, 0);
        this.scene.translate(0, 0, -2.4);
        this.scene.scale(1, 1, 1.5);
        this.scene.rotate(90*Math.PI/180, 1, 0, 0);
        this.sphere.display();
        this.scene.popMatrix();

        //antenas
        this.scene.pushMatrix();
        this.black.apply();
        this.scene.translate(0.2, 0.7, 1.5);
        this.scene.rotate(15 * Math.PI / 180, 0, 1, 0);
        this.scene.rotate(45 * Math.PI / 180, 1, 0, 0);
        this.scene.scale(0.06, 0.1, 0.06);
        this.cone.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.black.apply();
        this.scene.translate(-0.2, 0.7, 1.5);
        this.scene.rotate(-15 * Math.PI / 180, 0, 1, 0);
        this.scene.rotate(45 * Math.PI / 180, 1, 0, 0);
        this.scene.scale(0.06, 0.1, 0.06);
        this.cone.display();
        this.scene.popMatrix();

        //eyes
        this.scene.pushMatrix();
        this.black.apply();
        this.scene.translate(0.5, 0.4, 1.8);
        this.scene.rotate(55 * Math.PI / 180, 1, 0, 0);
        this.scene.scale(0.25, 0.2, 0.35);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.black.apply();
        this.scene.translate(-0.5, 0.4, 1.8);
        this.scene.rotate(55 * Math.PI / 180, 1, 0, 0);
        this.scene.scale(0.25, 0.2, 0.35);
        this.sphere.display();
        this.scene.popMatrix();

        //sting
        this.scene.pushMatrix();
        this.black.apply();
        this.scene.translate(0, -1.8, -3.2);
        this.scene.rotate(-120 * Math.PI / 180, 1, 0, 0);
        this.scene.scale(0.12, 0.15, 0.12);
        this.cone.display();
        this.scene.popMatrix();

        if(this.pollen_display){
            this.scene.pushMatrix();
            this.scene.rotate(25*Math.PI/180, 0, 0, 1);
            this.display_left_legs();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.rotate(-25*Math.PI/180, 0, 0, 1);
            this.display_right_legs();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, -2, 0);
            this.scene.rotate(90*Math.PI/180, 0, 0, 1);
            this.pollen.display();
            this.scene.popMatrix();
        }
        else {
            this.display_left_legs();
            this.display_right_legs();
        }

        //wings
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA)
        this.scene.gl.enable(this.scene.gl.BLEND)

        this.scene.pushMatrix();
        this.wing.apply();
        this.scene.translate(Math.cos(45*Math.PI/180) - 0.1, Math.sin(45*Math.PI/180)-0.1, 0.3); //
        this.scene.rotate((30 + this.wing_angle) * Math.PI / 180, 0, 0, 1); //
        this.scene.scale(1.8, 0.05, 0.4);
        this.scene.translate(1, 0, 0);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.wing.apply();
        this.scene.translate(-Math.cos(45*Math.PI/180) + 0.1, Math.sin(45*Math.PI/180)-0.1, 0.3); //
        this.scene.rotate(-(30 + this.wing_angle) * Math.PI / 180, 0, 0, 1); //
        this.scene.scale(1.8, 0.05, 0.4);
        this.scene.translate(-1, 0, 0);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.wing.apply();
        this.scene.translate(Math.cos(45*Math.PI/180) - 0.1, Math.sin(45*Math.PI/180)-0.1, -0.3); //
        this.scene.rotate((30 + this.wing_angle) * Math.PI / 180, 0, 0, 1); //
        this.scene.rotate(10*Math.PI/180, 0, 1, 0);
        this.scene.scale(1.5, 0.05, 0.3);
        this.scene.translate(1, 0, 0);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.wing.apply();
        this.scene.translate(-Math.cos(45*Math.PI/180) + 0.1, Math.sin(45*Math.PI/180)-0.1, -0.3); //
        this.scene.rotate(-(30 + this.wing_angle) * Math.PI / 180, 0, 0, 1); //
        this.scene.rotate(-10*Math.PI/180, 0, 1, 0);
        this.scene.scale(1.5, 0.05, 0.3);
        this.scene.translate(-1, 0, 0);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.gl.enable(this.scene.gl.BLEND)
    }
	
}

