import { DefaultRenderingPipeline, PostProcessRenderPipeline } from '../../components';
import { queries } from '../../-private/systems/with-core';
import { assert } from '../../-private/utils/debug';
import { DefaultRenderingPipeline as BabylonDefaultRenderingPipeline } from '@babylonjs/core/PostProcesses/RenderPipeline/Pipelines/defaultRenderingPipeline';
import { assign } from '../../-private/utils/assign';
import FactoryArraySystem from '../../-private/systems/factory-array';
import '@babylonjs/core/Rendering/depthRendererSceneComponent';
import { Entity } from 'ecsy';

export default class DefaultRenderPipelineSystem extends FactoryArraySystem<
  DefaultRenderingPipeline,
  PostProcessRenderPipeline<BabylonDefaultRenderingPipeline>,
  BabylonDefaultRenderingPipeline
> {
  protected instanceComponentConstructor = PostProcessRenderPipeline;
  protected instanceConstructor = BabylonDefaultRenderingPipeline;

  protected create(c: DefaultRenderingPipeline): BabylonDefaultRenderingPipeline {
    assert('SsaoRenderPipelineSystem needs BabylonCoreComponent', this.core);

    const instance = new BabylonDefaultRenderingPipeline(c.name, true, this.core.scene);
    this._updateInstance(instance, c);

    return instance;
  }

  protected updateInstance(
    entity: Entity,
    instance: BabylonDefaultRenderingPipeline,
    c: DefaultRenderingPipeline
  ): void {
    this._updateInstance(instance, c);
  }

  private _updateInstance(instance: BabylonDefaultRenderingPipeline, c: DefaultRenderingPipeline): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, imageProcessing, chromaticAberration, depthOfField, fxaa, glowLayer, grain, sharpen, ...args } = c;
    assign(instance, args);
    assign(instance.imageProcessing, imageProcessing);
    assign(instance.chromaticAberration, chromaticAberration);
    assign(instance.depthOfField, depthOfField);
    assign(instance.fxaa, fxaa);
    if (instance.glowLayer) assign(instance.glowLayer, glowLayer);
    assign(instance.grain, grain);
    assign(instance.sharpen, sharpen);
  }

  static queries = {
    ...queries,
    factory: {
      components: [DefaultRenderingPipeline],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
