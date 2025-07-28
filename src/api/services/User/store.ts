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
  const response = await resultOrError(
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
    );
    const result = response[0];
    const error = response[1];

    if (!!error) {
      const errorResult = {
        status: ActionResultStatus.ERROR,
        error: error,
      };
      return errorResult;
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

      const successResult = {
        status: ActionResultStatus.SUCCESS,
        result: result,
      };
      return successResult;
    }

    const finalErrorResult = {
      status: ActionResultStatus.ERROR,
      error: "Something went wrong.",
    };
    return finalErrorResult;
  }
}
