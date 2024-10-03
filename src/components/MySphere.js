import { CGFobject, CGFappearance } from "../../lib/CGF.js";

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {
    constructor(scene, radius, slices, stacks, inverted = false) {
        super(scene);

        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.inverted = inverted;

        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(1, 1, 1, 1);
        this.texture.setDiffuse(1, 1, 1, 1);
        this.texture.setSpecular(1, 1, 1, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('src/images/earth.jpg');

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var increment_stack = Math.PI / (this.stacks * 2);
        var increment_slice = (2 * Math.PI) / this.slices;

        var y_vertices = this.stacks + 1;

        for (let i = 0; i <= this.stacks * 2; i++) {
            for (let j = 0; j <= this.slices; j++) {

                // Generate vertices
                var x = this.radius * Math.cos(increment_slice * j) * Math.sin(increment_stack * i);
                var y = this.radius * Math.cos(increment_stack * i);
                var z = this.radius * Math.sin(-increment_slice * j) * Math.sin(increment_stack * i);

                this.vertices.push(x, y, z);

                // Generate indices for horizontal lines
                if (i < this.stacks * 2 && j < this.slices) {
                    var current = i * y_vertices + j;
                    var next = current + y_vertices;

                    if (this.inverted) {
                        this.indices.push(current, current + 1, next);
                        this.indices.push(next, current + 1, next + 1);
                    } else {
                        this.indices.push(current + 1, current, next);
                        this.indices.push(current + 1, next, next + 1);
                    }
                }

                // Generate normals
                if (this.inverted) this.normals.push(-x, -y, -z);
                else this.normals.push(x, y, z);

                this.texCoords.push(j / this.slices, i / (this.stacks * 2));
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        //this.texture.apply();
        super.display();
    }
}
