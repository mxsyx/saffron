/**
 * 页面路由配置
 */
const Main = () => import('@/components/Main')
const Info = () => import('@/components/Info');
const Play = () => import('@/components/Play');
const Find = () => import('@/components/Find');

const routes = [
  // 主页路由
  {
    name: 'main',
    path: '/', 
    component: Main,
  },
  // 信息页路由
  {
    name: 'info',
    path: '/info/:vid',
    component: Info,
  },
  // 播放页路由
  {
    name: 'play',
    path: '/play/:vid/:addr/:episode',
    component: Play,
  },
  // 搜索页路由
  { 
    name: 'find',
    path: '/find/:type/:content',
    component: Find,
  }
]


export default routes;
