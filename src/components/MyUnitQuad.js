import {CGFappearance, CGFobject} from '../../lib/CGF.js';

/**
 * MyUnitQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitQuad extends CGFobject {
	constructor(scene, width, height, depth) {
		super(scene);

        this.width = width;
        this.height = height;
        this.depth = depth;

        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(0.42, 0.353, 0.314, 1);
        this.texture.setDiffuse(0.42, 0.353, 0.314, 1);
        this.texture.setSpecular(0.42, 0.353, 0.314, 1);
        this.texture.setShininess(10.0);

		this.initBuffers();
	}
	
	initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    // Vertices
    var halfWidth = this.width / 2;
    var halfHeight = this.height / 2;
    var halfDepth = this.depth / 2;

    this.vertices = [
        // Front face
        -halfWidth, -halfHeight, halfDepth,  // 0
        halfWidth, -halfHeight, halfDepth,   // 1
        halfWidth, halfHeight, halfDepth,    // 2
        -halfWidth, halfHeight, halfDepth,   // 3

        // Back face
        -halfWidth, -halfHeight, -halfDepth, // 4
        -halfWidth, halfHeight, -halfDepth,  // 5
        halfWidth, halfHeight, -halfDepth,   // 6
        halfWidth, -halfHeight, -halfDepth,  // 7

        // Top face
        -halfWidth, halfHeight, halfDepth,   // 8
        halfWidth, halfHeight, halfDepth,    // 9
        halfWidth, halfHeight, -halfDepth,   // 10
        -halfWidth, halfHeight, -halfDepth,  // 11

        // Bottom face
        -halfWidth, -halfHeight, halfDepth,  // 12
        -halfWidth, -halfHeight, -halfDepth, // 13
        halfWidth, -halfHeight, -halfDepth,  // 14
        halfWidth, -halfHeight, halfDepth,    // 15

        // Right face
        halfWidth, -halfHeight, halfDepth,   // 16
        halfWidth, -halfHeight, -halfDepth,  // 17
        halfWidth, halfHeight, -halfDepth,   // 18
        halfWidth, halfHeight, halfDepth,    // 19

        // Left face
        -halfWidth, -halfHeight, halfDepth,  // 20
        -halfWidth, halfHeight, halfDepth,   // 21
        -halfWidth, halfHeight, -halfDepth,  // 22
        -halfWidth, -halfHeight, -halfDepth  // 23
    ];

    // Indices
    this.indices = [
        0, 1, 2, 0, 2, 3,       // Front face
        4, 5, 6, 4, 6, 7,       // Back face
        8, 9, 10, 8, 10, 11,    // Top face
        12, 13, 14, 12, 14, 15, // Bottom face
        16, 17, 18, 16, 18, 19, // Right face
        20, 21, 22, 20, 22, 23  // Left face
    ];

    // Normals
    this.normals = [
        // Front face
        0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        // Back face
        0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
        // Top face
        0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
        // Bottom face
        0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
        // Right face
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
        // Left face
        -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0
    ];

    // Texture coordinates
    this.texCoords = [
        // Front face
        0, 0, 1, 0, 1, 1, 0, 1,
        // Back face
        1, 0, 1, 1, 0, 1, 0, 0,
        // Top face
        0, 0, 1, 0, 1, 1, 0, 1,
        // Bottom face
        0, 0, 1, 0, 1, 1, 0, 1,
        // Right face
        0, 0, 1, 0, 1, 1, 0, 1,
        // Left face
        1, 0, 1, 1, 0, 1, 0, 0
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();     
}

    display() {
        super.display();
    }
}

