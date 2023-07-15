import Layout from '@/layout'

const postRouter = {
  path: '/post',
  component: Layout,
  redirect: '/post/list',
  name: 'Post',
  meta: {
    title: 'post',
    icon: 'guide',
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/post/list'),
      name: 'postListManagement',
      meta: { title: 'postListManagement', noCache: true },
    },
    {
      path: 'create',
      component: () => import('@/views/post/create'),
      name: 'PostCreate',
      breadcrumb: false,
      meta: { title: 'postCreate', noCache: true },
    },
    {
      path: 'update',
      component: () => import('@/views/post/update'),
      hidden: true,
      name: 'PostUpdate',
      breadcrumb: false,
      meta: { title: 'postUpdate', noCache: true },
    },

    {
      path: 'tag/list',
      component: () => import('@/views/post/tag/list'),
      name: 'TagManagement',
      meta: { title: 'tagManagement', noCache: true },
    },
    {
      path: 'tag/create',
      component: () => import('@/views/post/tag/create'),
      hidden: true,
      name: 'PostTagCreate',
      breadcrumb: false,
      meta: { title: 'postTagCreate', noCache: true },
    },
    {
      path: 'tag/update',
      component: () => import('@/views/post/tag/update'),
      hidden: true,
      name: 'PostTagUpdate',
      breadcrumb: false,
      meta: { title: 'postTagUpdate', noCache: true },
    },
  ],
}
export default postRouter
