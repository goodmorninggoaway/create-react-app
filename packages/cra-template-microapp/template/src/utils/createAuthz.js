import { isArray, isFunction, isObject } from 'underscore';

/**
 * Replacement for AuthorizationEvaluator
 * Most products will in the shortterm have their own version of
 * authorization based on an inventory call and maybe whether a
 * user is internal or external.
 */

// memoize because otherwise this changes on every state change which could degrade performance
let prevSession = null;
let memoized = null;
export default function createAuthz(session) {
  if (session === prevSession && memoized) {
    return memoized;
  }

  const evaluate = access => {
    // If they don't specify any access, always allow access
    if (access === undefined) {
      return true;
    }

    // If access does not require session data, allow access based on truthiness of access
    if (!isFunction(access) && !isObject(access)) {
      return !!access;
    }

    // Otherwise, since they need a session for evaluating access, short circuit and return false
    // if there is no session yet
    if (!session) {
      return false;
    }

    // If access is a function, call it with the session parameter
    if (isFunction(access)) {
      return access(session);
    }

    // Now access can only be an object.
    // Assume that each key is looking
    // for matching properties in the session object
    // If multiple properties are listed, we "and" each
    // of those requirements which comes up rarely but is the way
    // the old authorizationEvaluator worked so we are maintaining that behavior
    return Object.keys(access).every(sessionProp => {
      let requirement = access[sessionProp];
      requirement = isArray(requirement) ? requirement : [requirement];
      let current = session[sessionProp];
      current = isArray(current) ? current : [current];

      // Check if any requirement value matches the current value
      // AKA, we are doing an "or" within one property which is used
      // all the time, e.g. checking if a user is a customer OR a partner
      // would be: { oculusRoles: ['customer', 'partner'] }
      return requirement.some(i => current.includes(i));
    });
  };

  const filter = list => list.filter(({ access }) => evaluate(access));

  prevSession = session;
  memoized = {
    evaluate,
    filter,
  };

  return memoized;
}
