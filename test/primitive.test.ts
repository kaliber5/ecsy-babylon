import { BabylonCore, Box, Lines, Parent, Plane, Sphere } from '../src/components';
import setupWorld from './helpers/setup-world';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { LinesMesh } from '@babylonjs/core/Meshes/linesMesh';
import { Color3 } from '@babylonjs/core/Maths/math.color';

describe('primitive system', function () {
  describe('box', function () {
    it('can create a default box', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box, { name: 'test' });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      expect(scene.meshes).toHaveLength(1);

      const mesh = scene.meshes[0];
      expect(mesh).toBeInstanceOf(AbstractMesh);

      mesh.updateFacetData();
      expect(mesh.facetNb).toEqual(12); // 6 sides, two polys each
      expect(mesh.getBoundingInfo().boundingBox.minimum.equalsToFloats(-0.5, -0.5, -0.5)).toBeTrue();
      expect(mesh.getBoundingInfo().boundingBox.maximum.equalsToFloats(0.5, 0.5, 0.5)).toBeTrue();
      expect(scene.geometries).toHaveLength(1);
    });

    it('can create a custom box', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box, { name: 'test', width: 2, height: 3, depth: 4 });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      expect(scene.meshes).toHaveLength(1);

      const mesh = scene.meshes[0];
      expect(mesh).toBeInstanceOf(AbstractMesh);

      mesh.updateFacetData();
      expect(mesh.facetNb).toEqual(12); // 6 sides, two polys each
      expect(mesh.getBoundingInfo().boundingBox.minimum.equalsToFloats(-1, -1.5, -2)).toBeTrue();
      expect(mesh.getBoundingInfo().boundingBox.maximum.equalsToFloats(1, 1.5, 2)).toBeTrue();
      expect(scene.geometries).toHaveLength(1);
    });

    it('can update a box', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box, { name: 'test', width: 2, height: 3, depth: 4 });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      const component = entity.getMutableComponent(Box);
      Object.assign(component, {
        width: 4,
        height: 2,
      });

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);

      const mesh = scene.meshes[0];
      expect(mesh).toBeInstanceOf(AbstractMesh);
      expect(mesh.getBoundingInfo().boundingBox.minimum.equalsToFloats(-2, -1, -2)).toBeTrue();
      expect(mesh.getBoundingInfo().boundingBox.maximum.equalsToFloats(2, 1, 2)).toBeTrue();
      expect(scene.geometries).toHaveLength(1);
    });

    it('can remove a box', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Box, { name: 'test' });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      entity.remove();

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(0);
      expect(scene.geometries).toHaveLength(0);
    });
  });

  describe('plane', function () {
    it('can create a default plane', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Plane, { name: 'test' });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      expect(scene.meshes).toHaveLength(1);

      const mesh = scene.meshes[0];
      expect(mesh).toBeInstanceOf(AbstractMesh);

      mesh.updateFacetData();
      expect(mesh.facetNb).toEqual(2);
      expect(mesh.getBoundingInfo().boundingBox.minimum.equalsToFloats(-0.5, -0.5, 0)).toBeTrue();
      expect(mesh.getBoundingInfo().boundingBox.maximum.equalsToFloats(0.5, 0.5, 0)).toBeTrue();
      expect(scene.geometries).toHaveLength(1);
    });

    it('can create a custom plane', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Plane, { name: 'test', width: 2, height: 3 });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      expect(scene.meshes).toHaveLength(1);

      const mesh = scene.meshes[0];
      expect(mesh).toBeInstanceOf(AbstractMesh);

      mesh.updateFacetData();
      expect(mesh.facetNb).toEqual(2);
      expect(mesh.getBoundingInfo().boundingBox.minimum.equalsToFloats(-1, -1.5, 0)).toBeTrue();
      expect(mesh.getBoundingInfo().boundingBox.maximum.equalsToFloats(1, 1.5, 0)).toBeTrue();
      expect(scene.geometries).toHaveLength(1);
    });

    it('can update a plane', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Plane, { name: 'test', width: 2, height: 3 });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      const component = entity.getMutableComponent(Plane);
      Object.assign(component, {
        width: 4,
      });

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);

      const mesh = scene.meshes[0];
      expect(mesh).toBeInstanceOf(AbstractMesh);
      expect(mesh.getBoundingInfo().boundingBox.minimum.equalsToFloats(-2, -1.5, 0)).toBeTrue();
      expect(mesh.getBoundingInfo().boundingBox.maximum.equalsToFloats(2, 1.5, 0)).toBeTrue();
      expect(scene.geometries).toHaveLength(1);
    });

    it('can remove a plane', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Plane, { name: 'test' });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      entity.remove();

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(0);
      expect(scene.geometries).toHaveLength(0);
    });
  });

  describe('sphere', function () {
    it('can create a default sphere', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Sphere, { name: 'test' });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      expect(scene.meshes).toHaveLength(1);

      const mesh = scene.meshes[0];
      expect(mesh).toBeInstanceOf(AbstractMesh);
      expect(mesh.getBoundingInfo().boundingBox.minimum.equalsToFloats(-0.5, -0.5, -0.5)).toBeTrue();
      expect(mesh.getBoundingInfo().boundingBox.maximum.equalsToFloats(0.5, 0.5, 0.5)).toBeTrue();
      expect(scene.geometries).toHaveLength(1);
    });

    it('can create a custom sphere', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Sphere, { name: 'test', diameterX: 2, diameterY: 3, diameterZ: 4 });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      expect(scene.meshes).toHaveLength(1);

      const mesh = scene.meshes[0];
      expect(mesh).toBeInstanceOf(AbstractMesh);
      expect(mesh.getBoundingInfo().boundingBox.minimum.equalsToFloats(-1, -1.5, -2)).toBeTrue();
      expect(mesh.getBoundingInfo().boundingBox.maximum.equalsToFloats(1, 1.5, 2)).toBeTrue();
      expect(scene.geometries).toHaveLength(1);
    });

    it('can update a sphere', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Sphere, { name: 'test', diameterX: 2, diameterY: 3, diameterZ: 4 });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      const component = entity.getMutableComponent(Sphere);
      Object.assign(component, {
        diameterX: 4,
        diameterY: 2,
      });

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);

      const mesh = scene.meshes[0];
      expect(mesh).toBeInstanceOf(AbstractMesh);
      expect(mesh.getBoundingInfo().boundingBox.minimum.equalsToFloats(-2, -1, -2)).toBeTrue();
      expect(mesh.getBoundingInfo().boundingBox.maximum.equalsToFloats(2, 1, 2)).toBeTrue();
      expect(scene.geometries).toHaveLength(1);
    });

    it('can remove a sphere', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Sphere, { name: 'test' });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      entity.remove();

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(0);
      expect(scene.geometries).toHaveLength(0);
    });
  });

  describe('lines', function () {
    it('can create a line', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Lines, { name: 'test', points: [new Vector3(-0.5, -0.5, 0), new Vector3(0.5, 0.5, 0)] });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      expect(scene.meshes).toHaveLength(1);

      const mesh = scene.meshes[0];
      expect(mesh).toBeInstanceOf(LinesMesh);
      expect(mesh.getBoundingInfo().boundingBox.minimum.equalsToFloats(-0.5, -0.5, 0)).toBeTrue();
      expect(mesh.getBoundingInfo().boundingBox.maximum.equalsToFloats(0.5, 0.5, 0)).toBeTrue();
      expect(scene.geometries).toHaveLength(1);
    });

    it('can apply color and alpha', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Lines, {
        name: 'test',
        points: [new Vector3(-0.5, -0.5, 0), new Vector3(0.5, 0.5, 0)],
        color: new Color3(1, 0, 0),
        alpha: 0.5,
      });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);

      expect(scene.meshes).toHaveLength(1);

      const mesh = scene.meshes[0] as LinesMesh;
      expect(mesh).toBeInstanceOf(LinesMesh);
      expect(mesh.color.equalsFloats(1, 0, 0)).toBeTrue();
      expect(mesh.alpha).toEqual(0.5);
    });

    it('can update a line', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity.addComponent(Parent).addComponent(Lines, {
        name: 'test',
        points: [new Vector3(-0.5, -0.5, 0), new Vector3(0.5, 0.5, 0)],
        color: new Color3(1, 0, 0),
        alpha: 1,
      });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      const component = entity.getMutableComponent(Lines);
      Object.assign(component, {
        points: [new Vector3(-2, -1.5, 0), new Vector3(2, 1.5, 0)],
        color: new Color3(0, 1, 0),
        alpha: 0.5,
      });

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(1);

      const mesh = scene.meshes[0] as LinesMesh;
      expect(mesh).toBeInstanceOf(LinesMesh);
      expect(mesh.getBoundingInfo().boundingBox.minimum.equalsToFloats(-2, -1.5, 0)).toBeTrue();
      expect(mesh.getBoundingInfo().boundingBox.maximum.equalsToFloats(2, 1.5, 0)).toBeTrue();
      expect(mesh.color.equalsFloats(0, 1, 0)).toBeTrue();
      expect(mesh.alpha).toEqual(0.5);
      expect(scene.geometries).toHaveLength(1);
    });

    it('can remove a line', function () {
      const { world, rootEntity } = setupWorld();

      const entity = world.createEntity();
      entity
        .addComponent(Parent)
        .addComponent(Lines, { name: 'test', points: [new Vector3(-0.5, -0.5, 0), new Vector3(0.5, 0.5, 0)] });

      world.execute(0, 0);

      const { scene } = rootEntity.getComponent(BabylonCore);
      entity.remove();

      world.execute(0, 0);

      expect(scene.meshes).toHaveLength(0);
      expect(scene.geometries).toHaveLength(0);
    });
  });
});