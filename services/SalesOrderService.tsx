import { Demo } from '@/types';
import Cookies from 'js-cookie';
import { API_BASE_URL } from './constants';

const token = Cookies.get('auth');

export const SalesOrderService = {
  async createSalesOrder(salesOrder: Demo.SalesOrder) {
    console.log('🚀 ~ createSalesOrder ~ salesOrder:', salesOrder);
    return await fetch(`${API_BASE_URL}/salesOrder/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Berarer ${token}`,
      },
      body: JSON.stringify({ ...salesOrder }),
    }).then(res => res.json());
  },

  async updateSalesOrder(order: Demo.SalesOrder) {
    return await fetch(`${API_BASE_URL}/salesOrder/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Berarer ${token}`,
      },
      body: JSON.stringify({ ...order }),
    }).then(res => res.json());
  },

  async updateSalesOrderStatus(order: Demo.SalesOrder) {
    return await fetch(`${API_BASE_URL}/salesOrder/updateStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Berarer ${token}`,
      },
      body: JSON.stringify({ ...order }),
    }).then(res => res.json());
  },

  async readSalesOrder(_id: string) {
    return await fetch(`${API_BASE_URL}/salesOrder/get/?_id=${_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Berarer ${token}`,
      },
    }).then(res => res.json());
  },

  async deleteSalesOrder(_id: string) {
    return await fetch(`${API_BASE_URL}/salesOrder/delete/?_id=${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Berarer ${token}`,
      },
    }).then(res => res.json());
  },

  async deleteSelectedSalesOrder(ids: string[]) {
    return await fetch(`${API_BASE_URL}/salesOrder/delete_selected/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Berarer ${token}`,
      },
      body: JSON.stringify({ ids: ids }),
    }).then(res => res.json());
  },

  async deleteAllSalesOrder() {
    return await fetch(`${API_BASE_URL}/salesOrder/get_all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Berarer ${token}`,
      },
    }).then(res => res.json());
  },

  async getAllSalesOrder() {
    return await fetch(`${API_BASE_URL}/salesOrder/get_all_order`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Berarer ${token}`,
      },
    })
      .then(res => res.json())
      .then(d => d.data);
  },
};
