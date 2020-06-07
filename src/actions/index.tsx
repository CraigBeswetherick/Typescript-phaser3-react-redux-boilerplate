import { Manager } from '../Reducers/Managers';
import { Business } from '../Reducers/Business';

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

export function increaseScore(
  businesses: Array<Business>,
  managers: Array<Manager>
) {
  return { type: INCREASE_SCORE, businesses, managers };
}

export function increaseDate(
  businesses: Array<Business>,
  managers: Array<Manager>
) {
  return { type: INCREASE_DATE, businesses, managers };
}

export function buyManager(managerId: number, manager: Manager) {
  return { type: BUY_MANAGER, managerId, manager };
}

export function buyBusiness(businessId: number, business: Business) {
  return { type: BUY_BUSINESS, businessId, business };
}
