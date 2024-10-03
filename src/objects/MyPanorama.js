import { CGFobject, CGFappearance } from "../../../lib/CGF.js";
import { MySphere } from '../../components/MySphere.js';
/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);

        this.sphere = new MySphere(this.scene, 200, 50, 50, true);
        this.texture = new CGFappearance(this.scene);
        this.texture.setEmission(1, 1, 1, 1);
        this.texture.setTexture(texture);

        this.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.texture.apply();

        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);

        this.sphere.display();
        this.scene.popMatrix();
    }
}