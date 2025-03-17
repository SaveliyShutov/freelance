import { defineStore } from "pinia"
import AuthAPI from "../api/AuthApi"

import type { User } from "../types/user.interface"
import type { Worker } from "../types/worker.interface"
import type { Employer } from "../types/employer.interface"

export const useAuth = defineStore('auth', () => {
  let user = ref<User | null>()
  let currentRole = ref()
  let worker = ref();
  let employer = ref();

  async function registration(user: any): Promise<boolean> {
    try {
      const response = await AuthAPI.registration(user)
      if (response.data.value) {
        user.value = response.data.value.user

        if (response.data.value?.worker) {
          worker.value = response.data.value.worker
          currentRole.value = 'worker'
        }

        if (response.data.value?.employer) {
          employer.value = response.data.value.employer
          currentRole.value = 'employer'
        }

      }
      return true
    } catch {
      return false
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await AuthAPI.login(email, password)
      if (response.data.value) {
        user.value = response.data.value.user

        if (response.data.value?.worker) {
          worker.value = response.data.value.worker
          currentRole.value = 'worker'
        }

        if (response.data.value?.employer) {
          employer.value = response.data.value.employer
          currentRole.value = 'employer'
        }

      }
      return response
    } catch {
      return false
    }
  }

  async function checkAuth(): Promise<boolean> {
    try {
      if (user.value?._id) {
        return true
      }
      const response = await AuthAPI.refresh()

      if (response.data.value?._id) {
        user.value = response.data.value
        return true
      } else {
        return false
      }
    } catch (error) {
      await logout()
      return false
    }
  }

  async function logout(): Promise<any> {
    try {
      let res = await AuthAPI.logout()

      user.value = null
      useRouter().push('/')
      return res
    } catch { }
  }

  // async function getAllUsers(): Promise<any> {
  //   try {
  //     return await AuthAPI.getAllUsers()
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function logout(): Promise<any> {
  //   try {
  //     let res = await AuthAPI.logout()

  //     user.value = null
  //     useRouter().push('/')
  //     return res
  //   } catch { }
  // }

  // async function updateUser(newUser: any, userId: string) {
  //   try {
  //     let res = await AuthAPI.updateUser(newUser, userId);

  //     if (res.status.value == 'success') {
  //       user.value = res.data.value;
  //     }

  //     return res
  //   } catch { }
  // }

  // async function sendResetLink(email: string): Promise<any> {
  //   try {
  //     return await AuthAPI.sendResetLink(email)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function resetPassword(password: string, userId: string, token: string): Promise<any> {
  //   try {
  //     return await AuthAPI.resetPassword(password, userId, token)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function uploadAvatar(fd: FormData, userId: string) {
  //   try {
  //     return await AuthAPI.uploadAvatar(fd, userId);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return {
    // variables
    user,
    worker,
    employer,
    currentRole,
    registration,
    login,
    checkAuth,
    logout,
    // functions
    //  registration, login, 
    // updateUser, sendResetLink, resetPassword, registerStudent,
    // getAllUsers, uploadAvatar,
  }
})
