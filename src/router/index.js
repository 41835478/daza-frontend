import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import _MainWrapperView from '../views/_MainWrapperView';
import _CleanWrapperView from '../views/_CleanWrapperView';

import NotFoundView from '../views/errors/NotFoundView';

import HomeIndexView from '../views/home/IndexView';

import AccountRegisterView from '../views/account/RegisterView';
import AccountLoginView from '../views/account/LoginView';
import AccountLogoutView from '../views/account/LogoutView';
import AccountPasswordForgotView from '../views/account/PasswordForgotView';
import AccountPasswordResetView from '../views/account/PasswordResetView';
import AccountSettingsView from '../views/account/SettingsView';

import UserDetailView from '../views/users/DetailView';

import CategoryIndexView from '../views/categories/IndexView';

import TopicIndexView from '../views/topics/IndexView';
import TopicCreateView from '../views/topics/CreateView';
import TopicDetailView from '../views/topics/DetailView';

import ArticleCreateView from '../views/articles/CreateView';
import ArticleDetailView from '../views/articles/DetailView';

import TagDetailView from '../views/tags/DetailView';

import NotificationIndexView from '../views/notifications/IndexView';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: _MainWrapperView,
      children: [
        {
          path: '/',
          name: 'home_index',
          component: HomeIndexView,
        },
        {
          path: 'account/settings',
          component: AccountSettingsView,
        },
        {
          name: 'user_detail',
          path: 'users/:id',
          component: UserDetailView,
        },
        {
          path: 'categories/:slug',
          component: CategoryIndexView,
        },
        {
          path: 'categories',
          redirect: '/categories/latest',
        },
        {
          path: 'home/:slug',
          redirect: '/categories/:slug',
        },
        {
          path: 'topics',
          component: TopicIndexView,
        },
        {
          path: 'topics/create',
          component: TopicCreateView,
          meta: { requiresAuth: true },
        },
        {
          path: 'topics/:slug',
          name: 'topic_detail',
          component: TopicDetailView,
        },
        {
          path: 'articles/create',
          component: ArticleCreateView,
          meta: { requiresAuth: true },
        },
        {
          path: 'articles/:slug',
          name: 'article_detail',
          component: ArticleDetailView,
        },
        {
          path: 'tags/:name',
          name: 'tag_detail',
          component: TagDetailView,
        },
        {
          path: 'notifications',
          component: NotificationIndexView,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/account',
      component: _CleanWrapperView,
      children: [
        {
          path: 'register',
          component: AccountRegisterView,
        },
        {
          path: 'login',
          component: AccountLoginView,
        },
        {
          path: 'logout',
          component: AccountLogoutView,
        },
        {
          path: 'password_forgot',
          component: AccountPasswordForgotView,
        },
        {
          path: 'password_reset',
          component: AccountPasswordResetView,
        },
      ],
    },
    {
      path: '*',
      component: NotFoundView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const auth = store.state.account.auth;
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.check()) {
      next({
        path: '/account/login',
        query: { redirect_url: to.fullPath },
      });
      return;
    }
  }
  next();
});

export default router;
