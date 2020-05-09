const Window = require('window');

globalThis.window = new Window();

import { expect } from "chai";
import { Particle } from "../src/Core/Particle";
import { TestContainer } from "./Fixture/TestContainer";
import { TestParticles } from "./Fixture/TestParticles";

const testContainer = new TestContainer({});
const testParticles = new TestParticles(testContainer.container);

describe('Particles', () => {

    // Common options used when initializing Particles with a set number of particles
    const numParticles = 5;
    const numParticlesOptions = {
        particles: {
            number: {
                value: numParticles
            }
        }
    }

    it('should create the number of particles configured in container', () => {
        testContainer.reset(numParticlesOptions);
        testParticles.reset(testContainer.container);
        testParticles.particles.init();

        expect(testParticles.particles.count).to.equal(numParticles);
    });

    it('should add particles to array of particles', () => {
        testContainer.reset({});
        testParticles.reset(testContainer.container);

        const particle1 = new Particle(testContainer.container, {x: 1, y: 1});
        const particle2 = new Particle(testContainer.container, {x: 2, y: 2});
        const particle3 = new Particle(testContainer.container, {x: 3, y: 3});

        expect(testParticles.particles.count).to.equal(0);

        testParticles.particles.addParticle(particle1);
        expect(testParticles.particles.count).to.equal(1);
        expect(testParticles.particles.array).to.eql([particle1]);

        testParticles.particles.addParticle(particle2);
        expect(testParticles.particles.count).to.equal(2);
        expect(testParticles.particles.array).to.eql([particle1, particle2]);

        testParticles.particles.addParticle(particle3);
        expect(testParticles.particles.count).to.equal(3);
        expect(testParticles.particles.array).to.eql([particle1, particle2, particle3]);
    });

    it('should remove particles at specified indices', () => {
        testContainer.reset(numParticlesOptions);
        testParticles.reset(testContainer.container);
        testParticles.particles.init();

        const particle1 = testParticles.particles.array[0];
        const particle3 = testParticles.particles.array[2];
        const particle4 = testParticles.particles.array[3];
        const particle5 = testParticles.particles.array[4];

        testParticles.particles.removeAt(1);
        expect(testParticles.particles.array).to.eql([particle1, particle3, particle4, particle5]);
        expect(testParticles.particles.array).to.not.eql([particle5, particle4, particle3, particle1]);

        testParticles.particles.removeAt(2);
        expect(testParticles.particles.array).to.eql([particle1, particle3, particle5]);
        expect(testParticles.particles.array).to.not.eql([particle5, particle3, particle1]);
    });

    it('should remove specified quantity of indices, starting at the specified index', () => {
        testContainer.reset(numParticlesOptions);
        testParticles.reset(testContainer.container);
        testParticles.particles.init();

        const particle1 = testParticles.particles.array[0];
        const particle4 = testParticles.particles.array[3];
        const particle5 = testParticles.particles.array[4];

        testParticles.particles.removeAt(1, 2);
        expect(testParticles.particles.array).to.eql([particle1, particle4, particle5]);
        expect(testParticles.particles.array).to.not.eql([particle5, particle4, particle1]);

        testParticles.particles.removeAt(0, 2);
        expect(testParticles.particles.array).to.eql([particle5]);
    });

    it('should remove specified particle', () => {
        testContainer.reset(numParticlesOptions);
        testParticles.reset(testContainer.container);
        testParticles.particles.init();

        const particle1 = testParticles.particles.array[0];
        const particle2 = testParticles.particles.array[1];
        const particle3 = testParticles.particles.array[2];
        const particle4 = testParticles.particles.array[3];
        const particle5 = testParticles.particles.array[4];

        testParticles.particles.remove(particle4);
        expect(testParticles.particles.array).to.eql([particle1, particle2, particle3, particle5]);
        expect(testParticles.particles.array).to.not.eql([particle5, particle3, particle2, particle1]);

        testParticles.particles.remove(particle1);
        expect(testParticles.particles.array).to.eql([particle2, particle3, particle5]);
        expect(testParticles.particles.array).to.not.eql([particle5, particle3, particle2]);
    });

    it('should remove all particles when calling clear', () => {
        testContainer.reset(numParticlesOptions);
        testParticles.reset(testContainer.container);
        testParticles.particles.init();

        expect(testParticles.particles.count).to.equal(numParticles);
        testParticles.particles.clear();
        expect(testParticles.particles.count).to.equal(0);
        expect(testParticles.particles.array).to.eql([]);
    });

});