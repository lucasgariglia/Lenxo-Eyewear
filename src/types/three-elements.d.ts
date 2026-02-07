import { Object3DNode } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      opticalMaterial: Object3DNode<any, any>;
    }
  }
}
