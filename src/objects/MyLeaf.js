import {CGFobject} from '../../lib/CGF.js';
import { MyCylinder } from '../components/MyCylinder.js';
import { MyPetal } from './MyPetal.js';

/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeaf extends CGFobject {

    constructor(scene, leaf_material) {
		super(scene);
        this.petal = new MyPetal(this.scene, 180, leaf_material, 1, true);
        this.cylinder = new MyCylinder(this.scene, 10, 1, 0.03);
        this.leaf_material = leaf_material;
    }


    display() {
        this.scene.pushMatrix();
        this.leaf_material.apply();
        this.petal.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.leaf_material.apply();
        this.scene.translate(0, -0.2, 0);
        this.scene.rotate(-90 * Math.PI / 180, 1, 0, 0);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.leaf_material.apply();
        this.scene.translate(0, -1, 0);
        this.scene.rotate(-90 * Math.PI / 180, 1, 0, 0);
        this.cylinder.display();
        this.scene.popMatrix();
    }
	
}

