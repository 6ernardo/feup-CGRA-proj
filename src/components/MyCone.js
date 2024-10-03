import {CGFobject} from '../../lib/CGF.js';
/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCone extends CGFobject {
    constructor(scene, radius, height, slices, stacks) {
        super(scene);
        this.radius = radius;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            this.vertices.push(this.radius * Math.cos(ang), 0, -Math.sin(ang) * this.radius);
            this.indices.push(i, (i+1) % this.slices, this.slices);
            this.indices.push(this.slices, (i+1) % this.slices, i);
            this.normals.push(Math.cos(ang), Math.cos(Math.atan(this.height/this.radius)), -Math.sin(ang));
            this.texCoords.push(Math.cos(ang), Math.sin(ang));
            ang+=alphaAng;
        }
        this.vertices.push(0, this.height,0);
        this.normals.push(0, 1, 0);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


