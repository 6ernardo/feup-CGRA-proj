import { CGFobject, CGFtexture, CGFappearance } from "../../lib/CGF.js";
import { MyUnitQuad } from '../components/MyUnitQuad.js';
import { MySphere } from "../components/MySphere.js";
import { MyRectangle } from "../components/MyRectangle.js";

export class MyHive extends CGFobject {
    constructor(scene, width, height) {
        super(scene);
        this.width = width;
        this.height = height;

        this.textureBox = new CGFtexture(this.scene, "src/images/hive.png");
        this.woodText = new CGFtexture(this.scene, "src/images/woodText.png");

        this.hole = new CGFappearance(this.scene);
        this.hole.setAmbient(0, 0, 0, 1);
        this.hole.setDiffuse(0, 0, 0, 1);
        this.hole.setSpecular(0, 0, 0, 0);
        this.hole.setShininess(10.0);

        this.unitQuad = new MyUnitQuad(this.scene, this.width, this.height, this.width);
        this.circle = new MySphere(this.scene, 2, 10, 10);
        this.rail = new MyRectangle(this.scene, this.width / 4, this.height / 8);
    }

    display() {
        // Display "box"
        this.scene.pushMatrix();
        this.unitQuad.texture.setTexture(this.textureBox);
        this.unitQuad.texture.apply();
        this.unitQuad.display();
        this.scene.popMatrix();

        // Display rectangle on the top face
        this.scene.pushMatrix();
        this.rail.wood.setTexture(this.woodText);
        this.rail.wood.apply();
        this.scene.translate(-this.width/2 + 1 , this.height / 2 + 0.05, -this.width/2 + 2.5); // Translate to the top face
        this.scene.scale(this.width*0.38, 1, 1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);// Rotate to lay flat on the top face
        this.rail.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.rail.wood.apply();
        this.scene.translate(-this.width/2 + 1 , this.height / 2 + 0.05, -this.width/2 + 4.5); // Translate to the top face
        this.scene.scale(this.width*0.38, 1, 1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);// Rotate to lay flat on the top face
        this.rail.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.rail.wood.apply();
        this.scene.translate(-this.width/2 + 1 , this.height / 2 + 0.05, -this.width/2 + 6.5); // Translate to the top face
        this.scene.scale(this.width*0.38, 1, 1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);// Rotate to lay flat on the top face
        this.rail.display();
        this.scene.popMatrix();


        // Display hole
        this.scene.pushMatrix();
        this.hole.apply();
        this.scene.scale(1, 1, 0.05);
        this.scene.translate(0, 0, this.width * 10);
        this.circle.display();
        this.scene.popMatrix();
    }
}
