import {CGFobject, CGFappearance,CGFtexture} from "../../lib/CGF.js";
import { MySphere } from "../components/MySphere.js";
/**
 * MyPollen
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 **/

export class MyPollen extends CGFobject {

    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;

        this.texture = new CGFtexture(this.scene, "src/images/pollen.png");

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.8, 0.8, 0.2, 1.0);
        this.material.setDiffuse(0.8, 0.8, 0.2,  1.0);
        this.material.setSpecular(0.8, 0.8, 0.2,  1.0);
        this.material.setShininess(10.0);

        this.pollen = new MySphere(this.scene, 1 ,this.slices, this.stacks);
    }
    
    display() {
        this.scene.pushMatrix();
        this.material.setTexture(this.texture);
        this.material.apply();
        this.scene.scale(1,1.5,1);
        this.pollen.display();
        this.scene.popMatrix();
    }
}