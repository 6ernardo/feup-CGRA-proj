import {CGFobject} from '../../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
	constructor(scene, slices, stacks, radius){
        super(scene);

        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;

        this.initBuffers();
    }
	
initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    let increment = 2 * Math.PI / this.slices; // Angle in between each point of the prism in radians
    let stack_height = 1 / this.stacks;

    // Initialize vertices and texture coordinates
    for (let i = 0; i <= this.stacks; i++) {
        for (let j = 0; j < this.slices; j++) {
            let x = this.radius * Math.cos(j * increment);
            let y = this.radius * Math.sin(j * increment);
            let z = i * stack_height;

            // Calculate texture coordinates
            let s = j / (this.slices - 1); // Horizontal texture mapping
            let t = i / this.stacks; // Vertical texture mapping

            this.vertices.push(x, y, z);
            this.texCoords.push(s, t);
        }
    }

    // Initialize indices
    for (let i = 1; i <= this.stacks; i++) {
        for (let j = 0; j < this.slices - 1; j++) {
            this.indices.push(j + this.slices * (i - 1), j + this.slices * (i - 1) + 1, j + 1 + this.slices * i);
            this.indices.push(j + 1 + this.slices * i, j + this.slices * i, j + this.slices * (i - 1));
        }
        // Draw last face
        this.indices.push(i * this.slices - 1, this.slices * (i - 1), this.slices * i);
        this.indices.push(this.slices * i, this.slices * (i + 1) - 1, i * this.slices - 1);
    }

    // Initialize normals
    for (let i = 0; i <= this.stacks; i++) {
        for (let j = 0; j < this.slices; j++) {
            this.normals.push(Math.cos(j * increment), Math.sin(j * increment), 0);
        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
}

