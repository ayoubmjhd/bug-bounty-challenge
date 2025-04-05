import { makeAutoObservable, runInAction } from "mobx";
import {
  ActionError,
  ActionResultStatus,
  ActionSuccess,
} from "../../../types/global";
import { resultOrError, ResultOrErrorResponse } from "../../../utils/global";

export interface User {
  firstName?: string;
  lastName?: string;
  eMail?: string;
}

export default class UserStore {
  user: User | null = null;

  // init function
  constructor() {
    makeAutoObservable(this);
  }

  // actions
  async getOwnUser() {
    const [result, error] = (await resultOrError(
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              firstName: "Aria",
              lastName: "Test",
              eMail: "linda.bolt@osapiens.com",
            }),
          500
        )
      )
    )) as ResultOrErrorResponse<User>;

    if (!!error) {
      return {
        status: ActionResultStatus.ERROR,
        error,
      } as ActionError;
    }
    {
      /* Avatar display Bug
      Issue: Typo in property name (urser instead of user) -> user data not stored
      Solution: Fixed the typo to use the correct property name
      Reason: The typo prevented the user data from being properly stored in the MobX store
    */
    }
    if (result) {
      runInAction(() => {
        this.user = result;
      });

      return {
        status: ActionResultStatus.SUCCESS,
        result: result,
      } as ActionSuccess<User>;
    }

    return {
      status: ActionResultStatus.ERROR,
      error: "Something went wrong.",
    } as ActionError;
  }
}
