import { DotBase, IEdgeTarget, RootClusterType } from '../common';
import { commentOut, joinLines } from '../utils/dot-rendering';
import { Attributes } from './Attributes';
import { IContext } from './Context';
import { isEdgeTarget } from './Node';

/**
 * @category Primary
 */
export class Edge extends DotBase {
  public comment?: string;

  public readonly attributes = new Attributes();
  public readonly targets: IEdgeTarget[];

  get arrow(): string {
    switch (this.context.graphType) {
      case RootClusterType.graph:
        return '--';
      case RootClusterType.digraph:
      default:
        return '->';
    }
  }

  constructor(context: IContext, target1: IEdgeTarget, target2: IEdgeTarget);
  constructor(context: IContext, ...targets: IEdgeTarget[]);
  constructor(private context: IContext, target1: IEdgeTarget, target2: IEdgeTarget, ...targets: IEdgeTarget[]) {
    super();
    this.targets = [target1, target2, ...targets].filter(n => isEdgeTarget(n));
  }

  public toDot(): string {
    const comment = this.comment ? commentOut(this.comment) : undefined;
    const arrow = ` ${this.arrow} `;
    const target = this.targets.map(n => n.toEdgeTargetDot()).join(arrow);
    const attrs = this.attributes.size > 0 ? ` ${this.attributes.toDot()}` : '';
    const dot = `${target}${attrs};`;
    return joinLines(comment, dot);
  }
}
