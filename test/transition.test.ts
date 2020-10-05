import { ArcRotateCamera, BabylonCore, Box, Parent, Position, Rotation, Scale, Transitions } from '../src/components';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import setupWorld from './helpers/setup-world';
import { wait } from './helpers/wait';

describe('transform system', function () {
  it('can transition position', async function () {
    const { world, rootEntity } = setupWorld();

    // we need a camera to trigger the render loop needed for animations
    world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

    const entity = world.createEntity();
    entity
      .addComponent(Parent)
      .addComponent(Transitions, {
        value: [
          {
            property: 'position',
            frameRate: 30,
            duration: 200,
          },
        ],
      })
      .addComponent(Box)
      .addComponent(Position, { value: Vector3.Zero() });

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore)!;
    const component = entity.getMutableComponent(Position)!;
    component.value = new Vector3(1, 2, 3);

    world.execute(0, 0);

    expect(scene.meshes).toHaveLength(1);
    scene.meshes[0].computeWorldMatrix(true);
    expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(0);
    expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(0);
    expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(0);

    await wait(100);
    scene.meshes[0].computeWorldMatrix(true);
    expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toBeGreaterThan(0);
    expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toBeLessThan(1);
    expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toBeGreaterThan(0);
    expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toBeLessThan(2);
    expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toBeGreaterThan(0);
    expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toBeLessThan(3);

    await wait(250);
    scene.meshes[0].computeWorldMatrix(true);
    expect(scene.meshes[0].getWorldMatrix().getTranslation().x).toEqual(1);
    expect(scene.meshes[0].getWorldMatrix().getTranslation().y).toEqual(2);
    expect(scene.meshes[0].getWorldMatrix().getTranslation().z).toEqual(3);
  });

  it('can transition rotation', async function () {
    const { world, rootEntity } = setupWorld();

    // we need a camera to trigger the render loop needed for animations
    world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

    const entity = world.createEntity();
    entity
      .addComponent(Parent)
      .addComponent(Transitions, {
        value: [
          {
            property: 'rotation',
            frameRate: 30,
            duration: 200,
          },
        ],
      })
      .addComponent(Box)
      .addComponent(Rotation, { value: Vector3.Zero() });

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore)!;
    const component = entity.getMutableComponent(Rotation)!;
    component.value = new Vector3(0, 180, 0);

    world.execute(0, 0);

    expect(scene.meshes).toHaveLength(1);
    scene.meshes[0].computeWorldMatrix(true);
    expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[0]).toBeCloseTo(1);
    expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[1]).toBeCloseTo(0);
    expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[2]).toBeCloseTo(0);

    await wait(250);
    scene.meshes[0].computeWorldMatrix(true);
    expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[0]).toBeCloseTo(-1);
    expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[1]).toBeCloseTo(0);
    expect(scene.meshes[0].getWorldMatrix().getRotationMatrix().asArray()[2]).toBeCloseTo(0);
  });

  it('can transition scale', async function () {
    const { world, rootEntity } = setupWorld();

    // we need a camera to trigger the render loop needed for animations
    world.createEntity().addComponent(Parent).addComponent(ArcRotateCamera);

    const entity = world.createEntity();
    entity
      .addComponent(Parent)
      .addComponent(Transitions, {
        value: [
          {
            property: 'scaling',
            frameRate: 30,
            duration: 200,
          },
        ],
      })
      .addComponent(Box)
      .addComponent(Scale, { value: Vector3.One() });

    world.execute(0, 0);

    const { scene } = rootEntity.getComponent(BabylonCore)!;
    const component = entity.getMutableComponent(Scale)!;
    component.value = new Vector3(2, 1, 1);

    world.execute(0, 0);

    expect(scene.meshes).toHaveLength(1);
    scene.meshes[0].computeWorldMatrix(true);
    expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toEqual(1);
    expect(scene.meshes[0].getWorldMatrix().asArray()[1]).toEqual(0);
    expect(scene.meshes[0].getWorldMatrix().asArray()[2]).toEqual(0);

    await wait(250);
    expect(scene.meshes[0].getWorldMatrix().asArray()[0]).toEqual(2);
    expect(scene.meshes[0].getWorldMatrix().asArray()[1]).toEqual(0);
    expect(scene.meshes[0].getWorldMatrix().asArray()[2]).toEqual(0);
  });
});