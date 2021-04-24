import { Action } from '@ngrx/store';
import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CHANGE, ChangeAction } from './router.actions';

export function ofRoute(
  route: string | string[]
): OperatorFunction<Action, Action> {
  return filter((action: Action) => {
    const isRouteAction = action.type === CHANGE;

    if (isRouteAction) {
      const routeAction = action as ChangeAction;
      const routePath = routeAction.payload.path;
      if (Array.isArray(route)) {
        return route.includes(routePath);
      } else {
        return routePath === route;
      }
    }
    return isRouteAction;
  });
}
