import Request from '@/services/request';

const hp = new Request('/api/ucenter/');

const api = {
  MENU_RESOURCE: 'menu/menu-resource',
  menuList: 'menu/list',
  menuData: 'menu/get',
  addMenu: 'menu/save',
  editMenu: 'menu/update',
  deleteMenu: 'menu/delete',
  clientList: 'client/list'
};

/**
 * 菜单信息
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getMenuResource = async () => {
  return hp.get(api.MENU_RESOURCE);
};

/**
 * 菜单列表
 * @returns {Promise<AxiosResponse<T>>}
 */
export const fetchMenuList = async (params) => {
  return hp.get(api.menuList, params);
};

/**
 * 通过id查询菜单
 * @returns {Promise<AxiosResponse<T>>}
 */
export const fetchMenuData = async (params) => {
  const { id } = params;
  return hp.get(`${api.menuData}/${id}`);
};

/**
 * 新增菜单
 * @returns {Promise<AxiosResponse<T>>}
 */
export const addMenu = async (params) => {
  console.log(params);
  return hp.post(api.addMenu, params);
};

/**
 * 修改菜单
 * @returns {Promise<AxiosResponse<T>>}
 */
export const editMenu = async (params) => {
  return hp.put(api.editMenu, params);
};

/**
 * 删除菜单
 * @returns {Promise<AxiosResponse<T>>}
 */
export const deleteMenu = async (id) => {
  return hp.delete(`${api.deleteMenu}/${id}`);
};

/**
 * 客户端列表
 * @returns {Promise<AxiosResponse<T>>}
 */
export const fetchClientList = async () => {
  return hp.get(api.clientList);
};

export default { fetchMenuList, fetchClientList };
