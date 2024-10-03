import { CGFobject } from '../../lib/CGF.js';

/**
 * MyGrassBlade
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGrassBlade extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initBuffers();

    }

    initBuffers() {
        this.vertices = [
            -0.05, 0, 0, // A
            0.05, 0, 0, // B
            -0.05, 0.5, 0, //C
            0.05, 0.5, 0, //D
            0, 1, 0 // E
        ]

        this.indices = [
            0, 1, 2,
            1, 3, 2,
            2, 3, 4,
            2, 1, 0,
            2, 3, 1,
            4, 3, 2
        ]

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1
        ]

        this.texCoords = [
            0, 0,  
            1, 0,  
            0, 0.6, 
            1, 0.6, 
            0.5, 1  
        ];

        //The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }
}