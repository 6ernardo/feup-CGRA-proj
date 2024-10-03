import {CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyCone } from '../components/MyCone.js';
/**
 * MyReceptacle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyReceptacle extends CGFobject {

    constructor(scene, radius, height, receptacle_material) {
		super(scene);
        this.cone = new MyCone(this.scene, radius, height, 12, 1);
        this.receptacle_material = receptacle_material;
        this.texture = new CGFtexture(this.scene, "src/images/receptableText.png");
        this.receptacle_material.setTextureWrap('REPEAT', 'REPEAT');
    }
    
    display() {
        this.scene.pushMatrix();
        this.receptacle_material.setTexture(this.texture);
        this.receptacle_material.apply();
        this.cone.display();
        this.scene.popMatrix();

    }
	
}

