import { Component } from 'ecsy';
import { Light } from '@babylonjs/core/Lights/light';

export interface LightComponent extends Component {
  name: string;
  intensity: number;
  light?: Light;
}

export const schema = {
  intensity: { default: 1 },
  light: { default: undefined },
};
