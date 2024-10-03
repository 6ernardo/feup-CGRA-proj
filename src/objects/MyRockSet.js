import { CGFobject} from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';

/**
 * MyRockSet
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRockSet extends CGFobject {

    constructor(scene, height, radius) {
		super(scene);
        this.height = height;
        this.radius = radius;
        
        //array of rocks
        this.rocks = [];
        this.scale_variation = [];

        for(let i=0; i<this.height; i++){
            for(let j=0; j<(2*(i+1)-1)**2; j++){
                this.rocks.push(new MyRock(this.scene, radius, 8, 8));
                let x = 0.6 + Math.random() * 0.4;
                let y = 0.4 + Math.random() * 0.2;
                let z = 0.6 + Math.random() * 0.4;
                this.scale_variation.push(x, y, z);
            }
        }
	}


    display() {
        let counter = 0;
        for(let i=0; i<this.height; i++){
            for(let row=0; row<2*(i+1)-1; row++){
                for(let column=0; column<2*(i+1)-1; column++){
                    let rock = this.rocks[counter];

                    this.scene.pushMatrix();
                    this.scene.translate((row + this.height - i - 1)*(this.radius*1.1), (this.height - i - 1)*(this.radius*0.7), (column + this.height - i - 1)*(this.radius*1.1));
                    this.scene.scale(this.scale_variation[counter*3], this.scale_variation[counter*3+1], this.scale_variation[counter*3+2]);
                    rock.display();
                    this.scene.popMatrix();

                    counter++;
                }
            }
        }
    }
	
}

