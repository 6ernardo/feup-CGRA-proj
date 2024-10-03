import { CGFobject, CGFappearance } from '../../lib/CGF.js';

/**
 * MyRectangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param width - Width of the rectangle
 * @param height - Height of the rectangle
 */
export class MyRectangle extends CGFobject {
    constructor(scene, width, height) {
        super(scene);
        this.width = width;
        this.height = height;

        this.wood = new CGFappearance(this.scene);
        this.wood.setAmbient(0.451, 0.31, 0.231, 1);
        this.wood.setDiffuse(0.451, 0.31, 0.231, 1);
        this.wood.setSpecular(0.451, 0.31, 0.231, 1);
        this.wood.setShininess(10.0);

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            // Vertices for the rectangle
            0, 0, 0,    // 0
            this.width, 0, 0,    // 1
            this.width, this.height, 0,    // 2
            0, this.height, 0,    // 3
            0, 0, 0,    // 4 (duplicated for back face)
            this.width, 0, 0,    // 5 (duplicated for back face)
            this.width, this.height, 0,    // 6 (duplicated for back face)
            0, this.height, 0    // 7 (duplicated for back face)
        ];

        this.indices = [
            0, 1, 2,
            0, 2, 3,
            4, 6, 5,
            4, 7, 6
        ];

        this.normals = [
            // Normals for front face
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            // Normals for back face
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1
        ];

        this.texCoords = [
            0, 1,
            1, 1,
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            1, 0,
            0, 0
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}
