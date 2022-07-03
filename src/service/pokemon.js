import { api } from './index';

const URL = process.env.REACT_APP_URL;
const pokeApi = process.env.REACT_APP_POKEAPI;
 
export const generete = async () => {
  return api.get(pokeApi, `${parseInt(Math.random() * 150)}`);
};

export const create = async (body) => {
  return api.post(URL, 'pokemon', body);
};

export const getAll = async () => {
  return api.get(URL, 'pokemon');
}