import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';
import { MyPollen } from './MyPollen.js';

/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGarden extends CGFobject {
	constructor(scene) {
		super(scene);

        this.flowers = [];
        this.deviation_x = [];
        this.deviation_z = [];
        this.pollen_positions = [];
        this.pollen_display = [];
        this.pollen = new MyPollen(this.scene, 8, 8);

        this.pollen_pos_undefined = true;

        //hardcoded bit, always generates 5x5 matrix of flowers
        for(let i=0; i<5; i++){
            let row = [];
            let row_x = [];
            let row_z= [];
            let row_pos = [];
            let row_display = [];
            for(let j=0; j<5; j++){
                row.push(this.generateRandomFlower());

                // (pseudo) random position in the matrix
                let random_x = 3 + Math.random() * 8;
                let random_z = 3 + Math.random() * 8;
                row_x.push(random_x);
                row_z.push(random_z);

                let position = {x:0, y:0, z:0};
                row_pos.push(position);

                row_display.push(true);
            }
            this.deviation_x.push(row_x);
            this.deviation_z.push(row_z);
            this.flowers.push(row);
            this.pollen_positions.push(row_pos);
            this.pollen_display.push(row_display);
        }
	}

    display(row, column) {

        for(let i=0; i<row; i++){
            for(let j=0; j<column; j++){

                this.scene.pushMatrix();
                this.scene.translate(this.deviation_x[i][j] + 15 * i, 0, this.deviation_z[i][j] + 15 * j);
                this.flowers[i][j].display();
                this.scene.popMatrix();

                if(this.pollen_pos_undefined){
                    this.pollen_positions[i][j].x = this.deviation_x[i][j] + 15 * i;
                    this.pollen_positions[i][j].y = this.flowers[i][j].stem.stem_y;
                    this.pollen_positions[i][j].z = this.deviation_z[i][j] + 15 * j + this.flowers[i][j].stem.stem_z;
                }

                this.scene.pushMatrix();
                //this.scene.translate(this.deviation_x[i][j] + 15 * i, this.flowers[i][j].stem.stem_y, this.deviation_z[i][j] + 15 * j + this.flowers[i][j].stem.stem_z);
                this.scene.translate(this.pollen_positions[i][j].x, this.pollen_positions[i][j].y, this.pollen_positions[i][j].z);
                this.scene.rotate(this.flowers[i][j].stem_angle * this.flowers[i][j].stem_height * Math.PI/180, 1, 0, 0);
                this.scene.scale(0.5, 0.5, 0.5);
                if(this.pollen_display[i][j]) this.pollen.display();
                this.scene.popMatrix();
            }
        }
        this.pollen_pos_undefined = false;
    }

    // 0 = no hit, 1 = hit but no pollen, 2 = hit and pollen
    check_flower_hit(position, displacement){
        for(let i=0; i<5; i++){
            for(let j=0; j<5; j++){
                if(this.pollen_positions[i][j].x != 0 && this.pollen_positions[i][j].y != 0 && this.pollen_positions[i][j].z != 0){ //pollen position is defined
                    //checks if positions is the same, with some tolerance
                    if((this.pollen_positions[i][j].x + displacement.x  > position.x - 3 && this.pollen_positions[i][j].x  + displacement.x < position.x + 3) &&
                    (this.pollen_positions[i][j].y + displacement.y > position.y - 1 && this.pollen_positions[i][j].y + displacement.y < position.y + 1) &&
                    (this.pollen_positions[i][j].z + displacement.z > position.z - 3 && this.pollen_positions[i][j].z + displacement.z < position.z + 3)){
                        if(this.pollen_display[i][j]){
                            this.pollen_display[i][j] = false;
                            return 2;
                        }
                        else return 1;
                    }
                }
            }
        }
        return 0;
    }

    generateRandomFlower() {
        /* FLOWER */
        //external radius (between 3 and 7)
        let external_radius = 3 + Math.random() * 4;
    
        /*  RECEPTACLE  */
        //receptacle material
    
        //receptacle radius (between 0.4 and 0.6)
        let receptacle_radius = 0.4 + Math.random() * 0.2;

        //receptacle height (between 0.3 and 0.5)
        let receptacle_height = 0.3 + Math.random() * 0.2;
    
        /*  STEM  */
        //stem material
        //stem radius (between 0.1 and 0.15)
        let stem_radius = 0.1 + Math.random() * 0.05;
    
        //stem height (between 4 and 14)
        let stem_height = Math.round(4 + Math.random() * 10);

        //stem incline (between -2 and 2)
        let stem_incline = -2 + Math.random() * 4;
    
        /*  PETAL  */
        //petal material
        //petal number (between 6 and 15)
        let petal_number = Math.round(6 + Math.random() * 9);
        //petal angle (between 150 and 200)
        let petal_angle = 150 + Math.random() * 50;
        //petal insert angle (between -15 and 15)
        let petal_insert_angle = -15 + Math.random() * 30;
        
      
        //generate different shades of yellow for the receptacles
        let receptacle_material = new CGFappearance(this.scene);
        let [r, g, b] = this.randomYellow();
        receptacle_material.setAmbient(r, g, b, 1.0);
        receptacle_material.setDiffuse(r, g, b, 1.0);
        receptacle_material.setSpecular(r, g, b, 1.0);
        receptacle_material.setShininess(10.0);

        //different materials for the petals
        let petal_material = new CGFappearance(this.scene);
        petal_material.setAmbient(this.randomize(0,1), this.randomize(0,1), this.randomize(0,1), 1.0);
        petal_material.setDiffuse(this.randomize(0,1), this.randomize(0,1), this.randomize(0,1), 1.0);
        petal_material.setSpecular(this.randomize(0,0.5), this.randomize(0,0.5), this.randomize(0,0.5), 1.0);
        petal_material.setShininess(10.0);
    
        //generate different shades of green for the stems
        let stem_material = new CGFappearance(this.scene);
        let [r1, g1, b1] = this.randomGreen();
        stem_material.setAmbient(r1, g1, b1, 1.0);
        stem_material.setDiffuse(r1, g1, b1, 1.0);
        stem_material.setSpecular(r1, g1, b1, 1.0);
        stem_material.setShininess(10.0);

         //generate different shades of green for the leaves
         let leaf_material = new CGFappearance(this.scene);
         leaf_material.setAmbient(0.5*r1, 0.5*g1, 0.5*b1, 1.0);
         leaf_material.setDiffuse(0.5*r1, 0.5*g1, 0.5*b1, 1.0);
         leaf_material.setSpecular(0.5*r1, 0.5*g1, 0.5*b1, 1.0);
         leaf_material.setShininess(10.0);


        return new MyFlower(this.scene, external_radius, petal_number, petal_material , receptacle_radius, receptacle_height, receptacle_material, stem_radius, stem_height, stem_incline, stem_material, leaf_material, petal_angle, petal_insert_angle);

    }

    randomize(min, max) {
        return Math.random() * (max - min) + min;
    }

    randomYellow() {
        const baseValue = this.randomize(0.7, 1); // Ensuring a certain level of brightness
        const variationR = this.randomize(0, 0.3);
        const variationG = this.randomize(0, 0.3);
        const variationB = this.randomize(0, 0.3);
        const r = baseValue + variationR;
        const g = baseValue + variationG;
        const b = this.randomize(0, variationB);
        return [r, g, b];
    }

    randomGreen() {
        const baseValue = this.randomize(0.2, 0.6); // Lowering the base value for darker greens
        const variationR = this.randomize(0.1, 0.4);
        const variationG = this.randomize(0.1, 0.4);
        const variationB = this.randomize(0.1, 0.4);
        const r = this.randomize(0, variationR);
        const g = baseValue + variationG;
        const b = this.randomize(0, variationB);
        return [r, g, b];
    }

	
}

