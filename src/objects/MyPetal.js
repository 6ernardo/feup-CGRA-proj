import {CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyTriangle } from '../components/MyTriangle.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {

    constructor(scene, angle, petal_material, triangle_height, leaf) {
		super(scene);
        this.angle = angle;
        this.petal_material = petal_material;
        this.textures = [];
        if(leaf){
            this.leafTexture = new CGFtexture(this.scene, "src/images/leaf_texture.png");
            this.textures.push(this.leafTexture);
        }
        else {
            this.textureDown = new CGFtexture(this.scene, "src/images/petalTextDown1.png");
            this.textureUp = new CGFtexture(this.scene, "src/images/petalTextUp.png");
            this.texture = new CGFtexture(this.scene, "src/images/petal.png");
            this.textures.push(this.textureDown);
            this.textures.push(this.textureUp);
            this.textures.push(this.texture);
        }
        this.petal_material.setTextureWrap('REPEAT', 'REPEAT');
        // Generate a random index within the range of the textures array
        this.randomIndex = Math.floor(Math.random() * this.textures.length);
        this.triangle = new MyTriangle(this.scene, triangle_height);
	}

    display() {
        this.scene.pushMatrix();
        this.petal_material.setTexture(this.textures[this.randomIndex]);
        this.petal_material.apply();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.petal_material.setTexture(this.textures[this.randomIndex]);
        this.petal_material.apply();
        this.scene.rotate(-this.angle*Math.PI/180, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.triangle.display();
        this.scene.popMatrix();
    }
	
}

