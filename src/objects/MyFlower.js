import {CGFobject} from '../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyPollen } from './MyPollen.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {

    constructor(scene, external_radius, petal_number, petal_material, receptacle_radius, receptacle_height, receptacle_material, stem_radius, stem_height, stem_angle, stem_material, leaf_color, petal_angle, petal_insert_angle) {
		super(scene);

        this.petal_number = petal_number;
        this.stem_height = stem_height;
        this.petal_insert_angle = petal_insert_angle;
        this.receptacle_height = receptacle_height;
        this.receptacle_radius = receptacle_radius;
        this.receptacle_material = receptacle_material;
        this.petal_material = petal_material;
        this.stem_material = stem_material;
        this.stem_angle = stem_angle;
        
        let d = external_radius - receptacle_radius;
        this.triangle_height = (d/2) / (Math.sin((petal_angle/2)*(Math.PI/180)))

        this.stem = new MyStem(this.scene, stem_radius, stem_height, stem_material, stem_angle, leaf_color);
        this.receptacle = new MyReceptacle(this.scene, receptacle_radius, receptacle_height, receptacle_material);
        this.petal = new MyPetal(this.scene, petal_angle, petal_material, this.triangle_height);
}

    display() {
        this.scene.pushMatrix();
        this.stem.display();
        this.scene.popMatrix();

        for(let i = 0; i < this.petal_number; i++){
            this.scene.pushMatrix();
            this.scene.translate(0, this.stem.stem_y , this.stem.stem_z);
            this.scene.rotate(this.stem_angle * this.stem_height * Math.PI/180, 1, 0, 0);
            this.scene.rotate((360/this.petal_number)*i*Math.PI/180, 0, 1, 0);
            this.scene.translate(0, 0, this.receptacle_radius-0.2)
            this.scene.rotate(this.petal_insert_angle * Math.PI / 180, 1, 0, 0);
            this.scene.translate(0, 0, this.triangle_height)
            this.scene.rotate( -90 * Math.PI/180, 1, 0, 0);
            this.petal.display();
            this.scene.popMatrix();
        }        

        this.scene.pushMatrix();
        this.scene.translate(0, this.stem.stem_y, this.stem.stem_z);
        this.scene.rotate(this.stem_angle * this.stem_height * Math.PI/180, 1, 0, 0);
        this.receptacle.display();
        this.scene.popMatrix();
    }
	
}

