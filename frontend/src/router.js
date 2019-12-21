/**
 * 页面路由配置
 */
import Main from '@/components/Main'
import Info from '@/components/Info'
import Play from '@/components/Play'
import Find from '@/components/Find'

const routes = [
  // 主页路由
  {
    path: '/', 
    component: Main 
  },
  // 信息页路由
  {
    path: '/info/:vid',
    component: Info,
    props: true
  },
  // 播放页路由
  {
    path: '/play/:vid/:addr/:episode',
    component: Play,
    props: true
  },
  // 搜索页路由
  { 
    name: 'find',
    path: '/find/:type/:content',
    component: Find,
    props: true
  }
]


export default routes;
