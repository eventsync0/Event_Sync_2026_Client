'use client';

import { Admin, Resource, DataProvider } from 'react-admin';
import simpleRestProvider from 'ra-data-json-server';
import { RoomList, RoomEdit, RoomCreate } from './rooms';

const baseProvider = simpleRestProvider('http://localhost:3001');

const customDataProvider: DataProvider = {
  ...baseProvider,
  getList: async (resource, params) => {
    const response = await baseProvider.getList(resource, params);
    if (response && (response as any).data?.data) {
      return {
        data: (response as any).data.data,
        total: (response as any).data.total || (response as any).data.data.length,
      };
    }
    return response;
  },
  getOne: async (resource, params) => {
    const response = await baseProvider.getOne(resource, params);
    if (response && (response as any).data?.data) {
      return { data: (response as any).data.data };
    }
    return response;
  }
};

export default function AdminApp() {
  return (
    <Admin dataProvider={customDataProvider} basename="/admin">
      <Resource 
        name="rooms" 
        list={RoomList} 
        edit={RoomEdit} 
        create={RoomCreate} 
        options={{ label: 'Salles' }}
      />
    </Admin>
  );
}