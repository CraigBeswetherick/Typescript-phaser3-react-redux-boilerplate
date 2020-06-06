/*
 * action types
 */
export const INCREASE_SCORE: string = 'INCREASE_SCORE';
export const RESET_SCORE: string = 'RESET_SCORE';
export const INCREASE_DATE: string = 'INCREASE_DATE';
export const BUY_MANAGER: string = 'BUY_MANAGER';
export const BUY_BUSINESS: string = 'BUY_BUSINESS';

/*
 * action creators
 */

export function increaseScore(increment: number) {
  return { type: INCREASE_SCORE, increment };
}

export function resetScore() {
  return { type: INCREASE_SCORE };
}

export function increaseDate() {
  return { type: INCREASE_DATE };
}

export function buyManager(managerId: number) {
  return { type: BUY_MANAGER, managerId };
}

export function buyBusiness(businessId: number) {
  return { type: BUY_BUSINESS, businessId };
}
