import { CGFobject, CGFappearance, CGFtexture, CGFshader} from '../../lib/CGF.js';
import { MyGrassBlade } from './MyGrassBlade.js';

/**
 * MyGrassPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGrassPatch extends CGFobject {

    constructor(scene) {
        super(scene);

        this.grass = new MyGrassBlade(this.scene);

        this.deviation_x = [];
        this.deviation_z = [];
        this.rotation = [];
        for(let i=0; i<50; i++){
            let row_x = [];
            let row_z = [];
            let row = [];
            for(let j=0; j<50; j++){
                row_x.push(Math.random() * 0.5);
                row_z.push(Math.random() * 0.5);
                row.push(Math.random() * Math.PI) //180 degrees
            }
            this.deviation_x.push(row_x);
            this.deviation_z.push(row_z);
            this.rotation.push(row);
        }

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.345, 0.761, 0.192, 1);
        this.material.setDiffuse(0.345, 0.761, 0.192, 1);
        this.material.setSpecular(0.345/2, 0.761/2, 0.192/2, 1);
        this.material.setShininess(10.0);

        this.text = new CGFtexture(this.scene, "src/images/grassBlade.png");

        //this.grassShader = new CGFshader(this.scene.gl, "src/shaders/grass.vert", "src/shaders/grass.frag");
	}

    update(t){
        //this.grassShader.setUniformsValues({ timeFactor: t / 100 % 100 })
    }

    display() {
        
        //this.scene.setActiveShader(this.grassShader);
        for(let i=0; i<50; i++){
            for(let j=0; j<50; j++){
                this.scene.pushMatrix();
                this.scene.translate(this.deviation_x[i][j] + i, 0, this.deviation_z[i][j] + j);
                this.scene.rotate(this.rotation[i][j], 0, 1, 0);
                this.material.setTexture(this.text);
                this.material.apply();
                this.grass.display();
                this.scene.popMatrix();
            }
        }
        //this.scene.setActiveShader(this.scene.defaultShader);
    }
	
}

