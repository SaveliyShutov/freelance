import { defineStore } from "pinia";
import OrderApi from '../api/OrderApi';
import { toast } from "vue3-toastify";
import { useRouter } from 'vue-router';
import { useAuth } from './auth';

import type { Order } from "../types/order.interface";
import type { Application } from "../types/application.interface";
import type { OrderWithApplication } from "../types/orderWithApplication.interface";

export const useOrder = defineStore('order', () => {
  const orders = ref<Order[]>([]);
  const my_orders_with_applications = ref<OrderWithApplication[]>([]);
  const my_applications = ref<Application[]>([]);

  async function getAll() {
    if (orders.value.length > 0) return null;
    const res = await OrderApi.getAll();
    if (res?.data) {
      orders.value = res.data.value;
    }
    return res;
  }

  async function getOrdersWithApplications() {
    if (my_orders_with_applications.value.length > 0) return null;

    const userStore = useAuth();
    const user = userStore?.user;
    if (!user?.employer_orders) return [];

    const res = await OrderApi.getOrdersWithApplications(user.employer_orders);
    if (res?.data) {
      my_orders_with_applications.value = res.data.value;
    }
    return res;
  }

  async function getWorkerApplicationsWithOrders() {
    if (my_applications.value.length > 0) return null;

    const userStore = useAuth();
    const user = userStore?.user;
    if (!user?.worker_applications) return [];

    const res = await OrderApi.getWorkerApplicationsWithOrders(user.worker_applications);
    if (res?.data) {
      my_applications.value = res.data.value;
    }
    return res;
  }

  async function acceptApplication(application_id: string) {
    return await OrderApi.acceptApplication(application_id);
  }

  async function declineApplication(application_id: string) {
    return await OrderApi.declineApplication(application_id);
  }

  async function getById(order_id: string) {
    return await OrderApi.getById(order_id);
  }

  async function createOrder(order: Order) {
    const userStore = useAuth();
    const router = useRouter();

    if (userStore.currentRole.value === "employer") {
      return await OrderApi.createOrder(order);
    }

    toast("Для начала вам нужно зарегистрироваться как заказчик", {
      type: "error",
      autoClose: 2000,
      onClose: () => {
        router.push(`/sign`);
      },
    });

    return;
  }

  async function createApplication(application: Application) {
    return await OrderApi.createApplication(application);
  }

  return {
    orders,
    my_orders_with_applications,
    my_applications,
    getAll,
    createOrder,
    getById,
    createApplication,
    getOrdersWithApplications,
    acceptApplication,
    declineApplication,
    getWorkerApplicationsWithOrders,
  };
});
